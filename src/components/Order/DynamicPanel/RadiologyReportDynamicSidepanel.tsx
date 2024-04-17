import { getDynamicSidePanels } from '@/components/Layout/DynamicSidepanel/DynamicSidePanelConfig';
import { DynamicSidepanelController } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelController';
import { useTranslate } from '@/hooks';
import { useRadiologyReportDynamicSidepanelData } from '@/hooks/dynamicSidepanelDataController/useRadiologyReportDynamicSidepanelData';
import { useGetListExtension } from '@/hooks/useGetListExtension';
import { USER_MODULE } from '@/types/dto';

/**
 * Prepare common data for radiology report sidepanels
 */
export const RadiologyReportDynamicSidepanel = () => {
  const sidepanels = useGetRadiologyReportDynamicSidepanels();

  return (
    <DynamicSidepanelController
      page={USER_MODULE.REPORTING_READING}
      sxIconBar={{ paddingTop: 1 }}
      sidepanels={sidepanels}
    />
  );
};

const useGetRadiologyReportDynamicSidepanels = (): React.ComponentProps<
  typeof DynamicSidepanelController
>['sidepanels'] => {
  const translate = useTranslate();
  const sidePanelData = useRadiologyReportDynamicSidepanelData();
  const extensions = useGetListExtension(USER_MODULE.REPORTING_READING);
  const sidepanels = getDynamicSidePanels({ extensions, sidePanelData, translate });
  return sidepanels;
};
