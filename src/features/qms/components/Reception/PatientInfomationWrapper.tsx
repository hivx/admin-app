import { Grid, Stack, styled, Typography } from '@mui/material';
import React from 'react';

import { MyButton } from '@/components';
import { useTranslate } from '@/hooks';

import { IMwlBase } from '../../types';

import { InfomationShell } from './InfomationShell';
import { HEIGHT_INFOMATION_CONTENT } from './TicketInfomationForm';

type PatientInfomationWrapperProps = {
  mwlData?: IMwlBase;
  printTicket?: () => void;
};

export const PatientInfomationWrapper = (props: PatientInfomationWrapperProps) => {
  const { mwlData, printTicket } = props;
  const translate = useTranslate();
  return (
    <>
      <InfomationShell
        label={translate.pages.reception.receptionInfomation()}
        key={1}
        height={HEIGHT_INFOMATION_CONTENT.RECEPTION}
        OptionLabel={
          <StyledPrintTicketButton
            variant="contained"
            onClick={() => printTicket && printTicket()}
          >
            {translate.pages.reception.printTicket()}
          </StyledPrintTicketButton>
        }
        Content={
          <Stack spacing={2}>
            <InfomationItem
              title={translate.pages.reception.PID()}
              content={mwlData?.pid}
            />
            <InfomationItem title={translate.pages.reception.ticket()} />
            <InfomationItem title={translate.pages.reception.optional()} />
          </Stack>
        }
      />
      <InfomationShell
        label={translate.pages.reception.patientInfomation()}
        key={2}
        height={HEIGHT_INFOMATION_CONTENT.PATIENT}
        Content={
          <Stack spacing={2}>
            <InfomationItem
              title={translate.pages.reception.PID()}
              content={mwlData?.pid}
            />
            <InfomationItem
              title={translate.pages.reception.fullname()}
              content={mwlData?.patientName}
            />
            <InfomationItem
              title={translate.pages.reception.optional()}
              content={mwlData?.birthDate}
            />
            <InfomationItem
              title={translate.pages.reception.gender()}
              content={mwlData && translate.messages.gender({ gender: mwlData?.gender })}
            />
            <InfomationItem
              title={translate.pages.reception.address()}
              content={mwlData?.address}
            />
          </Stack>
        }
      />
    </>
  );
};

type InfomationItemProps = {
  title: string;
  content?: string;
};

const InfomationItem = (props: InfomationItemProps) => {
  const TITLE_FONT_WEIGHT = 600;
  const { content, title } = props;

  return (
    <StyledInfomationItemWrapper container>
      <Grid item xs={3}>
        <StyledTypography fontWeight={TITLE_FONT_WEIGHT}>{title}:</StyledTypography>
      </Grid>
      <Grid item xs={9}>
        <StyledTypography>{content}</StyledTypography>
      </Grid>
    </StyledInfomationItemWrapper>
  );
};

const StyledPrintTicketButton = styled(MyButton)`
  font-size: 16px;
  font-weight: 300;
  border-radius: 0px;
  text-transform: none;
  border-radius: 2px;
`;

const StyledTypography = styled(Typography)`
  font-weight: 400px;
  font-size: 16px;
  line-height: 21px;
`;

const StyledInfomationItemWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
`;
