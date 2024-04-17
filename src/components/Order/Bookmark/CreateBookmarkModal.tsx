import { Box, Modal } from '@mui/material';
import { FC, ReactNode } from 'react';

import { MyButton } from '@/components';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useDisclosure, useTranslate } from '@/hooks';
import { useBookmarkFunctions } from '@/providers/Order/BookmarkFunctionsProvider';
import { useOrderListContext } from '@/providers/Order/OrderListFunctionsProvider';
import { IBookmarkDTO, IOrderDTO } from '@/types/dto';
import { uuidv4 } from '@/utils/uuidv4';

import BookMarkContentWrapper from './BookMarkContentWrapper';
import BookmarkOrderInfo from './BookmarkOrderInfo';
import {
  StyledBookmarkModal,
  StyledStudyInfoBody,
  StyledStudyInfoFooter,
  StyledStudyInfoHeaderTitle,
} from './ConnectedBookmarkModal';
import { CreateBookmarkForm } from './CreateBookmarkForm';
import GroupPrimaryButton from './GroupPrimaryButton';

type ModalState = {
  title: string;
  disclosure: ReturnType<typeof useDisclosure>;
  handleClose: () => void;
  renderExtraButtons?: () => ReactNode;
};

type CreateBookmarkModalProps = {
  order: IOrderDTO;
  bookmarks?: IBookmarkDTO[];
} & ModalState;

export const CreateBookmarkModal: FC<CreateBookmarkModalProps> = (props) => {
  const { order, disclosure, title, handleClose } = props;

  const translate = useTranslate();
  const bookmarkFunctions = useBookmarkFunctions();
  const { setKey } = useOrderListContext();

  return (
    <Modal open={disclosure.isOpen}>
      <StyledBookmarkModal
        key={order?.id}
        renderTitle={() => (
          <StyledStudyInfoHeaderTitle textTransform="uppercase">
            {title}
          </StyledStudyInfoHeaderTitle>
        )}
        renderBody={() =>
          order ? (
            <StyledStudyInfoBody>
              <BookMarkContentWrapper
                OrderInfo={<BookmarkOrderInfo order={order} />}
                BookmarkFields={
                  <CreateBookmarkForm
                    order={order}
                    onSuccessCallback={() => {
                      setKey && setKey(uuidv4());
                      handleClose();
                    }}
                  />
                }
              ></BookMarkContentWrapper>
            </StyledStudyInfoBody>
          ) : (
            <Box height="500px"></Box>
          )
        }
        renderFooter={() => (
          <StyledStudyInfoFooter>
            <ModalFooterLayout
              ActionButton={
                <GroupPrimaryButton onSave={() => bookmarkFunctions.createBookMark()} />
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
  );
};
