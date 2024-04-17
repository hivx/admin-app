import { Nullable } from '@/types';

import { IKioskModalityDTO } from './kioskModality';
import { ITicketProcedureDTOCreate } from './procedure';
/**
 * key is procedureID in ITicketProcedureDTOCreate
 */
export type IModalitySuggestionDTO = Record<string, IKioskModalityDTO>;

export type IProcedureSiteFilterDTO = {
  ids: number[];
  siteID: number;
};

export type IModalityFormItemBase = IKioskModalityDTO & {
  ticketProcedures: ITicketProcedureDTOCreate[];
};

export type IModalityFormItem = Nullable<IModalityFormItemBase>;
