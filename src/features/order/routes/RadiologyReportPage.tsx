import { useParams } from 'react-router-dom';

import { RadiologyReportDynamicSidepanel } from '@/components/Order/DynamicPanel/RadiologyReportDynamicSidepanel';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useTab } from '@/hooks/useTab';
import { setCurrentActiveReportID } from '@/stores/OrderRadiology';
import { selectTabItem } from '@/stores/tabs/tabSlice';
import { BaseEntity } from '@/types';

import { RadiologyReportActionButtons } from '../components/RadiologyReport/Buttons/RadiologyReportActionButtons';
import { RadiologyReportPanelContent } from '../components/RadiologyReport/Panel/RadiologyReportPanelContent';
import { RadiologyReportPanelHeader } from '../components/RadiologyReport/Panel/RadiologyReportPanelHeader';
import { RadiologyReportPanelShell } from '../components/RadiologyReport/Panel/RadiologyReportPanelShell';
import { RadiologyReportMain } from '../components/RadiologyReport/RadiologyReportMain';
import { RadiologyReportShell } from '../components/RadiologyReport/RadiologyReportShell';

/**
 * Màn đọc ca chậm
 */
export const RadiologyReportPage = () => {
  const { orderID = 'NaN' } = useParams();
  const dispatch = useAppDispatch();

  const id: BaseEntity['id'] = parseInt(orderID);

  const tabItem = useAppSelector(selectTabItem(id));
  const { handleDeleteTab } = useTab(tabItem);

  return !isNaN(id) ? (
    <RadiologyReportMain
      orderID={id}
      key={id}
      callbacks={{
        onClose: handleDeleteTab,
        onReportApproved(newReportID, newOrder) {
          dispatch(
            setCurrentActiveReportID({
              orderID: newOrder.id,
              activeReportID: newReportID,
            }),
          );
        },
      }}
      ReportComponent={
        <RadiologyReportShell
          ReportPanelComponent={
            <RadiologyReportPanelShell
              ReportHeader={
                <RadiologyReportPanelHeader
                  ActionButtons={<RadiologyReportActionButtons />}
                />
              }
              ReportContent={<RadiologyReportPanelContent isQuickReportTab={false} />}
              // BottomField={<BottomFieldsPanel />}
            />
          }
          DynamicSidePanel={<RadiologyReportDynamicSidepanel key={id} />}
        />
      }
    />
  ) : (
    <></>
  );
};
