import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode, useMemo } from 'react';

import { AdminTableActionButtons } from '@/components/Admin/AdminTableActionButtons';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { MyTable, ITableField } from '@/components/Table/MyTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';
import { TABLE_CERTIFICATE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { ICertificateDTO } from '@/types/dto';
import { FIXED_WIDTH_COLUMN_STT } from '@/utils/tableConfig';

import { useGetListCertificateQuery } from '../../api/certificate';

import { ConnectedCertificateEditModal } from './CertificateEditModal';

type CertificateTableProps = {
  FilterComponent: ReactNode;
};
export const CertificateTable: FC<CertificateTableProps> = (props) => {
  const { FilterComponent } = props;
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery(TABLE_CERTIFICATE));
  const { data, isFetching, refetch } = useGetListCertificateQuery(query || skipToken);
  const adminFunctions = useAdminFunctions();
  const { open } = useContextMenu();

  const tableColumns = useMemo<ITableField<ICertificateDTO>[]>(
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
          maxSize: 50,
        },
        enableSort: true,
      },
      {
        type: 'record',
        name: 'account',
        headerLabel: translate.resources.certificate.account(),
        columnDefOptions: {
          size: 200,
        },
      },
      {
        type: 'record',
        name: 'name',
        headerLabel: translate.resources.certificate.name(),
        columnDefOptions: {
          size: 300,
        },
      },
      {
        type: 'record',
        name: 'provider',
        headerLabel: translate.resources.certificate.provider(),
        columnDefOptions: {
          size: 300,
        },
      },
      {
        type: 'record',
        name: 'config',
        headerLabel: translate.resources.certificate.config(),
        columnDefOptions: {
          size: 760,
        },
        renderCell: (cell) => (
          <StyledDivCenterChildren>
            {cell.row.original.config ? cell.row.original.config : '-'}
          </StyledDivCenterChildren>
        ),
      },
    ],
    [translate.messages, translate.resources.certificate],
  );

  return (
    <>
      <MyTable
        tableId={TABLE_CERTIFICATE}
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
        FilterComponent={FilterComponent}
        renderActionButtons={() => (
          <AdminTableActionButtons tableId={TABLE_CERTIFICATE} refetch={refetch} />
        )}
      />
      <ConnectedCertificateEditModal />
    </>
  );
};
