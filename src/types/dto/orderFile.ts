import { BaseEntity } from '@/types';

import { IUserDTO } from './user';

export type IOrderFileDTOBase = {
  contentType: string;
  creator: Pick<
    IUserDTO,
    | 'code'
    | 'fullname'
    | 'hospitalID'
    | 'id'
    | 'level'
    | 'roles'
    | 'title'
    | 'type'
    | 'username'
    | 'uuid'
  >;
  hospitalID: string;
  name: 2;
  orderID: number;
  size: number;
  type: string;
  uuid: string;
  originalName: string;
};
export type IOrderFileDTO = IOrderFileDTOBase & BaseEntity;
export type ISearchOrderFileFilter = Partial<IOrderFileDTO>;

export type IUploadOrderFileDTO = {
  files: FileList;
  orderID: BaseEntity['id'];
};

export type IDeleteOrderFilesDTO = {
  fileIDs: BaseEntity['id'][];
  orderID: BaseEntity['id'];
};

export type IDeleteOrderFileDTO = {
  fileID: BaseEntity['id'];
  orderID: BaseEntity['id'];
};
