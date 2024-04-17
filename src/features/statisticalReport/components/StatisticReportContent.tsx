/* eslint-disable import/namespace */
import { colors, styled } from '@mui/material';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// eslint-disable-next-line import/no-unresolved
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import React, { useEffect, useState } from 'react';

pdfMake.vfs =
  pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

import {
  useLazyGetSummaryApproverDataQuery,
  useLazyGetSummaryModalityDataQuery,
  useLazyGetSummaryModalityGroupDataQuery,
  useLazyGetSummaryProcedureDataQuery,
} from '@/api/analytics';
import { useAppSelector } from '@/hooks';
import { selectTypePdf } from '@/stores/statisticalReport/statisticalReportSlice';
import { TABLE_STATISTICAL } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { ANALYTIC_ID, IAnalyticsFilter } from '@/types/dto/analytics';
import { formatDate, getCurrentDate } from '@/utils/dateUtils';

import {
  getSummaryApproverDoc,
  getSummaryProcedureDoc,
  getSummaryModalityDoc,
} from '../utils';
import { getModalityGroupPdfData } from '../utils/getModalityGroupPdfData';

import StatisticReportContentActionButtons from './StatisticReportContentActionButtons';

const StatisticReportContent = () => {
  const [url, setUrl] = useState<string>('');
  const query = useAppSelector(getCurrentTableQuery<IAnalyticsFilter>(TABLE_STATISTICAL));
  const typePdf = useAppSelector(selectTypePdf);
  const [triggerGetModalitySummary] = useLazyGetSummaryModalityDataQuery();
  const [triggerGetApproverSummary] = useLazyGetSummaryApproverDataQuery();
  const [triggerGetProcedureSummary] = useLazyGetSummaryProcedureDataQuery();
  const [triggerGetModalityGroupSummary] = useLazyGetSummaryModalityGroupDataQuery();

  useEffect(() => {
    let doc: TDocumentDefinitions | undefined = undefined;

    const getDoc = async (typePdf: ANALYTIC_ID) => {
      switch (typePdf) {
        case ANALYTIC_ID.APPROVER_COUNT:
          try {
            const data = await triggerGetApproverSummary({
              fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
              toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              id: ANALYTIC_ID.APPROVER_COUNT,
            }).unwrap();

            doc = getSummaryApproverDoc({
              data,
              date: {
                fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
                toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              },
            });
            const pdfDocGenerator = pdfMake.createPdf(doc);
            getUrlFromDoc(pdfDocGenerator);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('rejected', error);
          }
          break;
        case ANALYTIC_ID.MODALITY_COUNT:
          try {
            const data = await triggerGetModalitySummary({
              fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
              toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              id: ANALYTIC_ID.MODALITY_COUNT,
            }).unwrap();

            doc = getSummaryModalityDoc({
              data,
              date: {
                fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
                toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              },
            });
            const pdfDocGenerator = pdfMake.createPdf(doc);
            getUrlFromDoc(pdfDocGenerator);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('rejected', error);
          }
          break;
        case ANALYTIC_ID.PROCEDURE_COUNT:
          try {
            const data = await triggerGetProcedureSummary({
              fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
              toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              id: ANALYTIC_ID.PROCEDURE_COUNT,
            }).unwrap();

            doc = getSummaryProcedureDoc({
              data,
              date: {
                fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
                toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              },
            });
            const pdfDocGenerator = pdfMake.createPdf(doc);
            getUrlFromDoc(pdfDocGenerator);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('rejected', error);
          }
          break;
        case ANALYTIC_ID.MODALITY_GROUP_COUNT:
          try {
            const data = await triggerGetModalityGroupSummary({
              fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
              toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              id: ANALYTIC_ID.MODALITY_GROUP_COUNT,
            }).unwrap();

            doc = getModalityGroupPdfData({
              data,
              date: {
                fromDate: query?.filter.requestedDateFrom ?? formatDate(getCurrentDate()),
                toDate: query?.filter.requestedDateTo ?? formatDate(getCurrentDate()),
              },
            });
            const pdfDocGenerator = pdfMake.createPdf(doc);
            getUrlFromDoc(pdfDocGenerator);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('rejected', error);
          }
          break;
        default:
          break;
      }
    };
    getDoc(typePdf);

    return () => {
      if (url !== null) {
        URL.revokeObjectURL(url);
      }
    };
  }, [typePdf, query]);

  const getUrlFromDoc = (pdfDocGenerator: pdfMake.TCreatedPdf) => {
    pdfDocGenerator.getBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  };
  /**
   * Hard code UI -> Will change
   */
  return (
    <StyledStatisticReportContentContainer>
      <StyledHeader>
        <StyledHeaderLeftContainer>
          {/* <StatisticReportContentActionButtons /> */}
        </StyledHeaderLeftContainer>
        <StyledHeaderRightContainer></StyledHeaderRightContainer>
      </StyledHeader>
      <StyledIframe
        width={'100%'}
        height={'100%'}
        src={url}
        title="report-preview"
        allowFullScreen
        frameBorder="0"
      />
    </StyledStatisticReportContentContainer>
  );
};

export default StatisticReportContent;

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
