import { FC, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_MODALITY_BY_GROUP } from '@/stores/table/tableInitialState';
import { BaseEntity } from '@/types';
import { IModalityDTO } from '@/types/dto';

import { useGetListModalityQuery } from '../../../../api/modality';

type ModalityTableProps = {
  modalityGroupID: BaseEntity['id'];
};

export const ModalityListTablebyGroupId: FC<ModalityTableProps> = (props) => {
  const { modalityGroupID } = props;
  const translate = useTranslate();
  const { data, isFetching, refetch } = useGetListModalityQuery({
    filter: { groupID: modalityGroupID },
  });

  const tableColumns: ITableField<IModalityDTO>[] = useMemo(
    () => [
      {
        type: 'record',
        name: 'id',
        headerLabel: 'ID',
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 50,
        },
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.modality.name.short(),
      },
      {
        type: 'record',
        name: 'modalityType',
        headerLabel: translate.resources.modality.modalityType.short(),
      },
      {
        type: 'record',
        name: 'code',
        headerLabel: translate.resources.modality.code.short(),
      },
      {
        type: 'record',
        name: 'enabled',
        headerLabel: translate.messages.status.long(),
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.getValue()
              ? translate.resources.modality.enabled()
              : translate.resources.modality.disabled()}
          </StyledDivCenterChildren>
        ),
      },
    ],
    [translate.messages, translate.resources.modality],
  );
  return (
    <MyTable
      tableId={TABLE_MODALITY_BY_GROUP}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      MyDataGridProps={{ isLoading: isFetching }}
      TanstackTableOptions={{
        enableRowSelection: false,
      }}
      renderActionButtons={() => (
        <AdminTableActionButtons
          tableId={TABLE_MODALITY_BY_GROUP}
          refetch={refetch}
          hideButtonAdd={true}
          hideButtonDelete={true}
          hideButtonEdit={true}
        />
      )}
    />
  );
};
