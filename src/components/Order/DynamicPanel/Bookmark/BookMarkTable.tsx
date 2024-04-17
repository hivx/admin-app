import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, PropsWithChildren, ReactNode, useEffect, useMemo, useRef } from 'react';

import {
  useGetListBookmarkByFolderIDQuery,
  useLazyGetListBookmarkByFolderIDQuery,
} from '@/api/bookmark';
import OrderTableStyles from '@/components/Order/OrderTable.styles';
import OrderTablePatientNameColumn from '@/components/Order/OrderTablePatientNameColumn';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useOrderListContext } from '@/providers/Order/OrderListFunctionsProvider';
import { selectBookmarkFolderIdData } from '@/stores/bookmark';
import { TABLE_BOOKMARK } from '@/stores/table/tableInitialState';
import { IBookmarkDTO, IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { BookmarkTableActionButtons } from './BookmarkTableActionButtons';

const { StyledOrderTableRow } = OrderTableStyles;

type BookMarkTableProps = {
  FilterComponent: ReactNode;
};
export const BookMarkTable: FC<BookMarkTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const folderID = useAppSelector(selectBookmarkFolderIdData);
  const { key } = useOrderListContext();
  const [triggerBookmarkByFolder] = useLazyGetListBookmarkByFolderIDQuery();
  const { data, isFetching, refetch } = useGetListBookmarkByFolderIDQuery(
    folderID
      ? {
          folderID,
        }
      : skipToken,
  );

  useEffect(() => {
    folderID && triggerBookmarkByFolder({ folderID });
  }, [folderID, key, triggerBookmarkByFolder]);

  const tableColumns = useMemo<ITableField<IBookmarkDTO>[]>(() => {
    const CellWrapper: FC<PropsWithChildren<{ order: IOrderDTO }>> = ({
      order,
      children,
    }) => (
      <StyledOrderTableRow $reportStatus={order.reportStatus} $urgent={order.urgent}>
        {children}
      </StyledOrderTableRow>
    );
    return [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'patientName',
            header: translate.resources.order.patient.fullname.long(),
            cell: (props) =>
              props.row.original.order && (
                <CellWrapper order={props.row.original.order}>
                  <OrderTablePatientNameColumn order={props.row.original.order} />
                </CellWrapper>
              ),
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'modalityType',
            header: translate.resources.order.modalityType.short(),
            cell: (props) =>
              props.row.original.order && (
                <CellWrapper order={props.row.original.order}>
                  {props.row.original.order.modalityType}
                </CellWrapper>
              ),
            maxSize: 70,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'bodyPart',
            header: translate.resources.study.bodyPartExamined.title(),
            cell: (props) =>
              props.row.original.order && (
                <CellWrapper order={props.row.original.order}>
                  {props.row.original.order.study?.bodyPartExamined}
                </CellWrapper>
              ),
            maxSize: 100,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'studyTime',
            header: translate.resources.study.studyDatetime(),
            cell: (props) =>
              props.row.original.order && (
                <CellWrapper order={props.row.original.order}>
                  {props.row.original.order.study?.studyTime &&
                    itechDateTimeToDayjs(
                      props.row.original.order.study.studyTime,
                    )?.format(DISPLAY_FORMAT.dateTimeNoSecond)}
                </CellWrapper>
              ),
          }),
      },
    ];
  }, [translate.resources.order, translate.resources.study]);

  return (
    <>
      <MyTable
        tableId={TABLE_BOOKMARK}
        tableContainerRef={tableContainerRef}
        data={data?.list}
        tableColumnsDescription={tableColumns}
        FilterComponent={FilterComponent}
        MyDataGridProps={{
          isLoading: isFetching,
          selectRowOnRightClick: false,
          hasRowClick: true,
        }}
        paginationControls={{
          totalRecords: data?.meta.totalRecords,
          pageSize: data?.list.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: false,
        }}
        renderActionButtons={() => <BookmarkTableActionButtons refetch={refetch} />}
      />
    </>
  );
};
