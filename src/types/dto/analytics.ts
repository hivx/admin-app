// eslint-disable-next-line no-restricted-imports

import { BaseEntity } from '..';

import { IModalityDTO } from './modality';
import { IModalityGroupDTO } from './modalityGroup';
import { IProcedureDTO } from './procedure';
import { ORDER_DIAGNOSIS_STEP_STATUS } from './radiologyReport';
import { ICloudUserDTO } from './user';

export enum ANALYTIC_ID {
  /**
   * xem thống kê số lượng các ca
   */
  STATUS_COUNT = 'STATUS_COUNT',
  /**
   * xem thống kê máy chụp
   */
  MODALITY_COUNT = 'MODALITY_COUNT',
  /**
   * xem thống kê bác sĩ duyệt
   */
  APPROVER_COUNT = 'APPROVER_COUNT',

  DAYOFWEEK_COUNT = 'DAYOFWEEK_COUNT',

  /**
   * xem thống kê trung bình dịch vụ chụp
   */
  PROCEDURE_COUNT = 'PROCEDURE_COUNT',
  /**
   * xem thống kê loại máy chụp
   */
  MODALITY_GROUP_COUNT = 'MODALITY_GROUP_COUNT',
}

export type ISummaryStatusDataFieldDTO = {
  /**
   * Số lượng request thuộc về loại reportStatus đó
   */
  total: number;
  status: ORDER_DIAGNOSIS_STEP_STATUS;
};

export type ISummaryStatusDataDTO = ISummaryStatusDataFieldDTO[];

export type IAnalyticsFilter = {
  /**
   * Ngày bắt đầu
   */
  fromDate: string;
  /**
   * Ngày kết thúc
   */
  toDate: string;

  /**
   * ID của dữ liệu thống kê cần xem
   */
  id: ANALYTIC_ID;
  requestedDateFrom?: string;
  requestedDateTo?: string;
};

/**
 * response data for api get summary modality
 */
export type ISummaryModalityDataFieldDTO = {
  modalityID: number;
  modality: IModalityDTO;
  total: number;
  insurance: number;
  inpatient: {
    insurance: number;
    total: number;
  };
  outpatient: {
    insurance: number;
    total: number;
  };
};

export type ISummaryModalityDataDTO = ISummaryModalityDataFieldDTO[];

export type ISummaryModalityGroupDataFieldDTO = {
  modalityGroupID: number;
  modalityGroup: IModalityGroupDTO;
  total: number;
  inpatient: {
    insurance: number;
    total: number;
  };
  outpatient: {
    insurance: number;
    total: number;
  };
};

export type ISummaryModalityGroupDataDTO = ISummaryModalityGroupDataFieldDTO[];

type ApproverRequestCounts = {
  [key: string]: number;
};

/**
 * data field for showing summary data in table
 */
export type ISummaryApproverDataTableField = {
  approverName: string;
  total: number;
  [key: string]: string | number; // for modality type data response from BE is dynamic
};

/**
 * response data for api get summary radiologist
 */
export type ISummaryApproverDataFieldDTO = {
  approver: ICloudUserDTO;
  approverID: number;
  details: ApproverRequestCounts;
  total: number;
};

export type ISummaryApproverDataDTO = ISummaryApproverDataFieldDTO[];

/**
 * response data for api get summary procedure
 */
export type ISummaryProcedureDataFieldDTO = {
  procedureID: number;
  procedure: IProcedureDTO;
  total: number;
  inpatient: {
    insurance: number;
    total: number;
  };
  outpatient: {
    insurance: number;
    total: number;
  };
};

export type ISummaryProcedureDataDTO = ISummaryProcedureDataFieldDTO[];

/**
 * dayOfWeek convert from response => weekday
 */
export enum DAY_OF_WEEK {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export type IProcedureCountByDayFieldDTO = {
  total: number;
  dow: DAY_OF_WEEK;
};

export type IProcedureCountByDayDataDTO = IProcedureCountByDayFieldDTO[];

// response type for each analyticId
export type ISummaryDataDTO = {
  [ANALYTIC_ID.STATUS_COUNT]: ISummaryStatusDataDTO;
  [ANALYTIC_ID.MODALITY_COUNT]: ISummaryModalityDataDTO;
  [ANALYTIC_ID.APPROVER_COUNT]: ISummaryApproverDataDTO;
  [ANALYTIC_ID.DAYOFWEEK_COUNT]: IProcedureCountByDayDataDTO;
  [ANALYTIC_ID.PROCEDURE_COUNT]: ISummaryProcedureDataDTO;
  [ANALYTIC_ID.MODALITY_GROUP_COUNT]: ISummaryModalityGroupDataDTO;
};

export type IApprovalByModalityDTO = BaseEntity & {
  total: number;
};
