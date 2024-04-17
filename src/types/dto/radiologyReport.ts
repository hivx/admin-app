import { Nullable, BaseEntity } from '@/types';

import { ConvertHTMLToPDFArgs } from '../pdf';

import { IConsumableUpdateDTO } from './consumable';
import { IFileDataDTO } from './fileData';
import { ICloudUserDTO, IUserDTO } from './user';

export const EXPORT = 'export';

export enum EXPORT_FORMAT {
  HTML = 'HTML',
  PDF = 'PDF',
}

export enum ORDER_DIAGNOSIS_STEP_STATUS {
  /**
   * Chưa sắn sàng đọc
   */
  NOT_READY = 'NOT_READY',
  /**
   * Chưa đọc
   */
  NOT_STARTED = 'NOT_STARTED',
  /**
   * Chờ duyệt
   */
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  /**
   * Đã duyệt
   */
  APPROVED = 'APPROVED',
}

export type IRadiologyReportPdfDTOBase = {
  pdf: IFileDataDTO;
  signer: ICloudUserDTO;
};
export type IRadiologyReportPdfDTO = Nullable<IRadiologyReportPdfDTOBase>;

export type IRadiologyReportMetadataBase = {
  attachments: IFileDataDTO[];
  createdDatetime: string;
  creator: ICloudUserDTO;
  hospitalID: string;
  pdf: IRadiologyReportPdfDTO;
  serviceID: BaseEntity['id'];
  transcriber: ICloudUserDTO;
};
export type IRadiologyReportMetadataDTO = Nullable<IRadiologyReportMetadataBase> &
  BaseEntity;

/**
 * Kết quả chẩn đoán hình ảnh
 * PENDING
 */
export type IRadiologyReportBase = {
  approvedTime: string;
  approver: ICloudUserDTO;
  /**
   * Kết quả
   */
  findings: string;
  /**
   * Kết luận
   */
  impression: string;
  /**
   * Đề nghị
   */
  comments: string;
  /**
   * Ghi chú
   */
  description: string;
  hospitalID: string;
  reportedTime: string;
  reporter: ICloudUserDTO;
  requestID: BaseEntity['id'];
  transcriber: ICloudUserDTO;
  imageFileIDs: Record<string, number>;
  images: Record<string, string>;
  uuid: string;
};

export type IRadiologyReportDTO = Nullable<IRadiologyReportBase> & BaseEntity;

export type IRadilogyReportDTOCreate = Pick<
  IRadiologyReportBase,
  'findings' | 'impression' | 'comments' | 'description'
> &
  Partial<Pick<IRadiologyReportBase, 'images'>> & { reporterID?: BaseEntity['id'] };

export type IRadilogyReportDTOApprove = {
  approvedModalityID?: BaseEntity['id'];
  approvedTime?: string;
  operationTime?: string;
  operators?: ICloudUserDTO[];
  operatorIDs?: BaseEntity['id'][];
  consumables?: IConsumableUpdateDTO[];
  expectedReporterID?: BaseEntity['id'];
  reporterID?: BaseEntity['id'];
} & Pick<
  IRadiologyReportDTO,
  'findings' | 'impression' | 'comments' | 'imageFileIDs' | 'images' | 'description'
>;

export type IRadilogyReportDTOQuickApprove = {
  approvedModalityID?: BaseEntity['id'];
  approvedTime?: string;
  operationTime?: string;
  operatorIDs?: BaseEntity['id'][];
  reportID: BaseEntity['id'];
  reporterID?: BaseEntity['id'];
  consumables?: IConsumableUpdateDTO[];
};

export type IRadilogyReportPdfDTOCreate = {
  layoutID: BaseEntity['id'];
  signerID: BaseEntity['id'];
  signed: boolean;
} & ConvertHTMLToPDFArgs;

export type IRadilogyReportDTOUpdate = BaseEntity & IRadilogyReportDTOCreate;

export type IRadiologyReportDTOExport = {
  orderID: BaseEntity['id'];
  reportID?: BaseEntity['id'];
  requestID: BaseEntity['id'];
  exportFormat: `${EXPORT_FORMAT}`;
  images?: IRadiologyReportDTO['images'];
  includeSignature: boolean;
  parameters?: Record<string, string | undefined>;
  layoutID: BaseEntity['id'];
};
