import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, PropsWithChildren, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_EVENT_LOG } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListEventLogQuery } from '../../api/eventLog';
import { IEventLogDTO } from '../../types';

import { ButtonResendEvent } from './ButtonResendEvent';
import { EventLogFilterForm } from './EventLogFilterForm';
import { StyledEventLogTableRow } from './EventLogTable.styles';

export const EventLogTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery<IEventLogDTO>(TABLE_EVENT_LOG));
  const { data, isFetching, refetch } = useGetListEventLogQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();

  const tableColumns = useMemo<ITableField<IEventLogDTO>[]>(() => {
    const CellWrapper: FC<PropsWithChildren<{ eventLog: IEventLogDTO }>> = ({
      eventLog,
      children,
    }) => (
      <StyledEventLogTableRow
        $succeeded={eventLog.succeeded ?? false}
        $attempts={eventLog.attempts ?? 0}
      >
        {children}
      </StyledEventLogTableRow>
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
                <CellWrapper eventLog={props.row.original}>
                  {props.row.index + 1}
                </CellWrapper>
              </StyledDivCenterChildren>
            ),
            maxSize: FIXED_WIDTH_COLUMN_STT,
            minSize: FIXED_WIDTH_COLUMN_STT,
          }),
      },
      {
        type: 'record',
        name: 'id',
        headerLabel: 'ID',
        renderCell: (context) => (
          <StyledDivCenterChildren>
            <CellWrapper eventLog={context.row.original}>
              {context.getValue()}
            </CellWrapper>
          </StyledDivCenterChildren>
        ),

        columnDefOptions: {
          maxSize: 150,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'type',
        renderCell: (context) => (
          <CellWrapper eventLog={context.row.original}>{context.getValue()}</CellWrapper>
        ),
        headerLabel: translate.resources.eventLog.type(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'source',
        renderCell: (context) => (
          <CellWrapper eventLog={context.row.original}>{context.getValue()}</CellWrapper>
        ),
        headerLabel: translate.resources.eventLog.source(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'createdTime',
        renderCell: (context) => (
          <CellWrapper eventLog={context.row.original}>
            {context.row.original.createdTime &&
              itechDateTimeToDayjs(context.row.original.createdTime)?.format(
                DISPLAY_FORMAT.dateTime,
              )}
          </CellWrapper>
        ),
        headerLabel: translate.resources.eventLog.createdTime(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'lastAttempt',
        renderCell: (context) => (
          <CellWrapper eventLog={context.row.original}>
            {context.row.original.lastAttempt &&
              itechDateTimeToDayjs(context.row.original.lastAttempt)?.format(
                DISPLAY_FORMAT.dateTime,
              )}
          </CellWrapper>
        ),
        headerLabel: translate.resources.eventLog.lastAttempt(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'attempts',
        renderCell: (context) => (
          <CellWrapper eventLog={context.row.original}>{context.getValue()}</CellWrapper>
        ),
        headerLabel: translate.resources.eventLog.attempts(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'succeeded',
        renderCell: (context) => (
          <CellWrapper eventLog={context.row.original}>
            {context.getValue()
              ? translate.messages.notification.success()
              : translate.messages.notification.failure()}
          </CellWrapper>
        ),
        headerLabel: translate.resources.eventLog.succeeded(),
        columnDefOptions: {
          size: 250,
        },
      },
    ];
  }, [translate.messages, translate.resources.eventLog]);

  return (
    <MyTable
      tableId={TABLE_EVENT_LOG}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
        onRowDoubleClick: () => adminFunctions.openEditModal(),
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
      FilterComponent={<EventLogFilterForm />}
      renderActionButtons={() => (
        <AdminTableActionButtons
          tableId={TABLE_EVENT_LOG}
          CustomButton={<ButtonResendEvent />}
          hideButtonAdd
          hideButtonDelete
          hideButtonEdit
          refetch={refetch}
        />
      )}
    />
  );
};
