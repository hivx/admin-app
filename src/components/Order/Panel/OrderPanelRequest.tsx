/* eslint-disable no-console */
import { SxProps, styled } from '@mui/material';
import { useCallback, useMemo } from 'react';

import { IRenderTree, MyTreeView } from '@/components';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { getExecListReports } from '../../../features/order/components/RadiologyReport/Sidebar/RadiologyReportOrderInfoShell';

type OrderPanelRequestProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  currentActiveReportID?: IRadiologyReportDTO['id'];
  onRequestChanged?: (requestID: IOrderRequestDTO['id']) => void;
  onReportChanged?: (
    reportID: IRadiologyReportDTO['id'],
    requestID: IOrderRequestDTO['id'],
  ) => void;
};

export const styleOrderRequest: SxProps = {
  alignItems: 'unset',
  li: {
    padding: 0,
    typography: 'body2',
  },
  '.MuiCollapse-root': { color: 'gray' },
  '.MuiTreeItem-content .MuiTreeItem-label': {
    padding: 0,
    typography: 'body2',
  },
  '.MuiTreeItem-content': {
    padding: 0,
  },
  '.MuiTypography-root': {
    padding: 0,
    typography: 'body2',
  },
  '.MuiTreeView-root': {
    overflow: 'unset',
  },
};

export const OrderPanelRequest = (props: OrderPanelRequestProps) => {
  const { order, request, currentActiveReportID, onRequestChanged, onReportChanged } =
    props;

  /**
   * report được active trong tree
   * OrderPanelRequest dùng trong màn Viết Kết Quả mới có currentActiveReportID
   */
  const defaultSelectedReportNode = useMemo(
    () =>
      request?.id &&
      currentActiveReportID &&
      request.reports?.map((item) => item.id).includes(currentActiveReportID)
        ? makeReportKey(request?.id, currentActiveReportID)
        : undefined,
    [currentActiveReportID, request?.id, request?.reports],
  );

  const defaultSelectedRequestNode = request?.id ? makeRequestKey(request.id) : undefined;
  const defaultSelected =
    request?.id && request?.reports?.length
      ? makeReportKey(
          request.id,
          request?.finalReportID || request?.reports[request?.reports.length - 1].id,
        )
      : undefined;

  /**
   * request được expand
   */
  const defaultExpand = useMemo(
    () =>
      order?.requests
        ? order.requests.map((request) => makeRequestKey(request.id))
        : undefined,
    [order?.requests],
  );
  /**
   * Handle when a item in list tree selected
   */
  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (event, nodeId) => {
      const type = getNodeClickedType(nodeId);

      let res;
      switch (type) {
        case NODE_CLICK_TYPE.REQUEST:
          onRequestChanged && onRequestChanged(convertRequestKey(nodeId));
          break;
        case NODE_CLICK_TYPE.REPORT:
          res = convertReportKey(nodeId);
          onReportChanged && onReportChanged(res.reportID, res.requestID);
      }
    },
    [onReportChanged, onRequestChanged],
  );

  const trees = useMemo<IRenderTree[]>(() => {
    // initialize with Select all option
    const res: IRenderTree[] = [];
    const requests = order?.requests ?? [];
    requests.forEach((request) => {
      const finalReportID = request.finalReportID;
      const exectReportList = getExecListReports(request?.reports ?? [], finalReportID);

      const treeItem = {
        MyTreeItemProps: {
          nodeId: makeRequestKey(request.id),
          label: request.procedure?.name,
        },
        children: exectReportList.map((report, index) => ({
          MyTreeItemProps: {
            nodeId: makeReportKey(request.id, report.id),
            label:
              report.id === finalReportID ? (
                <StyledApprovedReport>
                  <StyledFirstCol>Kết quả:</StyledFirstCol>
                  <StyledSecondCol> (F) {report.approver?.fullname} </StyledSecondCol>
                  <StyledThirdCol>
                    {report.approvedTime
                      ? `(${itechDateTimeToDayjs(report.approvedTime)?.format(
                          DISPLAY_FORMAT.dateTimeNoSecond,
                        )})`
                      : ''}
                  </StyledThirdCol>
                </StyledApprovedReport>
              ) : (
                <StyledDraftReport>
                  <StyledFirstCol>Lần {exectReportList.length - index}:</StyledFirstCol>
                  <StyledSecondCol>
                    ({report.approver ? 'A' : 'S'}) {report.reporter?.fullname}{' '}
                  </StyledSecondCol>
                  <StyledThirdCol>
                    {report.reportedTime
                      ? `(${itechDateTimeToDayjs(report.reportedTime)?.format(
                          DISPLAY_FORMAT.dateTimeNoSecond,
                        )})`
                      : ''}
                  </StyledThirdCol>
                </StyledDraftReport>
              ),
          },
        })),
      };
      res.push(treeItem);
    });

    return res;
  }, [order?.requests]);
  return order?.requests?.length !== 0 ? (
    <MyTreeView
      key={defaultSelectedRequestNode}
      trees={trees}
      multiSelect={false}
      onNodeSelect={handleNodeSelect}
      defaultExpanded={defaultExpand}
      // expanded={}
      defaultSelected={defaultSelected ?? defaultSelectedRequestNode}
    />
  ) : (
    <></>
  );
};

// utilities

enum NODE_CLICK_TYPE {
  /**
   * Request node is clicked
   */
  REQUEST = 'REQUEST',
  /**
   * Report node is clicked
   */
  REPORT = 'REPORT',
}

const REQUEST_PREFIX = 'REQUEST';

const makeReportKey = (requestId: number, reportId: number): string =>
  `${requestId}-${reportId}`;

const convertReportKey = (
  nodeId: string,
): { reportID: IRadiologyReportDTO['id']; requestID: IOrderRequestDTO['id'] } => {
  const split = nodeId.split('-');
  return {
    requestID: Number(split[0]),
    reportID: Number(split[1]),
  };
};

const makeRequestKey = (requestId: number): string => `${REQUEST_PREFIX}-${requestId}`;

const convertRequestKey = (nodeId: string): IOrderRequestDTO['id'] => {
  const split = nodeId.split('-');
  return Number(split[1]);
};

/**
 * Split nodeId to array
 * @param str
 * @returns array
 */
const getNodeClickedType = (nodeId: string): NODE_CLICK_TYPE => {
  const split = nodeId.split('-');
  if (split[0] === REQUEST_PREFIX) {
    // request node clicked
    return NODE_CLICK_TYPE.REQUEST;
  } else {
    // report node clicked
    return NODE_CLICK_TYPE.REPORT;
  }
};

const StyledDraftReport = styled('div')`
  color: ${(props) => props.theme.pacs?.customColors.text.blue};
  display: grid;
  grid-template-columns: 45px auto auto;
`;

const StyledApprovedReport = styled('div')`
  color: ${(props) => props.theme.pacs?.customColors.text.black};
  display: grid;
  grid-template-columns: 45px auto auto;
`;

const StyledFirstCol = styled('div')``;

const StyledSecondCol = styled('div')``;
const StyledThirdCol = styled('div')`
  text-align: end;
`;
