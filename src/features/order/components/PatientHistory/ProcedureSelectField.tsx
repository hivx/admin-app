import { MenuItem } from '@mui/material';
import React from 'react';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MySelect } from '@/components';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { TABLE_PATIENT_HISTORY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { BaseEntity } from '@/types';
import { PatientRequestFilter } from '@/types/dto';

import { useGetListPatientRequestsQuery } from '../../api/patientRequestHistory';

/**
 * Trường chọn dịch vụ chụp ở màn Bệnh sử
 */
export const ProcedureSelectField = ({ patientId }: { patientId?: BaseEntity['id'] }) => {
  const query = useAppSelector(
    getCurrentTableQuery<PatientRequestFilter>(TABLE_PATIENT_HISTORY),
  );

  const { data, isFetching } = useGetListPatientRequestsQuery(
    {
      patientID: patientId,
      fromDate: query?.filter.requestedDateFrom,
      toDate: query?.filter.requestedDateTo,
    },
    { skip: !patientId },
  );

  // const { data } = useGetListProcedureQuery({ filter: {} });
  const requests = data?.list ?? [];

  const dispatch = useAppDispatch();
  const handleProcedureChange = (procedureID?: BaseEntity['id']) => {
    dispatch(
      setTableFilter({
        tableId: TABLE_PATIENT_HISTORY,
        filter: { ...query?.filter, procedureID },
      }),
    );
  };
  return isFetching ? (
    <FullPageSpinner />
  ) : (
    <MySelect
      value={query?.filter.procedureID ? query?.filter.procedureID.toString() : ''}
      fullWidth
      size="small"
    >
      <MenuItem key="null" value="" onClick={() => handleProcedureChange(undefined)}>
        &nbsp;
      </MenuItem>
      {requests.map((request) => (
        <MenuItem
          key={request.procedureID?.toString()}
          value={request.procedureID ?? ''}
          title={request.procedure?.name ?? ''}
          onClick={() => handleProcedureChange(request.procedureID ?? undefined)}
        >
          <OrderInfoTypography title={request.procedure?.name ?? ''}>
            {request.procedure?.name}
          </OrderInfoTypography>
        </MenuItem>
      ))}
    </MySelect>
  );
};
