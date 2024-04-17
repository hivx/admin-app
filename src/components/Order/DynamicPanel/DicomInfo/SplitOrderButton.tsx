import ItechSplitStudyIcon from '@/assets/icon/SplitStudyIcon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import { useSplitOrder } from '@/hooks/examination/useSplitOrder';
import { IOrderDTO } from '@/types/dto';

/**
 * Action button split order in DicomInfoDynamicPanel
 */
export const SplitOrderButton = ({ order }: { order?: IOrderDTO }) => {
  const translate = useTranslate();
  const { orderCanSplit, onClick } = useSplitOrder({ order });
  return (
    <DynamicPanelHeaderButton
      disabled={!orderCanSplit}
      IconComponent={ItechSplitStudyIcon}
      title={translate.resources.study.splitStudyOrder()}
      onClick={onClick}
    />
  );
};
