import React, { FC } from 'react';

import { IOrderDTO } from '@/types/dto';

import { BookMarkTable } from './BookMarkTable';
import { BookmarkTableAutocompleteFilter } from './BookmarkTableAutocompleteFilter';
import { BookmarkTableShell } from './BookmarkTableShell';

type OrderBookmarkDynamicPanelProps = {
  order?: IOrderDTO;
};

const OrderBookmarkDynamicPanel: FC<OrderBookmarkDynamicPanelProps> = (props) => {
  const { order } = props;
  return (
    <BookmarkTableShell
      TableComponent={
        <BookMarkTable FilterComponent={<BookmarkTableAutocompleteFilter />} />
      }
    />
  );
};

export default OrderBookmarkDynamicPanel;
