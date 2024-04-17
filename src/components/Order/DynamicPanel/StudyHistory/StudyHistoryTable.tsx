import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ComponentProps, FC, useMemo } from 'react';

import { useGetListOrdersHistoryQuery } from '@/api/order';
import { OrderTableRequestProcedureColumn } from '@/components/Order/OrderTableRequestProcedureColumn';
import { MyTable, ITableField } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { TABLE_ORDER_HISTORY } from '@/stores/table/tableInitialState';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { OrderHistoryRightClickMenu } from '../../../../features/order/components/OrderList/Panel/OrderHistoryRightClickMenu';
import { useHistoryStudyTable } from '../../../../features/order/hooks/useHistoryStudyTable';
import { SidePanelDisplayTable } from '../SidePanelDisplayTable';

import { StudyHistory } from './StudyHistory';

type StudyHistoryTableProps = ComponentProps<typeof StudyHistory>;

export const StudyHistoryTable: FC<StudyHistoryTableProps> = (props) => {
  const translate = useTranslate();
  const { order, onOrderChanged } = props;
  const { open } = useContextMenu(TABLE_ORDER_HISTORY);

  const patientID = order?.patient?.id;
  const { data, isFetching, refetch } = useGetListOrdersHistoryQuery(
    patientID ? { filter: { patientID } } : skipToken,
  );
  const { handleHistoryStudy, orderHistoryListReverse } = useHistoryStudyTable(
    data?.list,
  );
  //--------------------------------

  const tableColumns = useMemo<ITableField<IOrderDTO>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'studyTime',
            header: translate.resources.study.studyDatetime(),
            cell: (props) =>
              props.row.original.study?.studyTime
                ? itechDateTimeToDayjs(props.row.original.study.studyTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )
                : '',
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'requests',
            header: translate.resources.order.requests(),
            cell: (props) => (
              <OrderTableRequestProcedureColumn order={props.row.original} />
            ),
          }),
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: 'Loại',
        columnDefOptions: {
          maxSize: 50,
        },
        enableSort: true,
      },
    ],
    [translate.resources.order, translate.resources.study],
  );
  // translate.resources.procedure.name()
  return (
    <SidePanelDisplayTable
      TableComponent={
        <>
          <MyTable
            tableId={TABLE_ORDER_HISTORY}
            data={orderHistoryListReverse}
            manualSorting={false}
            tableColumnsDescription={tableColumns}
            showPaginationInfo={false}
            showPagination={false}
            MyDataGridProps={{
              isLoading: isFetching,
              hasRowClick: true,
              onRowClick: (e, row) => {
                onOrderChanged && onOrderChanged(row.original);
              },
              onRowRightClick: (e, row) => {
                open(e, row.original);
              },
              onRowDoubleClick: (e, row) => handleHistoryStudy(row),
            }}
            paginationControls={{
              totalRecords: data?.meta.totalRecords,
              pageSize: data?.list.length,
            }}
            TanstackTableOptions={{
              enableRowSelection: true,
              enableMultiRowSelection: false,
            }}
            hiddenFooter
          />
          <OrderHistoryRightClickMenu menuID={TABLE_ORDER_HISTORY} />
        </>
      }
    />
  );
};
