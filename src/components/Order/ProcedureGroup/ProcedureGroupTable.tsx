// import { styled } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, useMemo } from 'react';

// import { MyButton } from '@/components';
import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_PROCEDURE_GROUP } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IProcedureGroupDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListProcedureGroupQuery } from '../../../features/admin/api/procedureGroup';

export const ProcedureGroupTable: FC = () => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_PROCEDURE_GROUP));
  const { data, isFetching, refetch } = useGetListProcedureGroupQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<IProcedureGroupDTO>[]>(
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
        name: 'name',
        headerLabel: translate.resources.procedureGroup.name(),
        columnDefOptions: {
          size: 650,
        },
      },
      {
        type: 'record',
        name: 'description',
        headerLabel: translate.resources.procedureGroup.description(),
        columnDefOptions: {
          size: 850,
        },
      },
    ],
    [translate.messages, translate.resources.procedureGroup],
  );
  return (
    <StyledTableContainerWithCollapsiblePanel>
      <MyTable
        tableId={TABLE_PROCEDURE_GROUP}
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
          <AdminTableActionButtons tableId={TABLE_PROCEDURE_GROUP} refetch={refetch} />
        )}
      />
    </StyledTableContainerWithCollapsiblePanel>
  );
};

// const StyleTextButton = styled(MyButton)`
//   border: 0;
//   &:hover {
//     border: 0;
//   }
// `;
