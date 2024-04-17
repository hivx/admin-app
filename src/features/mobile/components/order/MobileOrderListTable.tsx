import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, PropsWithChildren, useMemo } from 'react';

import { useGetListOrdersQuery } from '@/api/order';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import OrderTableStyles from '@/components/Order/OrderTable.styles';
import OrderTableInfoColumn from '@/components/Order/OrderTableInfoColumn';
import OrderTablePatientNameColumn from '@/components/Order/OrderTablePatientNameColumn';
import { OrderTableRequestProcedureColumn } from '@/components/Order/OrderTableRequestProcedureColumn';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { getFinalApprovedRequest } from '@/lib/dataHelper/radiologyReport/getFinalApprovedRequest';
import { TABLE_ORDER_MOBILE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IGetManyResourcesQuery } from '@/types';
import { IOrderDTO, ISearchOrderFilter } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { OrderNumberOfConsumables } from '../../../order/components/OrderList/Table/OrderNumberOfConsumables';
import { MobileOrderActionButton } from '../buttons/MobileOrderActionButton';
import { MobileDisplayTable } from '../table/MobileDisplayTable';

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
 * After 30s -> auto refetch data order table
 */
const ORDER_POLLING_INTERVAL = 30 * 1000;

export const MobileOrderListTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(
    getCurrentTableQuery<ISearchOrderFilter>(TABLE_ORDER_MOBILE),
  );
  const parsedQuery = checkQuery(query);
  const { data, isFetching, refetch } = useGetListOrdersQuery(
    parsedQuery ? parsedQuery : skipToken,
    { pollingInterval: ORDER_POLLING_INTERVAL },
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
                {props.row.original.patient?.pid}
              </CellWrapper>
            ),
            maxSize: 50,
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
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  )}
              </CellWrapper>
            ),
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
            {itechDateTimeToDayjs(context.getValue())?.format(
              DISPLAY_FORMAT.dateTimeNoSecond,
            )}
          </CellWrapper>
        ),
        enableSort: true,
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
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'approver',
            header: translate.resources.order.lockedBy.long(),
            cell: (props) => (
              <CellWrapper order={props.row.original}>
                {props.row.original.requests
                  ? getFinalApprovedRequest(props.row.original)?.finalApprover?.fullname
                  : ''}
              </CellWrapper>
            ),
          }),
      },
    ];
  }, [translate.messages, translate.resources.order, translate.resources.study]);

  return (
    <MobileDisplayTable
      TableComponent={
        <MyTable
          tableId={TABLE_ORDER_MOBILE}
          data={data?.list}
          tableColumnsDescription={tableColumns}
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
          renderActionButtons={() => <MobileOrderActionButton refetch={refetch} />}
        />
      }
    />
  );
};
