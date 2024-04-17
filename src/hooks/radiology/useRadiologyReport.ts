import { get, isEmpty } from 'lodash';
import { useCallback, useEffect } from 'react';

import { useGetListContentsQuery } from '@/api/content';
import { useLazyGetOneModalityTypeByNameQuery } from '@/api/modalityType';
import {
  useCreateOneRadiologyReportMutation,
  useLazyGetOneRadiologyReportQuery,
} from '@/api/radiologyReport';
import { selectSessionRadiologyConfig } from '@/features/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNotifyReportActions } from '@/hooks/order/useNotifyReportActions';
import { getSaveReportData, useApproveReport } from '@/hooks/radiology/useApproveReport';
import { useUserPermission } from '@/providers/AuthProvider';
import { selectCurrentUser } from '@/stores/auth';
import {
  initializeRadiologyReport,
  selectCurrentRequestID,
  selectRadiologyReportSubmission,
  setCurrentRequestID,
  setRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
  setContentTemplateID,
  setRadiologyReportIsApproveButtonClicked,
} from '@/stores/OrderRadiology';
import {
  setOrderLayout,
  setOrderLayouts,
} from '@/stores/OrderRadiology/orderLayoutSlice';
import { BaseEntity } from '@/types';
import { IConsumableUpdateDTO, IOrderDTO } from '@/types/dto';
import {
  IRadiologyReportContextFunctions,
  IRadiologyReportSubmissionData,
} from '@/types/radiology/reportContext';
import { getDefaultOperationTimeSubmissionData } from '@/utils/radiology/getRadiologyTime';

import { useLockOrder } from '../lockOrder/useLockOrder';

import { useGetTemplate } from './useGetTemplate';

export type IRadiologyReportCallbacks = Partial<{
  onReportApproved: (newReportID: BaseEntity['id'], newOrder: IOrderDTO) => void;
}> & {
  /**
   * Close report panel function
   */
  onClose: () => void;
};

type Options = {
  order: IOrderDTO;
  reportID?: BaseEntity['id'];
  callbacks: IRadiologyReportCallbacks;
};

/**
 * Handle initialization of Report data to set up displaying of Report Panel
 * Define functions definition for use throughout Radiology Report module
 */
