import { Nullable, BaseEntity } from '@/types';

import { IQmsModalityTypeDTO } from './qmsModalityType';

export type IQmsModalityDTOBase = {
  siteID: number;
  name: string;
  code: string;
  modalityType: string;
  roomName: string;
  totalPatients: number;
  totalCompletedPatients: number;
  currentNumber: number;
  enabled: boolean;
  speakerID: number;
};

export type IQmsModalitySearch = {
  ids?: number[];
  modalityTypes?: IQmsModalityTypeDTO[];
  siteID?: number;
};

/**
 * type IQmsModalityDTO is ModalityDTO in API
 */
export type IQmsModalityDTO = BaseEntity & Nullable<IQmsModalityDTOBase>;

export type IQmsModalityUpdateDTO = BaseEntity & Pick<IQmsModalityDTO, 'enabled'>;
