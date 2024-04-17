/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * Handle storage of Radiology Report metadata
 */
import { createListenerMiddleware, createSlice, DeepPartial } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { endpoints as endpointsContent } from '@/api/content';
import { BaseEntity } from '@/types';
import { IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import {
  IRadiologyReportState,
  IRadiologyReportSubmissionData,
} from '@/types/radiology/reportContext';
import { setZeroSeconds } from '@/utils/dateUtils';

type OrderID = BaseEntity['id'];
type RequestID = BaseEntity['id'];

/**
 * Use this to select specific Report Data
 */
export type IOrderReportKey = {
  orderID: OrderID;
  requestID: RequestID;
};

const BLANK_REPORT_DATA: IRadiologyReportState['data'] = {
  findings: '',
  impression: '',
  comments: '',
  description: '',
  approvedModalityID: 0,
  operatorIDs: undefined,
  imageFileIDs: null,
  images: null,
  reporterID: undefined,
  // signatureID: 0,
};

/**
 * Store generic information per Order
 */
type OrderReportState = {
  /**
   * Record current request ID so that we can resume writing report when the user navigates away
   */
  currentRequestID: RequestID;
  /**
   * List of reports for this order
   */
  reports: Record<RequestID, IRadiologyReportState | null>;
  lastUpdated: number;
  /**
   * use in logic selected report when Order not lock
   */
  activeReportID: IRadiologyReportDTO['id'] | null;
  errorRadiologyDateTime: Record<
    RequestID,
    {
      errorOperationTime?: boolean;
      errorApprovedTime?: boolean;
    }
  >;
};
/**
 * We store report state with timestamp so we can remove the oldest report
 * to free up memory
 */
type RadiologyReportStoreState = Record<OrderID, OrderReportState>;

const initialState: RadiologyReportStoreState = {};

const MAX_REPORT_STORE = 10; // more than this and the oldest report state will be deleted

export const RADIOLOGY_CONTEXT_REDUCER = 'radiologyReportContext';

export const radiologyContextSlice = createSlice({
  name: RADIOLOGY_CONTEXT_REDUCER,
  initialState,
  reducers: {
    initializeRadiologyReport: (
      state,
      action: PayloadAction<DeepPartial<IRadiologyReportState>>,
    ) => {
      // initialize report for this order if not existed
      const reportState = action.payload;
      const orderID = reportState.context?.orderID;
      const requestID = reportState.context?.requestID;
      if (!orderID) return;

      if (!state[orderID]) {
        state[orderID] = initializeOrderReportState(state);
        if (!requestID) return;
        if (!state[orderID].reports[requestID]) {
          state[orderID].reports[requestID] = initializeReportState({
            context: {
              orderID,
              requestID: reportState.context?.requestID || 0,
              contentTemplateID: reportState.context?.contentTemplateID || 0,
            },
            data: {
              ...BLANK_REPORT_DATA,
              ...reportState.data,
            },
          });
        }
      }
    },
    setRadiologyReportState: (
      state,
      action: PayloadAction<
        Omit<IRadiologyReportState, 'data'> & {
          data?: IRadiologyReportState['data'];
        }
      >,
    ) => {
      const reportState = action.payload;
      const orderID = reportState.context.orderID;
      state[orderID] = state[orderID] || initializeOrderReportState(state);
      const requestID = reportState.context.requestID;
      const newReportState: IRadiologyReportState = {
        context: reportState.context,
        data: reportState.data || BLANK_REPORT_DATA,
      };
      state[orderID].reports[requestID] = newReportState;
      state[orderID].lastUpdated = new Date().getTime();
    },
    setCurrentRequestID: (state, action: PayloadAction<IOrderReportKey>) => {
      const { orderID, requestID } = action.payload;
      state[orderID] = state[orderID] || initializeOrderReportState(state);
      state[orderID].currentRequestID = requestID;
    },
    setContentTemplateID: (
      state,
      action: PayloadAction<
        IOrderReportKey & {
          contentID: BaseEntity['id'];
          callbackSuccess?: () => void;
          triggerSetContentData?: boolean;
        }
      >,
    ) => {
      const { orderID, contentID, requestID } = action.payload;
      state[orderID] = state[orderID] || initializeOrderReportState(state);

      if (!state[orderID].reports[requestID])
        state[orderID].reports[requestID] = initializeReportState({
          context: {
            orderID,
            requestID,
            contentTemplateID: contentID,
          },
        });
      else {
        state[orderID].reports[requestID]!.context.contentTemplateID = contentID;
        state[orderID].lastUpdated = new Date().getTime();
      }
    },
    setRadiologyReportSubmissionData: (
      state,
      action: PayloadAction<
        IOrderReportKey &
          Partial<IRadiologyReportSubmissionData> & {
            request?: IOrderRequestDTO;
            report?: IRadiologyReportDTO;
          }
      >,
    ) => {
      const {
        orderID,
        requestID,
        findings,
        impression,
        comments,
        operatorIDs,
        operators,
        approvedModalityID,
        id,
        report,
        request,
        approvedTime,
        operationTime,
        imageFileIDs,
        images,
        consumables,
        reporterID,
        description,
      } = action.payload;
      state[orderID] = state[orderID] || initializeOrderReportState(state);

      /**
       * Because content can come from individual fields (finding, impression, ...) AND Report object
       * determine which content will be selected to store
       * The priority is defined as such: INDIVIDUAL FIELD > REPORT > undefined
       */
      const content: Partial<IRadiologyReportSubmissionData> = {
        findings: findings ?? report?.findings ?? undefined,
        impression: impression ?? report?.impression ?? undefined,
        comments: comments ?? report?.comments ?? undefined,
        description: description ?? report?.description ?? undefined,
        approvedModalityID: approvedModalityID ?? request?.modality?.id ?? undefined,
        operatorIDs:
          operatorIDs ?? request?.operators?.map((item) => item.id) ?? undefined,
        id: id ?? report?.id ?? undefined,
        approvedTime: setZeroSeconds(approvedTime) ?? undefined,
        operationTime: setZeroSeconds(operationTime) ?? undefined,
        imageFileIDs: imageFileIDs ?? null,
        images: images ?? null,
        consumables: consumables ?? undefined,
        reporterID: reporterID ?? undefined,
        operators: operators ?? request?.operators ?? undefined,
      };

      if (!state[orderID].reports[requestID])
        state[orderID].reports[requestID] = initializeReportState({
          context: {
            orderID,
            requestID,
            contentTemplateID: 0,
          },
          data: {
            ...BLANK_REPORT_DATA,
            ...content,
          },
        });
      else {
        const oldContent = state[orderID].reports[requestID]!.data;
        state[orderID].reports[requestID]!.data = {
          findings: content.findings ?? oldContent.findings,
          impression: content.impression ?? oldContent.impression,
          comments: content.comments ?? oldContent.comments,
          approvedModalityID: content.approvedModalityID ?? oldContent.approvedModalityID,
          operatorIDs: content.operatorIDs ?? oldContent.operatorIDs,
          operators: content.operators ?? oldContent.operators,
          id: content.id ?? oldContent.id,
          approvedTime: content.approvedTime ?? oldContent.approvedTime,
          operationTime: content.operationTime ?? oldContent.operationTime,
          imageFileIDs: content.imageFileIDs ?? oldContent.imageFileIDs,
          images: content.images ?? oldContent.images,
          consumables: content.consumables ?? oldContent.consumables,
          reporterID: content.reporterID ?? oldContent.reporterID,
          description: content.description ?? oldContent.description,
        };
      }
    },
    setCurrentActiveReportID: (
      state,
      action: PayloadAction<
        Pick<IOrderReportKey, 'orderID'> & {
          activeReportID: OrderReportState['activeReportID'];
        }
      >,
    ) => {
      const { orderID, activeReportID } = action.payload;
      state[orderID] = state[orderID] || initializeOrderReportState(state);
      state[orderID].activeReportID = activeReportID;
    },
    setErrorRadiologyDateTime: (
      state,
      action: PayloadAction<
        IOrderReportKey & {
          errorOperationTime?: boolean;
          errorApprovedTime?: boolean;
        }
      >,
    ) => {
      const { orderID, requestID, errorOperationTime, errorApprovedTime } =
        action.payload;

      if (!state[orderID].errorRadiologyDateTime[requestID]) {
        state[orderID].errorRadiologyDateTime[requestID] = {
          errorApprovedTime,
          errorOperationTime,
        };
      } else {
        if (errorOperationTime !== undefined) {
          state[orderID].errorRadiologyDateTime[requestID].errorOperationTime =
            errorOperationTime;
        }
        if (errorApprovedTime !== undefined) {
          state[orderID].errorRadiologyDateTime[requestID].errorApprovedTime =
            errorApprovedTime;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializeRadiologyReport,
  setRadiologyReportState,
  setContentTemplateID,
  setCurrentRequestID,
  setRadiologyReportSubmissionData,
  setCurrentActiveReportID,
  setErrorRadiologyDateTime,
} = radiologyContextSlice.actions;

export const radiologyContextReducer = radiologyContextSlice.reducer;

/**
 * Create initial state
 * Check and delete old state if exceed maximum number
 */
const initializeOrderReportState = (
  state: RadiologyReportStoreState,
): OrderReportState => {
  if (Object.keys(state).length > MAX_REPORT_STORE) {
    const sortedByLastUpdated = Object.entries(state).sort(
      (a, b) => a[1].lastUpdated - b[1].lastUpdated,
    );

    const oldestReport = sortedByLastUpdated[0];

    delete state[parseInt(oldestReport[0])];
  }
  return {
    currentRequestID: 0,
    reports: {},
    lastUpdated: new Date().getTime(),
    activeReportID: null,
    errorRadiologyDateTime: {},
  };
};

const initializeReportState = (
  override: Partial<IRadiologyReportState>,
): IRadiologyReportState => {
  return {
    context: {
      orderID: 0,
      requestID: 0,
      contentTemplateID: 0,
    },
    data: BLANK_REPORT_DATA,
    ...override,
  };
};

export const radiologyContextMiddleware = createListenerMiddleware();

radiologyContextMiddleware.startListening({
  actionCreator: radiologyContextSlice.actions.setContentTemplateID,
  effect: async (action, listenerApi) => {
    const { contentID, orderID, requestID, callbackSuccess, triggerSetContentData } =
      action.payload;
    if (!triggerSetContentData || !contentID) {
      return;
    }
    const { data, isSuccess } = await listenerApi.dispatch(
      endpointsContent.getOneContent.initiate({ id: contentID }),
    );
    if (isSuccess) {
      listenerApi.dispatch(
        setRadiologyReportSubmissionData({
          orderID,
          requestID,
          findings: data.findings || '',
          impression: data.impression || '',
        }),
      );
      if (callbackSuccess) {
        callbackSuccess();
      }
    }
  },
});
