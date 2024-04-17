import { BaseEntity, Nullable, Voidable } from '@/types';

export type IFileMetadataDTOBase = {
  contentType: string;
  folderPath: string;
  hospitalID: string;
  name: string;
  originalName: string;
  size: number;
  type: string;
  uuid: string;
};

export type IFileMetadataDTO = Nullable<IFileMetadataDTOBase> & BaseEntity & Voidable;
