import { Box, Stack } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { FolderIcon, ItechCalendarIcon, ItechIconModality } from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { SidebarRequestedDateWrapper } from '@/components/Order/Sidebar/OrderRequestedDate/SidebarRequestedDateWrapper';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { TABLE_PATIENT_HISTORY } from '@/stores/table/tableInitialState';
import { IOrderRequestDTO, IPatientDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import {
  PATIENT_HISTORY_NODE,
  selectPatientHistoryKey,
  selectSidebarKey,
  setPatientHistoryKey,
  setSidebarKey,
} from '../../stores';

import { ProcedureSelectField } from './ProcedureSelectField';

const REQUEST_KEY = 'REQUEST_';

export const SidebarPatientHistory = ({
  patient,
  requests,
}: {
  patient?: IPatientDTO;
  requests: IOrderRequestDTO[];
}) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const sidebarKey = useAppSelector(selectSidebarKey);

  const { orderID, requestID } = useAppSelector(selectPatientHistoryKey);
  const defaultSelected = useMemo(() => {
    if (sidebarKey === PATIENT_HISTORY_NODE.TEST_RESULT) {
      return PATIENT_HISTORY_NODE.TEST_RESULT;
    }
    if (orderID && requestID) {
      return makeDiagnosisKey(requestID.toString(), orderID.toString());
    } else if (requests && requests.length !== 0) {
      return makeDiagnosisKey(
        requests[0].id.toString(),
        requests[0].orderID ? requests[0].orderID.toString() : '',
      );
    } else {
      return '';
    }
  }, [orderID, requestID, requests, sidebarKey]);

  const trees = useMemo<IRenderTree[]>(() => {
    // initialize with Select all option
    const treeData = getMedicalHistoryTreeData({ requests });

    const diagnosisChildren: IRenderTree[] = [];

    treeData?.forEach((requests, key) => {
      diagnosisChildren.push({
        MyTreeItemProps: {
          nodeId: key.toString(),
          label: (
            <OrderInfoTypography
              title={requests[0].procedure?.name ?? ' '}
              variant="body1"
            >
              {requests[0].procedure?.name ?? ' '}
            </OrderInfoTypography>
          ),
          ContentProps: {
            labelIcon: <ItechIconModality color="primary" />,
          },
        },
        children: requests.map((request) => ({
          MyTreeItemProps: {
            nodeId: makeDiagnosisKey(
              request.id.toString(),
              request.orderID ? request.orderID.toString() : '',
            ),
            label: (
              <OrderInfoTypography
                title={
                  itechDateTimeToDayjs(request.finalApprovedTime)?.format(
                    DISPLAY_FORMAT.dateTimeNoSecond,
                  ) ?? ''
                }
                variant="body1"
              >
                {itechDateTimeToDayjs(request.finalApprovedTime)?.format(
                  DISPLAY_FORMAT.dateTimeNoSecond,
                ) ?? ''}
              </OrderInfoTypography>
            ),
            ContentProps: {
              labelIcon: <ItechCalendarIcon color="primary" />,
            },
          },
        })),
      });
    });

    const res: IRenderTree[] = [
      {
        MyTreeItemProps: {
          nodeId: PATIENT_HISTORY_NODE.DIAGNOSIS,
          label: 'Chẩn đoán hình ảnh',
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
        children: diagnosisChildren,
      },
      {
        MyTreeItemProps: {
          nodeId: PATIENT_HISTORY_NODE.TEST_RESULT,
          label: 'Kết quả xét nghiệm',
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: PATIENT_HISTORY_NODE.CLINICAL,
          label: 'Thông tin lâm sàng',
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
      },
    ];
    return res;
  }, [requests]);

  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (e, nodeId) => {
      if (nodeId.includes(REQUEST_KEY)) {
        dispatch(setSidebarKey({ sidebarKey: PATIENT_HISTORY_NODE.DIAGNOSIS }));
        const newNodeID = nodeId.replace(REQUEST_KEY, '');
        const [orderID, requestID] = newNodeID.split('-');
        dispatch(
          setPatientHistoryKey({
            orderID: parseInt(orderID),
            requestID: parseInt(requestID),
          }),
        );
      }

      if (nodeId.includes(PATIENT_HISTORY_NODE.TEST_RESULT)) {
        dispatch(setSidebarKey({ sidebarKey: PATIENT_HISTORY_NODE.TEST_RESULT }));
      }
    },
    [dispatch],
  );

  return (
    <SidebarLayout title={`${patient?.fullname} - ${patient?.pid}`} collapsible>
      <Stack height={'100%'} justifyContent={'space-between'}>
        <MyTreeView
          key={defaultSelected}
          trees={trees}
          multiSelect={false}
          defaultExpanded={[
            PATIENT_HISTORY_NODE.DIAGNOSIS,
            ...requests.map((item) =>
              item.procedureID ? item.procedureID.toString() : '',
            ),
          ]}
          onNodeSelect={handleNodeSelect}
          selected={defaultSelected}
        />
        <Stack>
          <SidebarRequestedDateWrapper tableID={TABLE_PATIENT_HISTORY} />
          <Box padding={1} paddingTop={0}>
            <ProcedureSelectField patientId={patient?.id} />
          </Box>
        </Stack>
      </Stack>
    </SidebarLayout>
  );
};

export const makeDiagnosisKey = (requestID: string, orderID: string): string =>
  `${REQUEST_KEY}${orderID}-${requestID}`;

const getMedicalHistoryTreeData = ({ requests }: { requests: IOrderRequestDTO[] }) => {
  if (requests.length !== 0) {
    const medicalHistoryTreeData: Map<number, IOrderRequestDTO[]> = new Map();
    const procedureIDs = new Set(requests.map((request) => request.procedureID));
    procedureIDs.forEach((procedureID) => {
      if (procedureID) {
        const listRequestByProcedureID = requests.filter(
          (item) => item.procedureID === procedureID,
        );
        medicalHistoryTreeData.set(procedureID, listRequestByProcedureID);
      }
    });
    return medicalHistoryTreeData;
  }
};
