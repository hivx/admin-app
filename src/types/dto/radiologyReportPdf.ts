import { BaseEntity, Nullable, Voidable } from '..';
import { ConvertHTMLToPDFArgs } from '../pdf';

import { ICloudUserDTO } from './user';

export type IRadilogyReportPdfBase = {
  contentType: string;
  hospitalID: string;
  layoutID: number;
  name: string;
  originalName: string;
  reportID: number;
  signer: ICloudUserDTO;
  size: number;
  uuid: string;
};

export type IRadiologyReportPdfDTO = Nullable<IRadilogyReportPdfBase> &
  BaseEntity &
  Voidable;

export type IRadiologyReportPdfDTOCreate = ConvertHTMLToPDFArgs;
