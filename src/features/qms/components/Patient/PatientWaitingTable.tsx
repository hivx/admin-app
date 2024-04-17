import { Typography } from '@mui/material';
import { FC, forwardRef, PropsWithChildren, useMemo } from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { QMS_RESOURCES } from '@/types/resources';
import { itechDateToDayjs } from '@/utils/dateUtils';

import { ITicketDTO } from '../../types/ticket';

type PatientWaitingTableProps = {
  data: ITicketDTO[];
  isFetching: boolean;
};

export const PatientWaitingTable = forwardRef<HTMLDivElement, PatientWaitingTableProps>(
  (props, ref) => {
    const { data, isFetching } = props;
    const translate = useTranslate();

    const tableColumns = useMemo<ITableField<ITicketDTO>[]>(() => {
      const Header: FC<PropsWithChildren> = (props) => (
        <Typography variant="h5" textTransform="uppercase" fontWeight={500}>
          {props.children}
        </Typography>
      );
      return [
        // {
        //   type: 'custom',
        //   getColumnDef: (columnHelper) =>
        //     columnHelper.display({
        //       id: 'stt',
        //       header: () => <Header>{translate.messages.stt()}</Header>,
        //       cell: (props) => (
        //         <StyledDivCenterChildren>
        //           <Typography variant="h5" textTransform="uppercase">
        //             {props.row.index + 1}
        //           </Typography>
        //         </StyledDivCenterChildren>
        //       ),
        //       maxSize: 50,
        //     }),
        // },
        {
          type: 'record',
          name: 'ticketNumber',
          headerLabel: translate.resources.ticket.ticketNumber().toUpperCase(),
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
          name: 'patientName',
          headerLabel: translate.resources.ticket.patientName().toUpperCase(),
          renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
          renderCell: (cell) => (
            <StyledDivCenterChildren sx={{ p: 0.5 }}>
              <Typography variant="h5" textTransform="uppercase">
                {cell.getValue()}
              </Typography>
            </StyledDivCenterChildren>
          ),
          columnDefOptions: {
            minSize: 250,
          },
        },
        {
          type: 'record',
          name: 'birthDate',
          headerLabel: translate.resources.ticket.birthYear().toUpperCase(),
          renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
          renderCell: (cell) => (
            <StyledDivCenterChildren>
              {itechDateToDayjs(cell.getValue())?.format('YYYY')}
            </StyledDivCenterChildren>
          ),
          columnDefOptions: {
            maxSize: 50,
          },
        },
      ];
    }, [translate.resources]);

    return (
      <MyTable
        tableContainerRef={ref}
        tableId={QMS_RESOURCES.QMS_TICKET}
        data={data}
        tableColumnsDescription={tableColumns}
        showPagination={false}
        showPaginationInfo={false}
        MyDataGridProps={{
          isLoading: isFetching,
        }}
        paginationControls={{
          totalRecords: 0,
          pageSize: data.length,
        }}
        TanstackTableOptions={{
          enableRowSelection: false,
          enableMultiRowSelection: false,
        }}
        sx={{ height: '100%' }}
      />
    );
  },
);

PatientWaitingTable.displayName = 'PatientWaitingTable';
