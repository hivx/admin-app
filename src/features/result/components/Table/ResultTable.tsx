import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, PropsWithChildren, ReactNode, useMemo, useRef } from 'react';

import { useGetListOrdersQuery } from '@/api/order';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import OrderTableStyles from '@/components/Order/OrderTable.styles';
import OrderTablePatientNameColumn from '@/components/Order/OrderTablePatientNameColumn';
import { OrderTableRequestProcedureColumn } from '@/components/Order/OrderTableRequestProcedureColumn';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { getFinalApprovedRequest } from '@/lib/dataHelper/radiologyReport/getFinalApprovedRequest';
import { TABLE_RESULT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
// import { getListMockResources } from '@/test/data/getListMockData';
// import { orderGenerator } from '@/test/data/orderGenerator';
import { IOrderDTO, IOrderRequestDTO, ISearchOrderFilter } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { sortOrderResultTableData } from '../../lib/dataHelper/sortOrderResultTableData';

import { ResultActionButtons } from './ResultActionButtons';

// import { TestCreateOrderList } from './TestCreateOrders';
// import { TestCreatePatients } from './TestCreatePatients';
/**
 * Test data
 */
// const data = getListMockResources(orderGenerator, 100);

const { StyledOrderTableRow } = OrderTableStyles;

/**
 * After 60s -> auto refetch data order table
 */
const ORDER_POLLING_INTERVAL = 60 * 1000;

const getOrderFinalApprovedTime = (requests: IOrderRequestDTO[]) => {
  const finalApprovedTime = requests.find(
    (request) => !!request.finalApprovedTime,
  )?.finalApprovedTime;

  if (finalApprovedTime)
    return itechDateTimeToDayjs(finalApprovedTime)?.format(
      DISPLAY_FORMAT.dateTimeNoSecond,
    );
  return '-';
};

type ResultTableProps = {
  FilterComponent: ReactNode;
};

export const ResultTable: FC<ResultTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(TABLE_RESULT));
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { data, isFetching, refetch } = useGetListOrdersQuery(query ? query : skipToken, {
    pollingInterval: ORDER_POLLING_INTERVAL,
  });
  const { open } = useContextMenu();

  const sortedData = useMemo<IOrderDTO[]>(
    () => sortOrderResultTableData(data?.list),
    [data?.list],
  );

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
            id: 'stt',
            header: translate.messages.stt(),
            cell: (props) => (
              <StyledDivCenterChildren>
                <CellWrapper order={props.row.original}>
                  {props.row.index + 1}
                </CellWrapper>
              </StyledDivCenterChildren>
            ),
            maxSize: 30,
          }),
      },
      {
        type: 'record',
        name: 'accessionNumber',
        headerLabel: translate.resources.order.accessionNumber.long(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>{context.getValue()}</CellWrapper>
        ),
        columnDefOptions: {
          maxSize: 50,
        },
      },
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
            maxSize: 100,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'patientPID',
            header: translate.resources.order.patient.pid.long(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.patient?.pid}
              </CellWrapper>
            ),
            maxSize: 30,
          }),
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
            maxSize: 30,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'bodyParts',
            header: translate.resources.order.bodyParts.long(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.study?.bodyPartExamined || '-'}
              </CellWrapper>
            ),
            size: 50,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'requests',
            header: translate.resources.order.requests(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                <OrderTableRequestProcedureColumn order={props.row.original} />
              </CellWrapper>
            ),
            size: 400,
          }),
      },

      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.order.deviceType.short(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>{context.getValue()}</CellWrapper>
        ),
        columnDefOptions: {
          maxSize: 50,
        },
      },
      {
        type: 'record',
        name: 'requestedTime',
        headerLabel: translate.resources.order.requestedDate.long(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>
            {itechDateTimeToDayjs(context.getValue())?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            )}
          </CellWrapper>
        ),
        columnDefOptions: { maxSize: 100 },
        enableSort: true,
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'finalApprovedTime',
            header: translate.resources.order.approvedDate.short(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.requests
                  ? getOrderFinalApprovedTime(props.row.original.requests)
                  : '-'}
              </CellWrapper>
            ),
            maxSize: 100,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'approver',
            header: translate.resources.order.lockedBy.long(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {(props.row.original.requests &&
                  getFinalApprovedRequest(props.row.original)?.finalApprover?.fullname) ??
                  '-'}
              </CellWrapper>
            ),
            maxSize: 100,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'requestedDepartment',
            header: translate.resources.order.requestedDepartment.long(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.requestedDepartment?.name ?? '-'}
              </CellWrapper>
            ),
            maxSize: 100,
          }),
      },
    ];
  }, [translate.messages, translate.resources.order]);

  return (
    <>
      <MyTable
        tableId={TABLE_RESULT}
        data={sortedData}
        tableContainerRef={tableContainerRef}
        tableColumnsDescription={tableColumns}
        FilterComponent={FilterComponent}
        MyDataGridProps={{
          isLoading: isFetching,
          selectRowOnRightClick: false,
          hasRowClick: true,
          onRowRightClick: (e, row) => {
            open(e, row.original);
          },
        }}
        paginationControls={{
          totalRecords: data?.meta.totalRecords,
          pageSize: sortedData.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: false,
        }}
        renderActionButtons={() => <ResultActionButtons refetch={refetch} />}
      />
    </>
  );
};