export const useRadiologyReport = (
  options: Options,
): Omit<IRadiologyReportContextFunctions, 'openModalPrintRadiologyReport'> => {
  const { order, reportID, callbacks } = options;
  const dispatch = useAppDispatch();
  const [triggerFetchReport] = useLazyGetOneRadiologyReportQuery();
  const [triggerGetModalityType] = useLazyGetOneModalityTypeByNameQuery();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentRequestID = useAppSelector(selectCurrentRequestID(order.id));
  const [triggerCreateReport] = useCreateOneRadiologyReportMutation();
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID: order.id, requestID: currentRequestID }),
  );
  const { getTemplate, getTemplates } = useGetTemplate(order.id);
  const { isAutoFillRadiologyContent, isFilterContentByCurrentUser } = useAppSelector(
    selectSessionRadiologyConfig,
  );
  const permissions = useUserPermission();
  const handleLockOrder = useLockOrder();

  const { notifySaveDraftSuccess, notifySaveDraftError } = useNotifyReportActions();

  /**
   * Select request
   */
  const request = selectRequest(order, currentRequestID);

  /**
   * Handle initialize report data
   */
  const currentProcedure = request?.procedure?.id;

  const { data: contentData } = useGetListContentsQuery(
    {
      filter: {
        procedureID: currentProcedure,
        modalityTypes: order?.modalityType ? [order?.modalityType] : [],
        userID: isFilterContentByCurrentUser ? currentUser?.id : undefined,
      },
    },
    { skip: !order.lockedBy },
  );

  const approveReport = useApproveReport({
    callbacks,
    order,
    request,
  });

  useEffect(() => {
    dispatch(setCurrentRequestID({ orderID: order.id, requestID: request?.id ?? 0 }));
    dispatch(
      initializeRadiologyReport({
        context: {
          orderID: order.id,
          requestID: request?.id ?? 0,
          contentTemplateID: null,
        },
        data: {
          approvedModalityID: request?.modality?.id,
        },
      }),
    );
    /**
     * Reset click state of approve button
     * https://docs.google.com/spreadsheets/d/1vjVNLf4Pby7jfZp6xxsHRKh7KmTfBsp7OoSYtGYCgyU/edit#gid=473612909
     */
    dispatch(
      setRadiologyReportIsApproveButtonClicked({
        orderID: order.id,
        isApproveButtonClicked: false,
      }),
    );
  }, [dispatch, order.id, request?.id, request?.modality?.id]);

  useEffect(() => {
    // set default template for new order: the first content for current procedureID and modalityTypes
    if (isAutoFillRadiologyContent) {
      const defaultContentId = get(contentData, ['list', 0, 'id']) || null;
      if (
        defaultContentId &&
        isEmpty(request?.reports) &&
        isEmptyReportSubmissionContent(reportSubmission)
      ) {
        dispatch(
          setContentTemplateID({
            orderID: order.id,
            requestID: request?.id ?? 0,
            contentID: defaultContentId,
            triggerSetContentData: true,
          }),
        );
      }
    }
  }, [
    dispatch,
    contentData,
    order.id,
    request?.id,
    request?.reports,
    isAutoFillRadiologyContent,
    reportSubmission,
  ]);

  /**
   * Handle update operatorIDs
   */
  useEffect(() => {
    if (
      request &&
      (!reportSubmission?.operators || reportSubmission?.operators.length === 0)
    ) {
      dispatch(
        setRadiologyReportSubmissionData({
          orderID: order.id,
          requestID: request.id,
          operators: request?.operators ?? undefined,
        }),
      );
    }
  }, [dispatch, order.id, request]);

  /**
   * Handle update consumable
   */
  useEffect(() => {
    const radiologyConsumables: IConsumableUpdateDTO[] = [];
    if (request) {
      request.consumables?.map((item) => {
        const radiologyConsumable: IConsumableUpdateDTO = {
          error: item.error,
          id: item.id,
          materialID: item.materialID,
          quantity: item.quantity,
        };
        radiologyConsumables.push(radiologyConsumable);
      });
      dispatch(
        setRadiologyReportSubmissionData({
          orderID: order.id,
          requestID: request.id,
          consumables: radiologyConsumables,
        }),
      );
    }
  }, [dispatch, order.id, request]);

  /**
   * initialize operationTime, approvedTime
   */
  useEffect(() => {
    const setDefaultRadiologyTime = async () => {
      if (request && order.modalityType) {
        const modalityType = await triggerGetModalityType(
          {
            name: order.modalityType,
          },
          true,
        ).unwrap();
        dispatch(
          setRadiologyReportSubmissionData({
            orderID: order.id,
            requestID: request.id,
            approvedTime: request.finalApprovedTime ?? undefined,
            operationTime: getDefaultOperationTimeSubmissionData({
              request,
              operationTimeReportSubmission: reportSubmission?.operationTime,
              modalityType,
            }),
          }),
        );
      }
    };
    setDefaultRadiologyTime();
  }, [
    dispatch,
    order.id,
    order.modalityType,
    order.study,
    reportSubmission?.operationTime,
    request,
    triggerGetModalityType,
  ]);

  /**
   * Only allow edit report
   * If user has permission and order is same locked user
   */
  useEffect(() => {
    if (permissions?.userCanLockOrder && order.lockedBy?.id === currentUser?.id) {
      dispatch(setRadiologyReportIsEditable({ orderID: order.id, isEditable: true }));
    } else
      dispatch(setRadiologyReportIsEditable({ orderID: order.id, isEditable: false }));
  }, [
    currentUser?.id,
    dispatch,
    order.id,
    order.lockedBy,
    permissions?.userCanLockOrder,
  ]);

  const fetchAndSetReport = useCallback(
    async (requestID: BaseEntity['id'], reportID: BaseEntity['id']) => {
      try {
        const report = await triggerFetchReport({
          orderID: order.id,
          requestID,
          reportID,
        }).unwrap();

        dispatch(
          setRadiologyReportSubmissionData({
            orderID: order.id,
            requestID,
            findings: report?.findings || '',
            impression: report?.impression || '',
            description: report.description || '',
            comments: report?.comments || '',
            operatorIDs: request?.operators?.map((item) => item.id) ?? undefined,
            id: report?.id,
          }),
        );
      } catch (e) {
        undefined;
      }
    },
    [dispatch, order.id, request?.operators, triggerFetchReport],
  );

  useEffect(() => {
    const initializeOrderLayout = async () => {
      const layout = await getTemplate();
      const layouts = await getTemplates();
      dispatch(setOrderLayout(layout));
      dispatch(setOrderLayouts(layouts));
    };
    initializeOrderLayout();
  }, [dispatch, getTemplate, getTemplates]);

  /**
   * Lưu Nháp
   */
  const saveDraftReport = async () => {
    if (reportSubmission) {
      const res = await triggerCreateReport({
        orderID: order.id,
        requestID: currentRequestID,
        ...getSaveReportData({ data: reportSubmission }),
      });
      if ('error' in res) {
        notifySaveDraftError();
      } else {
        notifySaveDraftSuccess();
      }
    }
  };

  const setIsEditable: IRadiologyReportContextFunctions['setIsEditable'] = (
    isEditable,
  ) => {
    dispatch(setRadiologyReportIsEditable({ orderID: order.id, isEditable }));
  };

  const lockOrder = async () => {
    return handleLockOrder(order.id, request?.id);
  };

  return {
    fetchAndSetReport,
    saveDraftReport,
    approveReport,
    setIsEditable,
    lockOrder,
    close: callbacks?.onClose,
  };
};

const selectRequest = (order: IOrderDTO, currentRequestID?: BaseEntity['id']) => {
  const requestFromRequestID = order?.requests?.find(
    (request) => request.id === currentRequestID,
  );
  /**
   * Has previous request ID, use this
   */
  if (requestFromRequestID) return requestFromRequestID;
  /**
   * If a request is approved, use this
   */
  const requestFinalApprover = order?.requests?.find((request) => request.finalApprover);

  if (requestFinalApprover) return requestFinalApprover;
  /**
   * Fallback to first request
   */
  return order?.requests?.[0];
};

const isEmptyReportSubmissionContent = (
  reportSubmission: IRadiologyReportSubmissionData | undefined,
) =>
  !reportSubmission?.impression &&
  !reportSubmission?.findings &&
  !reportSubmission?.comments &&
  !reportSubmission?.description;
