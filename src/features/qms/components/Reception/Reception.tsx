import { Box, Grid, styled, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

import QmsHead from '@/components/Head/QmsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

import { useGetListQmsModalityTypeQuery } from '../../api/qmsModalityType';
import { ReceptionProvider } from '../../providers/ReceptionProvider';

import { ConnectedAutoSelectModalityModal } from './AutoSelectModalityModal';
import { ModalityItemListWrapper } from './ModalityItemListWrapper';
import { NavBarFilter } from './NavBarFilterForm';
import { ConnectedTicketInfomationForm } from './TicketInfomationForm';

export type ReceptionParamTypes = {
  site: string;
};

export const Reception = () => {
  const { site } = useParams() as ReceptionParamTypes;
  const { data: modalityType } = useGetListQmsModalityTypeQuery({
    filter: { siteID: site as unknown as number },
  });
  const theme = useTheme();
  return (
    <ReceptionProvider>
      <ContentLayout Head={<QmsHead customTitle="Tiếp đón" />}>
        <StyledReceptionWrapper>
          <StyledFilterWrapper>
            <NavBarFilter modalityTypeList={modalityType?.list} siteID={parseInt(site)} />
          </StyledFilterWrapper>
          <StyledMainWrapper container>
            <StyledInfomationWrapper item xs={theme.qms?.layout.qmsSidebarXS}>
              <ConnectedTicketInfomationForm siteID={parseInt(site)} />
            </StyledInfomationWrapper>
            <StyledModalityWrapper item xs={12 - (theme.qms?.layout.qmsSidebarXS || 0)}>
              <ModalityItemListWrapper />
            </StyledModalityWrapper>
          </StyledMainWrapper>
        </StyledReceptionWrapper>
        <ConnectedAutoSelectModalityModal />
      </ContentLayout>
    </ReceptionProvider>
  );
};

/**
 * Styles
 */
const StyledReceptionWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.background.default};
`;

const StyledFilterWrapper = styled(Box)`
  width: 100vw;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px #808080;
  height: ${(props) => props.theme.qms?.layout.navBarHeight};
`;

const StyledInfomationWrapper = styled(Grid)`
  height: 100%;
  border-right: solid 1px #808080;
`;
const StyledModalityWrapper = styled(Grid)`
  overflow: auto;
  height: 100%;
`;

const StyledMainWrapper = styled(Grid)`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: calc(100% - ${(props) => props.theme.qms?.layout.navBarHeight});
`;
