import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { itechDateToDayjs } from '@/utils/dateUtils';

import { ITicketDTO } from '../../types/ticket';

type CurrentPatientProps = {
  ticket?: ITicketDTO;
};
export const CurrentPatient: FC<CurrentPatientProps> = (props) => {
  const { ticket } = props;
  const translate = useTranslate();
  return (
    <Stack justifyContent="center" height="100%" spacing={1}>
      <Typography
        variant="h3"
        fontWeight={500}
        textTransform="uppercase"
        textAlign="center"
      >
        Bệnh nhân đang khám
      </Typography>
      <Typography
        fontSize={200}
        fontWeight={500}
        textTransform="uppercase"
        textAlign="center"
      >
        {ticket?.ticketNumber}
      </Typography>
      <Typography
        variant="h3"
        fontWeight={700}
        textTransform="uppercase"
        textAlign="center"
        letterSpacing={2}
      >
        {ticket?.patientName}
      </Typography>
      <Typography
        variant="h4"
        fontWeight={400}
        textTransform="uppercase"
        textAlign="center"
      >
        {translate.resources.ticket.pid()}: {ticket?.pid}
      </Typography>
      {ticket?.birthDate && (
        <Typography
          variant="h4"
          fontWeight={400}
          textTransform="uppercase"
          textAlign="center"
        >
          {translate.resources.ticket.birthYear()}:{' '}
          {itechDateToDayjs(ticket.birthDate)?.format('YYYY')}
        </Typography>
      )}
    </Stack>
  );
};
