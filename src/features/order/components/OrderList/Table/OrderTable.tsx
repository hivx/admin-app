import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, PropsWithChildren, ReactNode, useMemo, useRef } from 'react';

import { useGetListOrdersQuery } from '@/api/order';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import OrderTableStyles from '@/components/Order/OrderTable.styles';
import OrderTableInfoColumn from '@/components/Order/OrderTableInfoColumn';
import OrderTablePatientNameColumn from '@/components/Order/OrderTablePatientNameColumn';
import { OrderTableRequestProcedureColumn } from '@/components/Order/OrderTableRequestProcedureColumn';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { getPatientAge } from '@/lib/dataHelper/radiologyReport/getPatientAge';
import { setPanelOrderID } from '@/stores/OrderRadiology';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
// import { getListMockResources } from '@/test/data/getListMockData';
// import { orderGenerator } from '@/test/data/orderGenerator';
import { IGetManyResourcesQuery } from '@/types';
import { IOrderDTO, ISearchOrderFilter, USER_TYPE } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { useOrderTableDoubleClick } from '../../../hooks/useOrderTableDoubleClick';
import { RightClickMenu } from '../RightClickMenu/OrderRightClickMenu';

import { OrderNumberOfConsumables } from './OrderNumberOfConsumables';
import { OrderTableActionButtons } from './OrderTableActionButtons';

// import { TestCreateOrderList } from './TestCreateOrders';
// import { TestCreatePatients } from './TestCreatePatients';
/**
 * Test data
 */
// const data = getListMockResources(orderGenerator, 100);

const { StyledOrderTableRow } = OrderTableStyles;

/**
 * Don't fetch orders when there are no ModalityIDs
 */
const checkQuery = (query?: IGetManyResourcesQuery<ISearchOrderFilter>) => {
  if (!query) return false;
  const { filter } = query;
  const { modalityIDs } = filter;
  if (!modalityIDs || !modalityIDs.length) return false;
  return query;
};

/**
 * After 60s -> auto refetch data order table
 */
const ORDER_POLLING_INTERVAL = 30 * 1000;

