import { Nullable } from '@/types';

import { ITicketProcedureDTOCreate } from './procedure';
import { IQmsModalityDTO } from './qmsModality';
/**
 * key is procedureID in ITicketProcedureDTOCreate
 */
export type IModalitySuggestionDTO = Record<string, IQmsModalityDTO>;

export type IProcedureSiteFilterDTO = {
  ids: number[];
  siteID: number;
};

export type IModalityFormItemBase = IQmsModalityDTO & {
  ticketProcedures: ITicketProcedureDTOCreate[];
};

export type IModalityFormItem = Nullable<IModalityFormItemBase>;
