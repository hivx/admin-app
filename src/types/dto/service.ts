import { BaseEntity, Nullable } from '@/types';

import { ORDER_CREATION_TYPE } from './order';
import { IRadiologyReportMetadataDTO } from './radiologyReport';
import { ICloudUserDTO } from './user';

export type IServiceDTOBase = {
  analyzedDatetime: string;
  approvedConclusion: string;
  approvedDatetime: string;
  approvedReportID: BaseEntity['id'];
  approver: ICloudUserDTO;
  creationType: `${ORDER_CREATION_TYPE}`;
  hisSentDatetime: string;
  hospitalID: string;
  icdCode: string;
  orderID: BaseEntity['id'];
  procedureID: BaseEntity['id'];
  reports: IRadiologyReportMetadataDTO[];
  requestedDatetime: string;
  requestedModalityType: string;
  requestedNumber: string;
  requestedProcedureCode: string;
  requestedProcedureName: string;
  signedDatetime: string;
  signerInfo: string;
};

/**
 * this is OrderProcedureDTO on backend
 */
export type IServiceDTO = Nullable<IServiceDTOBase> & BaseEntity;
