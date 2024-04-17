import { PRINT_MODAL_OPEN_MODE } from '@/hooks/printRadiologyReport/printModal';
import { BaseEntity, BUTTON_STATE } from '@/types';
import {
  IOrderDTO,
  IRadilogyReportDTOApprove,
  IRadiologyReportBase,
  IRadiologyReportDTO,
} from '@/types/dto';

/**
 * Define the complete state of a radiology report, this will include both Context and Report Content
 * Every information relating to a radiology report should be inside this state
 */
export type IRadiologyReportState = {
  context: IRadiologyReportContext;
  data: IRadiologyReportSubmissionData;
};

export type IRadiologyReportUIState = {
  buttons: IRadiologyReportButtonsState;
  tabKey: TAB_PAGES;
  // Determine whether or not to use a personal content template
  personalContentTemplateButtonState: boolean;
  // Determine if the editors are enabled
  isEditable: boolean;
  // Determine if the approve button is clicked
  isApproveButtonClicked: boolean;
};

/**
 * Define the minimum information needed to START WRITING a report
 */
// TODO: This is a placeholder, wait for final backend definitions
export type IRadiologyReportContext = {
  /**
   * Order ID
   */
  orderID: BaseEntity['id'];
  /**
   * Since reports are children of OrderRequest, we need RequestID
   */
  requestID: BaseEntity['id'];
  /**
   * Initial can be null, user can update this value any time
   */
  contentTemplateID: BaseEntity['id'] | null;
};

/**
 * Define the minimum information needed to COMPLETE a report
 */
export type IRadiologyReportSubmissionData = IRadilogyReportDTOApprove & {
  // reportID
  id?: BaseEntity['id'];
};

/**
 * Define what a Radiology Report is composed from UI
 */
// TODO: This is a placeholder, wait for final backend definitions
export type IRadiologyReportContent = Pick<
  IRadiologyReportBase,
  'findings' | 'impression' | 'comments'
>;

/**
 * Define the list of action buttons when performing radiolgy report
 */
export enum RadiologyReportActions {
  VIEW_IMAGE = 'VIEW_IMAGE',
  TAKE_PICTURE = 'TAKE_PICTURE',
  UNLOCK = 'UNLOCK',
  LOCK = 'LOCK',
  DELETE_LOCK = 'DELETE_LOCK',
  APPROVE = 'APPROVE',
  APPROVE_WITH_TIME = 'APPROVE_WITH_TIME',
  SAVE_DRAFT = 'SAVE_DRAFT',
  PRINT = 'PRINT',
  ATTACHMENT = 'ATTACHMENT',
  SWAP_ROOM = 'SWAP_ROOM',
  CONTENT_TEMPLATE_BUTTON = 'CONTENT_TEMPLATE_BUTTON',
  CONTENT_TEMPLATE_SELECT = 'CONTENT_TEMPLATE_SELECT',
}

/**
 * Define the list of tab when open quick radiology report
 */
export enum TAB_PAGES {
  REPORT = 'REPORT',
  IMAGE_UPLOAD = 'IMAGE_UPLOAD',
}

/**
 * Options approve report
 */
export type IApproveReport = {
  approvedTime?: string;
  onSuccessCallback?: (reportID: IRadiologyReportDTO['id'], order: IOrderDTO) => void;
  reportSubmission?: IRadiologyReportSubmissionData;
  isQuickApprove: boolean;
};

/**
 * Define display status of radiology report action buttons
 */
export type IRadiologyReportButtonsState = Record<RadiologyReportActions, BUTTON_STATE>;

/**
 * For Radiology Report, we must define a strict set of functions
 * because this is a specific module
 * We do NOT allow the register of functions that is NOT DEFINED HERE
 */
export type IRadiologyReportContextFunctions = {
  /**
   * Save draft report
   */
  saveDraftReport: () => void;
  /**
   * Approve report
   */
  approveReport: (options?: IApproveReport) => void;
  // /**
  //  * Edit report
  //  */
  // editReport: () => void;
  /**
   * Fetch a new report and set it to the current editors
   */
  fetchAndSetReport: (requestID: BaseEntity['id'], reportID: BaseEntity['id']) => void;
  /**
   * set editing state
   */
  setIsEditable: (isEditable: boolean) => void;
  /**
   * Lock order from within
   */
  lockOrder: () => Promise<boolean>;
  /**
   * Show modal
   */
  openModalSelectApproveTime?: () => void;
  /**
   * Submit form
   */
  submitFormApproveWithTime?: () => void;
  /**
   * Submit UpdatePdf
   */
  submitUpdatePdf?: () => void;
  /**
   * Show print slow modal
   */
  openModalPrintRadiologyReport: (options: OpenModalPrintRadiologyReportOptions) => void;
  /**
   * Close current report panel
   * If it is inside a modal, close modal
   * If it is a tab, close current tab
   */
  close: () => void;
  /**
   * Show modal medical equipment
   */
  openModalMedicalEquipment?: (displayButtonApprove?: boolean) => void;
  /**
   * Show modal default info radiology
   */
  openModalDefaultInfoRadiology?: (displayButtonApprove?: boolean) => void;
};

type OpenModalPrintRadiologyReportOptions = {
  currentReportID?: IRadiologyReportDTO['id'];
  order?: IOrderDTO;
  modalMode: PRINT_MODAL_OPEN_MODE;
};
