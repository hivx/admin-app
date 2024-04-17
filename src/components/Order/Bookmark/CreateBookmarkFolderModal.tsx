import { Modal } from '@mui/material';
import { FC } from 'react';

import { MyButton } from '@/components';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useTranslate } from '@/hooks';
import {
  BookmarkFunctionsProvider,
  useBookmarkFunctions,
} from '@/providers/Order/BookmarkFunctionsProvider';

import { ModalState } from './ConnectedBookmarkFolderModal';
import {
  StyledBookmarkModal,
  StyledPrimaryButton,
  StyledStudyInfoBody,
  StyledStudyInfoFooter,
  StyledStudyInfoHeaderTitle,
} from './ConnectedBookmarkModal';
import { CreateBookmarkFolderForm } from './CreateBookmarkFolderForm';

type CreateBookmarkFolderProps = ModalState;

export const CreateBookmarkFolderModal: FC<CreateBookmarkFolderProps> = (props) => {
  const { disclosure, handleClose } = props;

  const translate = useTranslate();
  const bookmarkFunctions = useBookmarkFunctions();

  return (
    <BookmarkFunctionsProvider>
      <Modal open={disclosure.isOpen}>
        <StyledBookmarkModal
          renderTitle={() => (
            <StyledStudyInfoHeaderTitle textTransform="uppercase">
              {translate.buttons.createFolder()}
            </StyledStudyInfoHeaderTitle>
          )}
          renderBody={() => (
            <StyledStudyInfoBody>
              <CreateBookmarkFolderForm onSuccessCallback={handleClose} />
            </StyledStudyInfoBody>
          )}
          renderFooter={() => (
            <StyledStudyInfoFooter>
              <ModalFooterLayout
                ActionButton={
                  <StyledPrimaryButton
                    variant="contained"
                    onClick={() => bookmarkFunctions.createBookMarkFolder()}
                  >
                    {translate.buttons.create()}
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