type OrderTableProps = {
  FilterComponent: ReactNode;
};
export const OrderTable: FC<OrderTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(TABLE_ORDER));
  const parsedQuery = checkQuery(query);
  const { data, isFetching, refetch } = useGetListOrdersQuery(
    parsedQuery ? parsedQuery : skipToken,
    { pollingInterval: ORDER_POLLING_INTERVAL },
  );
  const { open } = useContextMenu(TABLE_ORDER);
  const handleDoubleClick = useOrderTableDoubleClick();

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
            maxSize: 50,
          }),
      },
      {
        type: 'record',
        name: 'reportStatus',
        headerLabel: translate.resources.order.status(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>
            <OrderTableInfoColumn order={context.row.original} />
          </CellWrapper>
        ),
        enableSort: true,
        columnDefOptions: {
          maxSize: 70,
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
                <div title={props.row.original.patient?.pid ?? ''}>
                  {props.row.original.patient?.pid}
                </div>
              </CellWrapper>
            ),
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'patientAge',
            header: translate.resources.patient.age(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                <div title={props.row.original.patient?.birthDate ?? ''}>
                  {/* {props.row.original.patient?.birthDate} */}
                  {/* {itechDateToDayjs(props.row.original.patient?.birthDate ?? '')?.format(
                    DISPLAY_FORMAT.year,
                  )} */}
                  {getPatientAge(props.row.original.patient?.birthDate ?? '').toString()}
                </div>
              </CellWrapper>
            ),
            maxSize: 70,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'inpatient',
            header: translate.resources.order.inpatient(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original?.inpatient && props.row.original?.inpatient ? 1 : 0}
              </CellWrapper>
            ),
            maxSize: 50,
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
          }),
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.order.modalityType.short(),
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
            id: 'numOfConsumables',
            header: translate.resources.order.numOfConsumables.short(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                <OrderNumberOfConsumables order={props.row.original} />
              </CellWrapper>
            ),
            maxSize: 50,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'studyTime',
            header: translate.resources.study.studyDatetime(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.study?.studyTime &&
                  itechDateTimeToDayjs(props.row.original.study.studyTime)?.format(
                    DISPLAY_FORMAT.dateTime,
                  )}
              </CellWrapper>
            ),
          }),
      },

      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'bodyPart',
            header: translate.resources.study.bodyPartExamined.title(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.study?.bodyPartExamined}
              </CellWrapper>
            ),
            maxSize: 100,
          }),
      },
      {
        type: 'record',
        name: 'requestedTime',
        headerLabel: translate.resources.order.requestedDate.long(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>
            {itechDateTimeToDayjs(context.getValue())?.format(DISPLAY_FORMAT.dateTime)}
          </CellWrapper>
        ),
        enableSort: true,
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'operationTime',
            header: translate.resources.order.request.operationTime(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.requests &&
                props.row.original.requests[0].operationTime
                  ? itechDateTimeToDayjs(
                      props.row.original.requests[0].operationTime,
                    )?.format(DISPLAY_FORMAT.dateTime)
                  : ''}
              </CellWrapper>
            ),
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'approvedTime',
            header: translate.resources.order.approvedTime(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.requests &&
                props.row.original.requests[0].finalApprovedTime
                  ? itechDateTimeToDayjs(
                      props.row.original.requests[0].finalApprovedTime,
                    )?.format(DISPLAY_FORMAT.dateTime)
                  : ''}
              </CellWrapper>
            ),
          }),
      },
      {
        type: 'record',
        name: 'accessionNumber',
        headerLabel: translate.resources.order.accessionNumber.long(),
        renderCell: (context) => (
          <CellWrapper order={context.row.original}>
            <div title={context.getValue() ?? ''}>{context.getValue()}</div>
          </CellWrapper>
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
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'approver',
            header: translate.resources.order.approver.short(),
            cell: (props) => {
              const value = props.row.original.requests
                ? props.row.original.requests[0].finalApprover?.fullname
                : '';
              return (
                <CellWrapper order={props.row.original}>
                  <div title={value ?? ''}>{value}</div>
                </CellWrapper>
              );
            },
            maxSize: 120,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'expectedReporter',
            header: translate.resources.order.expectedReporter.short(),
            cell: (props) => {
              const value = props.row.original.requests
                ? props.row.original.requests[0].expectedReporter?.fullname
                : '';
              return (
                <CellWrapper order={props.row.original}>
                  <div title={value ?? ''}>{value}</div>
                </CellWrapper>
              );
            },
            maxSize: 120,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'operators',
            header: translate.resources.user.type({ type: USER_TYPE.TECHNICIAN }),
            cell: (props) => {
              const value =
                props.row.original.requests && props.row.original.requests[0]?.operators
                  ? props.row.original.requests[0]?.operators
                      ?.map((item) => {
                        return item.fullname;
                      })
                      .join(',')
                  : '';
              return (
                <CellWrapper order={props.row.original}>
                  <div title={value}>{value}</div>
                </CellWrapper>
              );
            },
            maxSize: 150,
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
          }),
      },
    ];
  }, [
    translate.messages,
    translate.resources.order,
    translate.resources.patient,
    translate.resources.study,
    translate.resources.user,
  ]);

  return (
    <>
      <MyTable
        tableId={TABLE_ORDER}
        tableContainerRef={tableContainerRef}
        data={data?.list}
        tableColumnsDescription={tableColumns}
        FilterComponent={FilterComponent}
        MyDataGridProps={{
          isLoading: isFetching,
          selectRowOnRightClick: false,
          hasRowClick: true,
          onRowClick: (e, row, table) => {
            dispatch(setPanelOrderID(row.original.id));
          },
          onRowRightClick: (e, row) => {
            open(e, row.original);
          },
          onRowDoubleClick: (e, row) => {
            handleDoubleClick(row.original);
          },
        }}
        paginationControls={{
          totalRecords: data?.meta.totalRecords,
          pageSize: data?.list.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: false,
        }}
        renderActionButtons={() => <OrderTableActionButtons refetch={refetch} />}
      />
      <RightClickMenu menuID={TABLE_ORDER} />
    </>
  );
};
