import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useMemo } from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useGetListPatientsQuery } from '@/features/order';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_PICK_PATIENT } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IPatientDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

import { PatientFormFilterType } from './PatientFormFilter';

/**
 * Danh sách bệnh nhân trong modal Chọn bệnh nhân từ HIS
 */
export const PatientTable = () => {
  const translate = useTranslate();
  const query = useAppSelector(
    getCurrentTableQuery<PatientFormFilterType>(TABLE_PICK_PATIENT),
  );
  const { data, isFetching } = useGetListPatientsQuery(query || skipToken, {
    skip: !query?.filter.pid && !query?.filter.fullname,
  });

  const tableColumns = useMemo<ITableField<IPatientDTO>[]>(
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
        enableSort: true,
      },
      {
        type: 'record',
        name: 'fullname',
        headerLabel: translate.resources.order.patient.fullname.long(),
        columnDefOptions: {
          size: 100,
        },
      },
      {
        type: 'record',
        name: 'pid',
        headerLabel: translate.resources.order.patient.pid.long(),
        columnDefOptions: {
          size: 100,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'gender',
            header: translate.resources.order.patient.gender(),
            cell: (props) =>
              props.row.original?.gender &&
              translate.messages.gender({
                gender: props.row.original.gender,
              }),
            maxSize: 100,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            id: 'birthDate',
            header: translate.resources.patient.birthDate(),
            cell: (props) =>
              props.row.original.birthDate &&
              itechDateToDayjs(props.row.original.birthDate)?.format(DISPLAY_FORMAT.date),
            maxSize: 100,
          }),
      },
      {
        type: 'record',
        name: 'address',
        headerLabel: translate.resources.patient.address(),
        columnDefOptions: {
          size: 150,
        },
      },
      {
        type: 'record',
        name: 'creationType',
        headerLabel: translate.resources.patient.createType(),
        columnDefOptions: {
          size: 50,
        },
      },
    ],
    [translate.messages, translate.resources.order.patient, translate.resources.patient],
  );

  return (
    <MyTable
      sx={{ maxHeight: '250px' }}
      tableId={TABLE_PICK_PATIENT}
      data={data?.list}
      tableColumnsDescription={tableColumns}
      MyDataGridProps={{
        isLoading: isFetching,
      }}
      paginationControls={{
        totalRecords: data?.meta.totalRecords,
        pageSize: data?.list.length,
      }}
      hiddenFooter={true}
      TanstackTableOptions={{
        enableRowSelection: true,
        enableMultiRowSelection: false,
      }}
    />
  );
};
