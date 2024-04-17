import { styled } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyButton } from '@/components';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_PROCEDURE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IProcedureDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

type ProcedureTableProps = {
  FilterComponent: ReactNode;
};
export const ProcedureTable: FC<ProcedureTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_PROCEDURE));
  const { data, isFetching, refetch } = useGetListProcedureQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IProcedureDTO>[]>(
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
          maxSize: 150,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.procedure.code(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.procedure.modalityType(),
        columnDefOptions: {
          size: 250,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'bodyParts',
            header: () => translate.resources.procedure.bodyParts(),
            cell: (c) =>
              c.row.original?.bodyParts &&
              c.row.original?.bodyParts.map((item) => item).join(','),
            size: 250,
          }),
      },

      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.procedure.name(),
        columnDefOptions: {
          size: 750,
        },
      },
    ],
    [translate.messages, translate.resources.procedure],
  );

  return (
    <MyTable
      tableId={TABLE_PROCEDURE}
      data={data?.list}
      FilterComponent={FilterComponent}
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
        <AdminTableActionButtons tableId={TABLE_PROCEDURE} refetch={refetch} />
      )}
    />
  );
};

const StyleTextButton = styled(MyButton)`
  border: 0;
  &:hover {
    border: 0;
  }
`;
