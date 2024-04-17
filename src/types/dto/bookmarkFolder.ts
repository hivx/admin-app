import { BaseEntity, Nullable } from '..';

import { IBookmarFolderBase } from './bookmark';

/**
 * Bookmark Folder
 */
export type IBookmarkFolderDTO = Nullable<IBookmarFolderBase> & BaseEntity;

export type IBookmarkFolderDTOCreate = Partial<{
  name: string;
  description: string;
}>;

export type IBookmarkFolderDTOUpdate = IBookmarkFolderDTOCreate & BaseEntity;

export type IBookmarkFolderDTODelete = BaseEntity;
