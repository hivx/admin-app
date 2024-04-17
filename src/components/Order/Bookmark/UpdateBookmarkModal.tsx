import { Box, Modal } from '@mui/material';
import { FC, ReactNode } from 'react';

import { useDeleteBookmarkMutation } from '@/api/bookmark';
import { MyButton } from '@/components';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
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
import GroupPrimaryButton from './GroupPrimaryButton';
import { UpdateBookmarkForm } from './UpdateBookmarkForm';

type ModalState = {
  title: string;
  disclosure: ReturnType<typeof useDisclosure>;
  handleClose: () => void;
  renderExtraButtons?: () => ReactNode;
};

type UpdateBookmarkModalProps = {
  order: IOrderDTO;
  bookmarks?: IBookmarkDTO[];
} & ModalState;

export const UpdateBookmarkModal: FC<UpdateBookmarkModalProps> = (props) => {
  const { order, disclosure, title, handleClose, bookmarks } = props;

  const translate = useTranslate();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const bookmarkFunctions = useBookmarkFunctions();
  const bookmarkByOrderID = bookmarks?.find((bookmark) => bookmark.orderID === order.id);
  const { setKey } = useOrderListContext();
  const notifyModal = useNotifyModal();
  const notifyDeleteSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.bookmark.title().toLowerCase(),
    }),
  );

  const notifyDeleteError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.bookmark.title().toLowerCase(),
    }),
  );

  const handleClickDeleteOrder = () => {
    if (order) {
      notifyModal({
        message: `${translate.messages.notification.deleteBookmark({
          name: `${order.patient?.fullname}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const res = await deleteBookmark({ id: bookmarkByOrderID?.id ?? 0 });
            if ('error' in res) {
              notifyDeleteError();
            } else {
              setKey && setKey(uuidv4());
              notifyDeleteSuccess();
              disclosure.close();
            }
          },
        },
      });
    }
  };

  return (
    <Modal open={disclosure.isOpen}>
      <StyledBookmarkModal
        key={bookmarkByOrderID?.id}
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
                  <UpdateBookmarkForm
                    bookmark={bookmarkByOrderID}
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
                <GroupPrimaryButton onSave={() => bookmarkFunctions.updateBookMark()} />
              }
              OptionalButtons={[
                props.renderExtraButtons?.(),
                <MyButton
                  key={translate.buttons.delete()}
                  variant="outlined"
                  color="error"
                  onClick={handleClickDeleteOrder}
                >
                  {translate.buttons.delete()}
                </MyButton>,

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
