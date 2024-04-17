import { Typography, styled } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useTranslate } from '@/hooks';

import { useGetListKioskModalityTypeQuery } from '../../api/kioskModalityType';
import logo from '../../assets/images/logo-hih.png';
import { KioskProvider } from '../../providers/KioskProvider';

import { KioskFilterForm } from './KioskFilterForm';
export type KioskParamTypes = {
  site: string;
};
export const KioskMain = () => {
  const { site } = useParams() as KioskParamTypes;
  const { data: modalityType } = useGetListKioskModalityTypeQuery({
    filter: { siteID: site as unknown as number },
  });
  const translate = useTranslate();
  return (
    <KioskProvider>
      <StyledKiosMainContainer>
        <StyledHeaderMain>
          <StyledLogo src={logo} />
          <StyledTitle>{translate.kiosk.hospitalName()}</StyledTitle>
        </StyledHeaderMain>
        <StyledContentWrapper>
          <StyledContentMain>
            <StyledContentTitle>{translate.kiosk.kioskTitle()}</StyledContentTitle>
            <StyledKioskFilterFormWrapper>
              <KioskFilterForm
                modalityTypeList={modalityType?.list}
                siteID={parseInt(site)}
              />
            </StyledKioskFilterFormWrapper>
          </StyledContentMain>
        </StyledContentWrapper>
      </StyledKiosMainContainer>
    </KioskProvider>
  );
};

const StyledKiosMainContainer = styled('div')`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

/**
 * HEADER
 */
const StyledHeaderMain = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.paper};
  padding: ${(props) => props.theme.spacing(1)} 0;
`;

const StyledLogo = styled('img')`
  height: 100%;
  max-height: 100%;
  padding: ${(props) => props.theme.spacing('5px', 1)};
  object-fit: contain;
`;

const StyledTitle = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 3vw;
  letter-spacing: 1px;
  margin-left: ${(props) => props.theme.spacing(1)};
  text-transform: uppercase;
  font-weight: 600;
`;

/**
 * Content
 */
const StyledContentWrapper = styled('div')`
  background-color: ${(props) => props.theme.palette.primary.main};
`;

const StyledContentMain = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: ${(props) => props.theme.spacing(10)} 0;
`;

const StyledContentTitle = styled(Typography)`
  color: ${(props) => props.theme.palette.background.paper};
  font-size: 7vw;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
`;

const StyledKioskFilterFormWrapper = styled('div')`
  max-width: 60vw;
  width: 100%;
`;
