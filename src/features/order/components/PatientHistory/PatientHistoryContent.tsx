/* eslint-disable import/namespace */
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, colors, styled } from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs =
  pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

import { useAppSelector } from '@/hooks';
import { IOrderRequestDTO } from '@/types/dto';

import { useGetFinalPdfFileDataQuery } from '../../api/radiologyReportPdf';
import { selectPatientHistoryKey } from '../../stores';

import StatisticReportContentActionButtons from './StatisticReportContentActionButtons';

const PatientHistoryContent = ({ requests }: { requests: IOrderRequestDTO[] }) => {
  const { orderID, requestID } = useAppSelector(selectPatientHistoryKey);

  const execOrderID = orderID ? orderID : requests[0] ? requests[0].orderID : undefined;
  const execRequestID = requestID ? requestID : requests[0] ? requests[0].id : undefined;

  const { data: pdfData } = useGetFinalPdfFileDataQuery(
    { orderID: execOrderID ?? 0, requestID: execRequestID ?? 0 },
    { skip: !execOrderID || !execRequestID },
  );

  const pdfUrl = pdfData ? URL.createObjectURL(pdfData) : '';

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

export default PatientHistoryContent;

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
const StyledHeaderRightContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: end;
  align-items: center;
`;
