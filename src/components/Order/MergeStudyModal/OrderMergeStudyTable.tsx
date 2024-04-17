import { FC, PropsWithChildren, useMemo } from 'react';

import OrderTableStyles from '@/components/Order/OrderTable.styles';
import OrderTablePatientNameColumn from '@/components/Order/OrderTablePatientNameColumn';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_ORDER_MERGE_STUDY } from '@/stores/table/tableInitialState';
import { IOrderDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { useOrderMergeStudyTable } from '../../../features/order/hooks/useOrderMergeStudyTable';

import { ConnectedRequestListFilterForm } from './RequestListFilterForm';

const { StyledOrderTableRow } = OrderTableStyles;

type ConnectedOrderMergeStudyTableProps = {
  order?: IOrderDTO;
};
export const ConnectedOrderMergeStudyTable: FC<ConnectedOrderMergeStudyTableProps> = (
  props,
) => {
  const { order } = props;
  const { isLoading, filterDataList } = useOrderMergeStudyTable(order);
  if (isLoading) {
    <></>;
  }

  return <OrderMergeStudyTable orderList={filterDataList} />;
};

type OrderMergeStudyTableProps = {
  orderList?: IOrderDTO[];
};
const OrderMergeStudyTable: FC<OrderMergeStudyTableProps> = (props) => {
  const { orderList } = props;
  const translate = useTranslate();

  const tableColumns = useMemo<ITableField<IOrderDTO>[]>(() => {
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
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                <OrderTablePatientNameColumn order={props.row.original} />
              </CellWrapper>
            ),
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'patientPID',
            header: translate.resources.order.patient.pid.short(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.patient?.pid}
              </CellWrapper>
            ),
          }),
      },
      {
        type: 'record',
        name: 'accessionNumber',
        headerLabel: translate.resources.order.accessionNumber.long(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>{context.getValue()}</CellWrapper>
        ),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'patientGender',
            header: translate.resources.order.patient.gender(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.patient?.gender &&
                  translate.messages.gender({
                    gender: props.row.original.patient?.gender,
                  })}
              </CellWrapper>
            ),
            maxSize: 100,
          }),
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.order.modalityType.long(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>{context.getValue()}</CellWrapper>
        ),
        columnDefOptions: {
          maxSize: 70,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'studyDatetime',
            header: translate.resources.study.studyDatetime(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.study?.studyTime &&
                  itechDateTimeToDayjs(props.row.original.study.studyTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )}
              </CellWrapper>
            ),
          }),
      },
    ];
  }, [translate.messages, translate.resources.order, translate.resources.study]);

  return (
    <MyTable
      tableId={TABLE_ORDER_MERGE_STUDY}
      data={orderList}
      FilterComponent={<ConnectedRequestListFilterForm />}
      initialFirstRowSelected
      manualSorting={false}
      tableColumnsDescription={tableColumns}
      showPaginationInfo={false}
      showPagination={false}
      MyDataGridProps={{
        hasRowClick: true,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};
