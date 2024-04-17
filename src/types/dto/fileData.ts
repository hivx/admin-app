import { BaseEntity, Nullable } from '@/types';

export type IFileDataDTOBase = {
  contentType: string;
  filename: string;
  filesize: number;
  hospitalID: string;
};
export type IFileDataDTO = Nullable<IFileDataDTOBase> & BaseEntity;
