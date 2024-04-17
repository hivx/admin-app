import { Modal } from '@mui/material';
import { FC } from 'react';

import { MyButton } from '@/components';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useTranslate } from '@/hooks';
import {
  BookmarkFunctionsProvider,
  useBookmarkFunctions,
} from '@/providers/Order/BookmarkFunctionsProvider';
import { IBookmarkFolderDTO } from '@/types/dto/bookmarkFolder';

import { ModalState } from './ConnectedBookmarkFolderModal';
import {
  StyledBookmarkModal,
  StyledPrimaryButton,
  StyledStudyInfoBody,
  StyledStudyInfoFooter,
  StyledStudyInfoHeaderTitle,
} from './ConnectedBookmarkModal';
import { UpdateBookmarkFolderForm } from './UpdateBookmarkFolderForm';

type EditBookmarkFolderModalProps = ModalState & { folder: IBookmarkFolderDTO };

export const EditBookmarkFolderModal: FC<EditBookmarkFolderModalProps> = (props) => {
  const { disclosure, handleClose, folder } = props;

  const translate = useTranslate();
  const bookmarkFunctions = useBookmarkFunctions();

  return (
    <BookmarkFunctionsProvider>
      <Modal open={disclosure.isOpen}>
        <StyledBookmarkModal
          renderTitle={() => (
            <StyledStudyInfoHeaderTitle textTransform="uppercase">
              {translate.buttons.editFolder()}
            </StyledStudyInfoHeaderTitle>
          )}
          renderBody={() => (
            <StyledStudyInfoBody>
              <UpdateBookmarkFolderForm folder={folder} onSuccessCallback={handleClose} />
            </StyledStudyInfoBody>
          )}
          renderFooter={() => (
            <StyledStudyInfoFooter>
              <ModalFooterLayout
                ActionButton={
                  <StyledPrimaryButton
                    variant="contained"
                    onClick={() => bookmarkFunctions.updateBookMarkFolder()}
                  >
                    {translate.buttons.edit()}
                  </StyledPrimaryButton>
                }
                OptionalButtons={[
                  <MyButton
                    key={translate.buttons.close()}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    {translate.buttons.close()}
                  </MyButton>,
                ]}
              />
            </StyledStudyInfoFooter>
          )}
        />
      </Modal>
    </BookmarkFunctionsProvider>
  );
};
