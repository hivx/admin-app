import { Typography } from '@mui/material';
import React, { FC, PropsWithChildren, useMemo } from 'react';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { QMS_RESOURCES } from '@/types/resources';

import { useGetListTicketSummaryQuery } from '../../api/ticketSummary';
import { ITicketSummaryDTO } from '../../types/qmsTicketSummary';
import { QMSDisplayTable } from '../QMSDisplayTable';

type SummaryListProps = {
  siteID: number;
};

const sortModalityRoom = (summaryList?: ITicketSummaryDTO[]) => {
  if (summaryList) {
    const modalityTypeSet = new Set<string>();

    const sortSummaryList: ITicketSummaryDTO[] = [];

    summaryList.map((item) => {
      if (item.modalityType) {
        modalityTypeSet.add(item.modalityType);
      }
    });

    modalityTypeSet.forEach((value) => {
      summaryList.forEach((item) => {
        if (item.modalityType === value) {
          sortSummaryList.push(item);
        }
      });
    });

    return sortSummaryList;
  }
  return [];
};

/**
 * 30s -- time to auto refetch
 */
const POLLING_INTERVAL = 30 * 1000;

export const SummaryList = (props: SummaryListProps) => {
  const { siteID } = props;
  const { data, isFetching } = useGetListTicketSummaryQuery(
    { filter: { siteID } },
    {
      pollingInterval: POLLING_INTERVAL,
    },
  );

  const sortData = sortModalityRoom(data?.list);

  const tableColumns = useMemo<ITableField<ITicketSummaryDTO>[]>(() => {
    const Header: FC<PropsWithChildren> = (props) => (
      <Typography variant="h5" textTransform="uppercase" fontWeight={500}>
        {props.children}
      </Typography>
    );
    return [
      {
        type: 'record',
        name: 'roomName',
        headerLabel: 'Tên phòng',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren sx={{ p: 0.5 }}>
            <Typography variant="h5" textTransform="uppercase">
              {cell.getValue()}
            </Typography>
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          size: 300,
        },
      },
      {
        type: 'record',
        name: 'firstNumber',
        headerLabel: 'Đang thực hiện',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren sx={{ p: 0.5 }}>
            <Typography variant="h5" textTransform="uppercase">
              {cell.getValue()}
            </Typography>
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 50,
        },
      },
      {
        type: 'record',
        name: 'secondNumber',
        headerLabel: 'Chờ thực hiện',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren sx={{ p: 0.5 }}>
            <Typography variant="h5" textTransform="uppercase">
              {cell.getValue()}
            </Typography>
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 50,
        },
      },
    ];
  }, []);

  return data ? (
    <QMSDisplayTable
      TableComponent={
        <MyTable
          tableId={QMS_RESOURCES.QMS_TICKET_SUMMARY}
          data={sortData}
          tableColumnsDescription={tableColumns}
          showPagination={false}
          showPaginationInfo={false}
          MyDataGridProps={{
            isLoading: isFetching,
          }}
          paginationControls={{
            totalRecords: data?.meta.totalRecords,
            pageSize: data?.list.length,
          }}
          TanstackTableOptions={{
            enableRowSelection: false,
            enableMultiRowSelection: false,
          }}
          sx={{ height: '100%' }}
        />
      }
    />
  ) : (
    <FullPageSpinner />
  );
};
