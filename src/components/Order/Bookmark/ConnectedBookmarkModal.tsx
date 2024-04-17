import { styled, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { MyButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { useDisclosure } from '@/hooks';
import { BookmarkFunctionsProvider } from '@/providers/Order/BookmarkFunctionsProvider';
import { IBookmarkDTO, IOrderDTO } from '@/types/dto';

import { CreateBookmarkModal } from './CreateBookmarkModal';
import { UpdateBookmarkModal } from './UpdateBookmarkModal';

type ModalState = {
  title: string;
  disclosure: ReturnType<typeof useDisclosure>;
  handleClose: () => void;
  renderExtraButtons?: () => ReactNode;
};

/**
 * Prepare order data for study info modal
 */
export const ConnectedBookmarkModal: FC<
  ModalState & {
    orderID: IOrderDTO['id'];
    bookmarks: IBookmarkDTO[];
  }
> = (props) => {
  const { orderID, bookmarks, ...rest } = props;
  const { data: order } = useGetOneOrderQuery({ id: orderID }, { skip: !orderID });

  return order ? (
    <BookmarkFunctionsProvider>
      {bookmarks && bookmarks?.length ? (
        <UpdateBookmarkModal order={order} bookmarks={bookmarks} {...rest} />
      ) : (
        <CreateBookmarkModal order={order} {...rest} />
      )}
    </BookmarkFunctionsProvider>
  ) : (
    <></>
  );
};

/**
 * Style of Bookmark modal
 */

export const StyledBookmarkModal = styled(ModalContent)`
  width: 36vw;
  max-width: 36vw;
  min-width: 500px;
`;

export const StyledStudyInfoHeaderTitle = styled(Typography)`
  text-align: center;
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  padding: ${(props) => props.theme.spacing(0.5)} 0;
`;

export const StyledStudyInfoBody = styled('div')`
  overflow: auto;
  width: 100%;
  padding: ${(props) => props.theme.spacing(2)};
  /* height: 85vh; */
`;

export const StyledStudyInfoFooter = styled('div')`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
`;

export const StyledPrimaryButton = styled(MyButton)`
  padding: ${(props) => props.theme.spacing(0.2)} ${(props) => props.theme.spacing(1)};
`;
