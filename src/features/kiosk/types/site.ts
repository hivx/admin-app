import { BaseEntity } from '@/types';

import { IKioskModalityDTO } from './kioskModality';

export type ISiteDTOBase = {
  name: string;
  modalityTypes: string[];
  modalities: IKioskModalityDTO[];
};

export type ISiteDTO = BaseEntity & ISiteDTOBase;
