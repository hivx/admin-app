import { BaseEntity, Nullable } from '..';

import { IOrderDTO } from './order';

export type IBookmarkBase = {
  description: string;
  folderID: BaseEntity['id'];
  hospitalID: string;
  order: IOrderDTO;
  orderID: BaseEntity['id'];
  uuid: string;
};

export type IBookmarkDTO = Nullable<IBookmarkBase> & BaseEntity;

export type IBookmarkDTOCreate = Partial<
  Pick<IBookmarkBase, 'folderID' | 'orderID' | 'description'>
>;

export type IBookmarkDTOUpdate = BaseEntity &
  Partial<Pick<IBookmarkBase, 'description' | 'folderID'>>;

export type ISearchBookmarkFilter = Partial<{
  folderID: BaseEntity['id'];
  ids: BaseEntity['id'][];
  orderID: BaseEntity['id'];
  ownerID: BaseEntity['id'];
}>;

export type IBookmarkDTODelete = BaseEntity;

export type IBookmarFolderBase = {
  hospitalID: string;
  uuid: string;
  owner: string;
  name: string;
  description: string;
};
