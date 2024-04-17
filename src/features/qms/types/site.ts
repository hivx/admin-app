import { BaseEntity } from '@/types';

import { IQmsModalityDTO } from './qmsModality';

export type ISiteDTOBase = {
  name: string;
  modalityTypes: string[];
  modalities: IQmsModalityDTO[];
};

export type ISiteDTO = BaseEntity & ISiteDTOBase;
