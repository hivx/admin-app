import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { useGetListTimetablePeriodQuery } from '@/api/timetablePeriod';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_SHIFT_WORK } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { ITimeTablePeriodDTO } from '@/types/dto/timeTablePeriod';
import { changeTimeFormat } from '@/utils/dateUtils';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

export const ShiftWorkTable = () => {
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const query = useAppSelector(getCurrentTableQuery(TABLE_SHIFT_WORK));
  const { data, isFetching, refetch } = useGetListTimetablePeriodQuery(
    query || skipToken,
  );
  const { open } = useContextMenu();
  const tableColumns = useMemo<ITableField<ITimeTablePeriodDTO>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'stt',
            header: translate.messages.stt(),
            cell: (props) => (
              <StyledDivCenterChildren>{props.row.index + 1}</StyledDivCenterChildren>
            ),
            minSize: FIXED_WIDTH_COLUMN_STT,
            maxSize: FIXED_WIDTH_COLUMN_STT,
          }),
      },
      {
        type: 'record',
        name: 'id',
        headerLabel: 'ID',
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 50,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.shiftWork.title(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'fromTime',
        headerLabel: translate.resources.shiftWork.startTime(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue ? changeTimeFormat(cell.getValue()) : ''}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'toTime',
        headerLabel: translate.resources.shiftWork.endTime(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue ? changeTimeFormat(cell.getValue()) : ''}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'consecutive',
        headerLabel: translate.resources.shiftWork.consecutive(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue() ? 'true' : 'false'}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 100,
        },
      },
      {
        type: 'record',
        name: 'index',
        headerLabel: translate.resources.shiftWork.index(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 80,
        },
      },
      {
        type: 'record',
        name: 'enabled',
        headerLabel: translate.resources.shiftWork.status(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue() ? 'true' : 'false'}
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 100,
        },
      },
    ],
    [translate.messages, translate.resources.shiftWork],
  );
  return (
    <MyTable
      tableId={TABLE_SHIFT_WORK}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
        onRowRightClick: (e) => {
          open(e);
        },
        onRowDoubleClick() {
          adminFunctions.openEditModal();
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
      renderActionButtons={() => (
        <AdminTableActionButtons
          tableId={TABLE_SHIFT_WORK}
          hideButtonAdd
          hideButtonDelete
          refetch={refetch}
        />
      )}
    />
  );
};
