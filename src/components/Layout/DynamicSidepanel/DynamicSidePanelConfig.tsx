import { ItechDicomInfoIcon, ItechFolderIcon, ItechTakePictureIcon } from '@/assets/icon';
import ItechAttachmentIcon from '@/assets/icon/AttachmentIcon';
import ItechInforIcon from '@/assets/icon/InforIcon';
// import ItechMedicalServicesIcon from '@/assets/icon/MedicalServicesIcon';
import ItechOrderHistory from '@/assets/icon/OrderHistory';
import ItechResultDiagnosis from '@/assets/icon/ResultDiagnosis';
import ItechSplitScreenIcon from '@/assets/icon/SplitScreenIcon';
import OrderAttachmentDynamicPanel from '@/components/Order/DynamicPanel/Attachment/OrderAttachmentDynamicPanel';
import { OrderAttachmentDynamicPanelActionButtons } from '@/components/Order/DynamicPanel/Attachment/OrderAttachmentDynamicPanelActionButtons';
import OrderBookmarkDynamicPanel from '@/components/Order/DynamicPanel/Bookmark/OrderBookmarkDynamicPanel';
import { OrderBookmarkDynamicPanelActionButtons } from '@/components/Order/DynamicPanel/Bookmark/OrderBookmarkDynamicPanelActionButtons';
// import { ConsumableDynamicPanel } from '@/components/Order/DynamicPanel/Consumable/ConsumableDynamicPanel';
// import { ConsumableDynamicPanelActionButtons } from '@/components/Order/DynamicPanel/Consumable/ConsumableDynamicPanelActionButtons';
import { OrderDetailedInfoDynamicPanel } from '@/components/Order/DynamicPanel/DetailedInfo/OrderDetailedInfoDynamicPanel';
import { OrderDetailedInfoDynamicPanelActionButtons } from '@/components/Order/DynamicPanel/DetailedInfo/OrderDetailedInfoDynamicPanelActionButtons';
import { DicomInfoActionButton } from '@/components/Order/DynamicPanel/DicomInfo/DicomInfoActionButton';
import { DicomInfoDynamicPanel } from '@/components/Order/DynamicPanel/DicomInfo/DicomInfoDynamicPanel';
import { NondicomActionButtons } from '@/components/Order/DynamicPanel/Nondicom/NondicomActionButtons';
import { NondicomDynamicPanel } from '@/components/Order/DynamicPanel/Nondicom/NondicomDynamicPanel';
import OrderPanelResultDiagnosis from '@/components/Order/DynamicPanel/OrderReport/OrderPanelResultDiagnosis';
import { OrderReportDynamicPanelActionButtons } from '@/components/Order/DynamicPanel/OrderReport/OrderReportDynamicPanelActionButtons';
import { StudyHistory } from '@/components/Order/DynamicPanel/StudyHistory/StudyHistory';
import { ViewerDynamicPanel } from '@/components/Order/DynamicPanel/ViewerDynamicPanel';
import { useTranslate } from '@/hooks';
import { useOrderDynamicSidepanelData } from '@/hooks/dynamicSidepanelDataController/useOrderDynamicSidepanelData';
import { useRadiologyReportDynamicSidepanelData } from '@/hooks/dynamicSidepanelDataController/useRadiologyReportDynamicSidepanelData';
import { IExtensionDTO } from '@/types/dto';
import { ISidepanel, PanelComponent } from '@/types/dynamicSidepanel';
import { SIDEPANEL_IDS } from '@/types/dynamicSidepanel/sidebarPanels';

import { DynamicPanelShell } from './DynamicPanelShell';

