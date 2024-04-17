import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';

import {
  useGetListBookmarkFolderQuery,
  useLazyGetListBookmarkFolderQuery,
} from '@/api/bookmarkFolder';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectBookmarkFolderIdData,
  setBookmarkFolderID,
} from '@/stores/bookmark/bookmarkSlice';

import { BookmarkFolderAutocompleteField } from './BookmarkFolderAutocompleteField';

export const BookmarkTableAutocompleteFilter = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const [trigger] = useLazyGetListBookmarkFolderQuery();
  const folderID = useAppSelector(selectBookmarkFolderIdData);
  const { data, isFetching } = useGetListBookmarkFolderQuery({ filter: {} });
  const folderList = data?.list;
  const initialFolder = !folderID
    ? folderList?.[0]
    : folderList?.find((folder) => folder.id === folderID);
  useEffect(() => {
    initialFolder &&
      dispatch(
        setBookmarkFolderID({
          folderID: initialFolder.id,
        }),
      );
  }, [data?.list, dispatch, folderID, initialFolder]);
  return (
    <div style={{ width: '100%' }}>
      <BookmarkFolderAutocompleteField
        key={`${initialFolder?.name}-${initialFolder?.description}`}
        folders={data ? data.list : []}
        initialValue={initialFolder}
        isFetching={isFetching}
        placeholder={translate.bookmark.folder()}
        onOpen={() => trigger({ filter: {} }, true)}
        onSelectFolder={(folder) =>
          dispatch(
            setBookmarkFolderID({
              folderID: folder.id,
            }),
          )
        }
      />
    </div>
  );
};
