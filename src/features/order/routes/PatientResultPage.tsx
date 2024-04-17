import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_PATIENT_HISTORY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { BaseEntity } from '@/types';
import { PatientRequestFilter } from '@/types/dto';

import { useGetOnePatientQuery } from '../api';
import { useGetListPatientRequestsQuery } from '../api/patientRequestHistory';
import { OrderListLayout } from '../components';
import PatientHistoryContent from '../components/PatientHistory/PatientHistoryContent';
import { SidebarPatientHistory } from '../components/PatientHistory/SidebarPatientHistory';
import TestResultContent from '../components/PatientHistory/TestResultContent';
import { PATIENT_HISTORY_NODE, selectSidebarKey } from '../stores';

export const PatientResultPage = () => {
  const { pid = 'NaN' } = useParams();
  const translate = useTranslate();
  const sidebarKey = useAppSelector(selectSidebarKey);

  const id: BaseEntity['id'] = parseInt(pid);
  const { data: patient } = useGetOnePatientQuery({ id });

  const query = useAppSelector(
    getCurrentTableQuery<PatientRequestFilter>(TABLE_PATIENT_HISTORY),
  );
  const { data, isFetching } = useGetListPatientRequestsQuery(
    {
      patientID: patient?.id,
      fromDate: query?.filter.requestedDateFrom,
      toDate: query?.filter.requestedDateTo,
      procedureID: query?.filter.procedureID,
    },
    { skip: !patient?.id },
  );

  const requests = useMemo(() => data?.list ?? [], [data?.list]);

  return isFetching ? (
    <FullPageSpinner />
  ) : (
    <OrderListLayout title={translate.resources.order.patientHistory.title()}>
      <SidebarPatientHistory patient={patient} requests={requests} />
      {sidebarKey === PATIENT_HISTORY_NODE.DIAGNOSIS && (
        <PatientHistoryContent requests={requests} />
      )}
      {sidebarKey === PATIENT_HISTORY_NODE.TEST_RESULT && patient?.pid && (
        <TestResultContent pid={patient.pid} />
      )}
    </OrderListLayout>
  );
};