// define all sidepanels
const getSidepanelConfig = (
  sidePanelData: GetDynamicSidePanelsOptions['sidePanelData'],
  translate: ReturnType<typeof useTranslate>,
): Record<SIDEPANEL_IDS, PanelComponent> => ({
  [SIDEPANEL_IDS.ORDER_INFO]: {
    MainComponent: (
      <DynamicPanelShell
        Title={translate.studyInfo.title()}
        ActionButtons={<OrderDetailedInfoDynamicPanelActionButtons {...sidePanelData} />}
      >
        <OrderDetailedInfoDynamicPanel readonly {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechInforIcon />,
    title: translate.studyInfo.title(),
  },
  [SIDEPANEL_IDS.REPORT_INFO]: {
    MainComponent: (
      <DynamicPanelShell
        Title={translate.messages.titles.resultDiagnosisInfo()}
        ActionButtons={<OrderReportDynamicPanelActionButtons {...sidePanelData} />}
      >
        <OrderPanelResultDiagnosis {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechResultDiagnosis />,
    title: translate.messages.titles.resultDiagnosisInfo(),
  },
  [SIDEPANEL_IDS.ORDER_HISTORY]: {
    MainComponent: (
      <DynamicPanelShell Title={translate.studyInfo.studyHistory()}>
        <StudyHistory {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechOrderHistory />,
    title: translate.studyInfo.studyHistory(),
  },
  [SIDEPANEL_IDS.ORDER_ATTACHMENT]: {
    MainComponent: (
      <DynamicPanelShell
        Title={translate.buttons.attachment()}
        ActionButtons={<OrderAttachmentDynamicPanelActionButtons {...sidePanelData} />}
      >
        <OrderAttachmentDynamicPanel {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechAttachmentIcon />,
    title: translate.buttons.attachment(),
  },
  [SIDEPANEL_IDS.VIEWER]: {
    MainComponent: (
      <DynamicPanelShell noHeader>
        <ViewerDynamicPanel {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechSplitScreenIcon />,
    title: translate.buttons.splitScreen(),
  },
  [SIDEPANEL_IDS.BOOKMARK]: {
    MainComponent: (
      <DynamicPanelShell
        Title={translate.bookmark.bookmarkFolder()}
        ActionButtons={<OrderBookmarkDynamicPanelActionButtons {...sidePanelData} />}
      >
        <OrderBookmarkDynamicPanel {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechFolderIcon />,
    title: translate.bookmark.bookmarkFolder(),
  },
  [SIDEPANEL_IDS.DICOM_INFO]: {
    MainComponent: (
      <DynamicPanelShell
        Title={translate.studyInfo.dicomInfo()}
        ActionButtons={<DicomInfoActionButton {...sidePanelData} />}
      >
        <DicomInfoDynamicPanel {...sidePanelData} />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechDicomInfoIcon />,
    title: translate.studyInfo.dicomInfo(),
  },
  // [SIDEPANEL_IDS.CONSUMABLE]: {
  //   MainComponent: (
  //     <DynamicPanelShell
  //       Title={translate.resources.consumable.title()}
  //       ActionButtons={<ConsumableDynamicPanelActionButtons {...sidePanelData} />}
  //     >
  //       <ConsumableDynamicPanel {...sidePanelData} />
  //     </DynamicPanelShell>
  //   ),
  //   IconComponent: <ItechMedicalServicesIcon />,
  //   title: translate.resources.consumable.title(),
  // },
  [SIDEPANEL_IDS.NONDICOM_CAPTURE]: {
    MainComponent: (
      <DynamicPanelShell
        Title={translate.pages.orderReport.media.takePicture()}
        ActionButtons={<NondicomActionButtons />}
      >
        <NondicomDynamicPanel />
      </DynamicPanelShell>
    ),
    IconComponent: <ItechTakePictureIcon />,
    title: translate.pages.orderReport.media.takePicture(),
  },
});

type GetDynamicSidePanelsOptions = {
  extensions: IExtensionDTO[];
  sidePanelData: ReturnType<
    typeof useOrderDynamicSidepanelData | typeof useRadiologyReportDynamicSidepanelData
  >;
  translate: ReturnType<typeof useTranslate>;
};

// given a list of sidepanel ids, return the sidepanel modules
export const getDynamicSidePanels = (
  options: GetDynamicSidePanelsOptions,
): Record<string, ISidepanel> => {
  const { extensions, sidePanelData, translate } = options;
  const allPanels = getSidepanelConfig(sidePanelData, translate);

  const res: Record<string, ISidepanel> = {};

  extensions.forEach((extension) => {
    if (extension.extensionType) {
      res[extension.extensionType] = {
        ...allPanels[extension.extensionType],
        config: extension,
      };
    }
  });
  return res;
};
