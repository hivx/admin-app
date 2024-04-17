import { Nullable, BaseEntity } from '@/types';

export type IKioskModalityDTOBase = {
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

// export type IQmsModalitySearch = {
//   ids?: number[];
//   modalityTypes?: IKioskModalityTypeDTO[];
//   siteID?: number;
// };

/**
 * type IKioskModalityDTO is ModalityDTO in API
 */
export type IKioskModalityDTO = BaseEntity & Nullable<IKioskModalityDTOBase>;

// export type IQmsModalityUpdateDTO = BaseEntity & Pick<IKioskModalityDTO, 'enabled'>;
