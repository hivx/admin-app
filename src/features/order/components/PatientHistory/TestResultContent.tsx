/* eslint-disable import/namespace */
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, colors, styled } from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs =
  pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

import { useAppSelector } from '@/hooks';
import { TABLE_PATIENT_HISTORY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { PatientRequestFilter } from '@/types/dto';

import { useGetTestResultDataQuery } from '../../api/testResult';

import StatisticReportContentActionButtons from './StatisticReportContentActionButtons';

const TestResultContent = ({ pid }: { pid: string }) => {
  const query = useAppSelector(
    getCurrentTableQuery<PatientRequestFilter>(TABLE_PATIENT_HISTORY),
  );
  const { data } = useGetTestResultDataQuery(
    {
      pid,
      startDate: query?.filter.requestedDateFrom ?? '',
      endDate: query?.filter.requestedDateTo ?? '',
    },
    { skip: !pid },
  );

  const pdfUrl = data ? URL.createObjectURL(data) : '';

  /**
   * Hard code UI -> Will change
   */
  return (
    <StyledStatisticReportContentContainer>
      <StyledHeader>
        <StyledHeaderLeftContainer>
          <StatisticReportContentActionButtons url={pdfUrl} />
        </StyledHeaderLeftContainer>
      </StyledHeader>
      <StyledIframe
        width={'100%'}
        height={'100%'}
        src={pdfUrl}
        title="report-preview"
        allowFullScreen
        frameBorder="0"
      />
    </StyledStatisticReportContentContainer>
  );
};

export default TestResultContent;

const StyledIframe = styled('iframe')`
  /* border-radius: ${(props) => props.theme.pacs?.layout.borderRadius}; */
  border: 1px solid ${colors.grey[400]};
  border-top: 0;
`;

const StyledStatisticReportContentContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(1)};
  height: 100%;
  width: 100%;
`;

const StyledHeader = styled('div')`
  display: flex;
  background-color: ${(props) => props.theme.palette.background.paper};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius}
    ${(props) => props.theme.pacs?.layout.borderRadius} 0 0;
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5)};
  border: 1px solid ${colors.grey[400]};
`;

const StyledHeaderLeftContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
`;
