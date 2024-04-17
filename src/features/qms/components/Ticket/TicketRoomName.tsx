import { Box, Typography } from '@mui/material';
import React from 'react';

import { useAppSelector } from '@/hooks';
import { selectCurrentTableFilter } from '@/stores/table/tableSelectors';
import { QMS_RESOURCES } from '@/types/resources';

import { useGetListQmsModalityQuery } from '../../api/qmsModality';
import { ISearchTicketFilter } from '../../types/ticket';

type TicketRoomNameProps = {
  roomName: string;
};

export const TicketRoomNameConnected = () => {
  const currentTicketFilter = useAppSelector(
    selectCurrentTableFilter<ISearchTicketFilter>(QMS_RESOURCES.QMS_TICKET),
  );
  const modalityID = currentTicketFilter?.modalityID || 0;
  const { data } = useGetListQmsModalityQuery({ filter: {} });
  const roomName = data?.list.find((modality) => modality.id === modalityID)?.roomName;

  return <TicketRoomName key={modalityID} roomName={roomName || ''} />;
};

const TicketRoomName = (props: TicketRoomNameProps) => {
  const { roomName } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h3" fontWeight={600} color="primary">
        {roomName}
      </Typography>
    </Box>
  );
};
