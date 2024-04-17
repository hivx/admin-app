import { BaseEntity } from '..';

export type IUploadDicomDTO = {
  newSeries: boolean;
  modalityID: BaseEntity['id'];
  files: File[];
};
