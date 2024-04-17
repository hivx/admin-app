import { Divider, Link, MenuItem, MenuList, styled, Typography } from '@mui/material';
import { FC } from 'react';

import { RefreshIcon } from '@/assets/icon';
import { MyIconButton } from '@/components';
import { useAppSelector, useTranslate } from '@/hooks';
import { selectCurrentRadiologyReportID } from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';

import { useRadiologyReportFunctions } from '../../../providers/RadiologyReportProvider';

import RadiologyReportOrderInfoHeader from './RadiologyReportOrderInfoHeader';

type RadiologyReportOrderInfoProps = {
  listCurrentReport: IRadiologyReportDTO[];
  order: IOrderDTO;
  requestData?: IOrderRequestDTO;
  refetchReportList: () => void;
};

/**
 *
 * @returns list report with finalReport approve alway on top of list
 */
export const getExecListReports = (
  listCurrentReport: RadiologyReportOrderInfoProps['listCurrentReport'],
  finalReportID?: number | null,
) => {
  /**
   * In the request have many report, last item in report array is the newest report
   * we need to make the newst report show first in list
   * ---Solution----
   * Sort DESC by id list report in request
   */
  const reverseListCurrentReport = [...listCurrentReport].reverse();

  const arraywithFinalReport = reverseListCurrentReport.filter(
    (item) => item.id === finalReportID,
  );
  const arrayNotFinalReport = reverseListCurrentReport.filter(
    (item) => item.id !== finalReportID,
  );

  return [...arraywithFinalReport, ...arrayNotFinalReport];
};

export const RadiologyReportOrderInfo: FC<RadiologyReportOrderInfoProps> = (props) => {
  const { listCurrentReport, order, requestData, refetchReportList } = props;
  const translate = useTranslate();
  /**
   * Get final report ID
   */
  const finalReportID = requestData?.finalReportID;

  const exectReportList = getExecListReports(listCurrentReport, finalReportID);

  const radiologyReportFunctions = useRadiologyReportFunctions();

  const currentReportID = useAppSelector(
    selectCurrentRadiologyReportID({
      orderID: order.id,
      requestID: requestData?.id ?? 0,
    }),
  );

  return (
    <StyledContainer>
      <RadiologyReportOrderInfoHeader order={order} />
      <Divider />
      <StyledHistoryReportApproved>
        <StyledApproveHistory>
          {translate.studyInfo.studyReportHistory()}
          <StyledRefreshButton onClick={refetchReportList}>
            <RefreshIcon fontSize="small" />
          </StyledRefreshButton>
        </StyledApproveHistory>
        <StyledMenuList>
          {exectReportList.map((report, index) => (
            <MenuItem
              key={report.id}
              selected={currentReportID === report.id}
              onClick={() =>
                /**
                 * When click report id will show content itself
                 */
                requestData &&
                radiologyReportFunctions.fetchAndSetReport(requestData?.id, report.id)
              }
            >
              <Link variant="body2">
                {/**
                 * If report id = finalReportID => 'KQ: finalApproverName - finalApprovedTime'
                 * Else 'Lan *n*: report.approver?.fullname - appervedTime'
                 */}
                {report.id === finalReportID ? (
                  <div>KQ: {report.approver?.fullname}</div>
                ) : (
                  <div>
                    Lần {exectReportList.length - index}: {report.reporter?.fullname}
                  </div>
                )}
              </Link>
            </MenuItem>
          ))}
        </StyledMenuList>
      </StyledHistoryReportApproved>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  min-height: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
`;

const StyledHistoryReportApproved = styled('div')`
  overflow: hidden;
  padding: ${(props) => props.theme.spacing(2)};
  padding-right: 0;
  display: grid;
  grid-template-rows: auto minmax(100px, 1fr);
`;

const StyledMenuList = styled(MenuList)`
  overflow-y: auto;
`;

const StyledApproveHistory = styled(Typography)`
  color: ${(props) => props.theme.pacs?.customColors.text.label};
`;

const StyledRefreshButton = styled(MyIconButton)`
  &:hover {
    background-color: transparent;
  }
`;
