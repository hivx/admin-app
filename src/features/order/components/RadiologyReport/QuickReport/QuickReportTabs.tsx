import { ComponentProps } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { Tab, TabsBuilder } from '@/components/Elements/Navigation/TabsBuilder';
import { filterModalCreateNonDicom } from '@/dataHelper/filterModalCreateNonDicom';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectRadiologyReportTabKey,
  setCurrentRequestID,
  setRadiologyTabKey,
} from '@/stores/OrderRadiology';
import { IOrderRequestDTO } from '@/types/dto';
import { TAB_PAGES } from '@/types/radiology/reportContext';

import UploadNonDicom from '../../../../../components/Order/UploadNonDicom/UploadNonDicom';
import { useCurrentOrderID } from '../../../providers';
import { QuickRadiologyReportActionButtons } from '../Buttons/QuickRadiologyReportActionButtons';
import { RadiologyReportPanelContent } from '../Panel/RadiologyReportPanelContent';
import { RadiologyReportPanelHeader } from '../Panel/RadiologyReportPanelHeader';
import { RadiologyReportPanelShell } from '../Panel/RadiologyReportPanelShell';

export const QuickReportTabs = () => {
  const orderID = useCurrentOrderID();
  const translate = useTranslate();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const dispatch = useAppDispatch();
  const currentTabkey = useAppSelector(selectRadiologyReportTabKey(orderID));
  const handleChange: ComponentProps<typeof TabsBuilder>['handleChange'] = (
    _,
    newValue: TAB_PAGES,
  ) => {
    dispatch(setRadiologyTabKey({ orderID, tabKey: newValue }));
  };

  const handleRequestChange = (newRequest: IOrderRequestDTO) => {
    if (orderID) {
      dispatch(setCurrentRequestID({ orderID, requestID: newRequest.id }));
    }
  };

  /**
   * Check modalitype can use create nondicom
   * @returns boolean
   */
  const isImageUploadTabVisible = filterModalCreateNonDicom(order?.modalityType ?? '');

  const tablist: (Tab | false)[] = [
    {
      tabKey: TAB_PAGES.REPORT,
      Label: translate.tab.quickRadiologyReport.quickReport().toUpperCase(),
      TabPanel: (
        <RadiologyReportPanelShell
          ReportHeader={
            <RadiologyReportPanelHeader
              ActionButtons={<QuickRadiologyReportActionButtons />}
            />
          }
          ReportContent={
            <RadiologyReportPanelContent
              isQuickReportTab={true}
              onRequestChange={handleRequestChange}
            />
          }
          // BottomField={<BottomFieldsPanel />}
        />
      ),
    },
    isImageUploadTabVisible && {
      tabKey: TAB_PAGES.IMAGE_UPLOAD,
      Label: translate.buttons.takePicture().toUpperCase(),
      TabPanel: <UploadNonDicom />,
    },
  ];
  const filteredTablist = tablist.filter((tab): tab is Tab => !!tab);

  return (
    <TabsBuilder
      currentTabkey={currentTabkey}
      handleChange={handleChange}
      tabsList={filteredTablist}
    />
  );
};
