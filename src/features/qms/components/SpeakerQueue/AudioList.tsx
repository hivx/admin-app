import { Typography } from '@mui/material';
import { FC, PropsWithChildren, useMemo } from 'react';

import { PlayIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { QMS_RESOURCES } from '@/types/resources';

import logoPlaying from '../../assets/images/icon-playing.gif';
import { ISoundDTO } from '../../types';

type AudioListProps = {
  currentSoundID?: ISoundDTO['id'];
  listSound: ISoundDTO[];
};

export const AudioList = (props: AudioListProps) => {
  const { currentSoundID, listSound } = props;

  const tableColumns = useMemo<ITableField<ISoundDTO>[]>(() => {
    const Header: FC<PropsWithChildren> = (props) => (
      <Typography variant="h5" textTransform="uppercase" fontWeight={500}>
        {props.children}
      </Typography>
    );
    return [
      {
        type: 'record',
        name: 'id',
        headerLabel: 'ID',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren sx={{ p: 0.5 }}>
            <Typography variant="h5" textTransform="uppercase">
              {cell.row.index + 1}
            </Typography>
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 30,
        },
      },
      {
        type: 'record',
        name: 'ticketNumber',
        headerLabel: 'STT',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren sx={{ p: 0.5 }}>
            <Typography variant="h5" textTransform="uppercase">
              {cell.getValue()}
            </Typography>
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 30,
        },
      },
      {
        type: 'record',
        name: 'patientName',
        headerLabel: 'Tên bệnh nhân',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren sx={{ p: 0.5 }}>
            <Typography variant="h5" textTransform="uppercase">
              {cell.getValue()}
            </Typography>
          </StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 30,
        },
      },
      {
        type: 'record',
        name: 'modalityRoom',
        headerLabel: 'Tên phòng',
        renderHeader: (headerLabel) => <Header>{headerLabel}</Header>,
        renderCell: (cell) => (
          <StyledDivCenterChildren>{cell.getValue()}</StyledDivCenterChildren>
        ),
        columnDefOptions: {
          maxSize: 150,
        },
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            header: 'STATUS',
            cell: (c) => (
              <StyledDivCenterChildren>
                <IconButtonWithToolTip
                // onClick={() => {
                //   dispatch(
                //     setSelectedRow({
                //       tableId: RESOURCES.QMS_SOUND,
                //       selectedRow: listSound[c.row.index],
                //     }),
                //   );
                // }}
                >
                  {currentSoundID && c.row.original.id === currentSoundID ? (
                    <img
                      width={'24px'}
                      height={'24px'}
                      src={logoPlaying}
                      alt="logo-playing"
                    />
                  ) : (
                    <PlayIcon />
                  )}
                </IconButtonWithToolTip>
              </StyledDivCenterChildren>
            ),
            maxSize: 20,
          }),
      },
    ];
  }, [currentSoundID]);

  return (
    <MyTable
      tableId={QMS_RESOURCES.QMS_SOUND}
      data={listSound}
      tableColumnsDescription={tableColumns}
      showPagination={false}
      showPaginationInfo={false}
      TanstackTableOptions={{
        enableRowSelection: false,
        enableMultiRowSelection: false,
      }}
      sx={{ height: '100%' }}
    />
  );
};
