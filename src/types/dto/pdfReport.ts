import { BaseEntity, Voidable } from '..';

import { IFileMetadataDTO } from './fileMetadata';
import { ICloudUserDTO } from './user';

export type IOrderPdfReportBase = {
  contentType: string;
  hospitalID: string;
  layoutID: BaseEntity['id'];
  name: string;
  originalName: string;
  rawFileMetadata: IFileMetadataDTO;
  reportID: BaseEntity['id'];
  signedFileMetadata: IFileMetadataDTO;
  signer: ICloudUserDTO;
  signedFileID: number;
  size: number;
  uuid: string;
};

export type IOrderPdfReportDTO = IOrderPdfReportBase & BaseEntity & Voidable;
