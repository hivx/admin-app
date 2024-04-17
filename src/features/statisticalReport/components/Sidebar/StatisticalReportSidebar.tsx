import { Stack } from '@mui/material';
import React, { useCallback, useMemo } from 'react';

import { FolderIcon } from '@/assets/icon';
import { IRenderTree, MyTreeView } from '@/components';
import { SidebarLayout } from '@/components/Elements/Navigation/SidebarLayout';
import { OrderListSidebarCollapse } from '@/components/Order/Sidebar/OrderListSidebarCollapse';
import { SidebarRequestedDateWrapper } from '@/components/Order/Sidebar/OrderRequestedDate/SidebarRequestedDateWrapper';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectTypePdf,
  setTypePdf,
} from '@/stores/statisticalReport/statisticalReportSlice';
import { TABLE_STATISTICAL } from '@/stores/table/tableInitialState';
import { ANALYTIC_ID } from '@/types/dto/analytics';

const fakeReportList = [
  {
    id: 1,
    name: 'Thống kê theo bác sĩ đọc',
    type: ANALYTIC_ID.APPROVER_COUNT,
  },
  {
    id: 2,
    name: 'Thống kê theo máy chụp',
    type: ANALYTIC_ID.MODALITY_COUNT,
  },
  {
    id: 3,
    name: 'Thống kê theo dịch vụ chụp',
    type: ANALYTIC_ID.PROCEDURE_COUNT,
  },
  {
    id: 3,
    name: 'Thống kê theo nhóm máy chụp',
    type: ANALYTIC_ID.MODALITY_GROUP_COUNT,
  },
];

export const StatisticalReportSidebar = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const typePdf = useAppSelector(selectTypePdf);

  const reportList = useMemo(() => fakeReportList ?? [], []);

  const trees = useMemo<IRenderTree[]>(() => {
    // initialize with Select all option
    const res: IRenderTree[] = [];

    reportList.forEach((report) => {
      const treeItem = {
        MyTreeItemProps: {
          nodeId: report.type,
          label: report.name,
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelIcon: <FolderIcon color="primary" />,
          },
        },
      };
      res.push(treeItem);
    });

    return res;
  }, [reportList]);

  const handleNodeSelect = useCallback<
    (event: React.SyntheticEvent, nodeId: string) => void
  >(
    (event, nodeId) => {
      dispatch(setTypePdf(nodeId as ANALYTIC_ID));
    },
    [dispatch],
  );

  return (
    <SidebarLayout
      title={translate.pages.statisticalReport.sidebarHeader()}
      collapsible
      MenuCollapse={
        <OrderListSidebarCollapse
          handleNodeSelect={handleNodeSelect}
          trees={trees}
          currentSelected={typePdf ? typePdf : ANALYTIC_ID.MODALITY_COUNT}
        />
      }
    >
      <Stack height={'100%'} justifyContent={'space-between'}>
        <MyTreeView
          trees={trees}
          multiSelect={false}
          onNodeSelect={handleNodeSelect}
          selected={typePdf ? typePdf : ANALYTIC_ID.MODALITY_COUNT}
        />
        <div>
          <SidebarRequestedDateWrapper
            tableID={TABLE_STATISTICAL}
            disabledButtonAll={true}
          />
        </div>
      </Stack>
    </SidebarLayout>
  );
};
