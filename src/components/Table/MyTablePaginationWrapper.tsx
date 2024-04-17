import React, { FC } from 'react';

import { useDetectSmallTableSize } from '@/hooks/useDetectSmallTableSize';

import { TableRefType } from './MyTable';
import { MyTablePagination, MyTablePaginationProps } from './MyTablePagination';

type MyTablePaginationWrapperProps = {
  tableContainerRef?: TableRefType['tableContainerRef'];
} & MyTablePaginationProps;

/**
 * Wrap MyTablePagination
 * to handle whether to simplify pagination or not
 */
export const MyTablePaginationWrapper: FC<MyTablePaginationWrapperProps> = (props) => {
  const { tableContainerRef, showPaginationInfo, ...rest } = props;

  const isSmallTableSize = useDetectSmallTableSize(tableContainerRef);

  return (
    <MyTablePagination
      showPaginationInfo={showPaginationInfo && !isSmallTableSize}
      {...rest}
    />
  );
};
