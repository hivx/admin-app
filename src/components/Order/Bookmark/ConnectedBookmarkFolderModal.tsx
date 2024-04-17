import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode } from 'react';

import { useGetOneBookmarkFolderQuery } from '@/api/bookmarkFolder';
import { useDisclosure, useAppSelector } from '@/hooks';
import { BookmarkFunctionsProvider } from '@/providers/Order/BookmarkFunctionsProvider';
import { selectBookmarkFolderIdData } from '@/stores/bookmark';

import { CreateBookmarkFolderModal } from './CreateBookmarkFolderModal';
import { EditBookmarkFolderModal } from './EditBookmarkFolderModal';

export type ModalState = {
  disclosure: ReturnType<typeof useDisclosure>;
  handleClose: () => void;
  renderExtraButtons?: () => ReactNode;
};

/**
 * Prepare order data for study info modal
 */
export const ConnectedBookmarkFolderModal: FC<ModalState & { isEdit?: boolean }> = (
  props,
) => {
  const { isEdit, ...rest } = props;
  const folderID = useAppSelector(selectBookmarkFolderIdData);
  const { data: folderData } = useGetOneBookmarkFolderQuery(
    folderID ? { id: folderID } : skipToken,
  );
  return (
    <BookmarkFunctionsProvider>
      {isEdit && folderData ? (
        <EditBookmarkFolderModal {...rest} folder={folderData} />
      ) : (
        <CreateBookmarkFolderModal {...rest} />
      )}
    </BookmarkFunctionsProvider>
  );
};
