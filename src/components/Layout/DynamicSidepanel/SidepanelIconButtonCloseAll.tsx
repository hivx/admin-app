import { KeyboardDoubleArrowDown, KeyboardDoubleArrowRight } from '@mui/icons-material';

import { useAppDispatch, useTranslate } from '@/hooks';
import { closeAllPanel } from '@/stores/dynamicSidepanel/dynamicSidepanelSlice';
import { USER_MODULE } from '@/types/dto';
import { ISidepanelLayout } from '@/types/dynamicSidepanel';

import { StyledIconButton } from './DynamicSidepanelController';

/**
 * Nút đóng tất cả panel
 */
export const SidepanelIconButtonCloseAll = ({
  page,
  sidepanelsWithLayoutInfo,
}: {
  page: USER_MODULE;
  sidepanelsWithLayoutInfo: ISidepanelLayout[];
}) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const allPanelNotActive = sidepanelsWithLayoutInfo.every((item) => !item.isActive);

  return (
    <StyledIconButton
      key={page}
      title={translate.buttons.close()}
      placement="left"
      $isActive={false}
      onClick={() => dispatch(closeAllPanel({ page }))}
      disabled={allPanelNotActive}
    >
      {allPanelNotActive ? (
        <KeyboardDoubleArrowDown color="disabled" />
      ) : (
        <KeyboardDoubleArrowRight color="primary" />
      )}
    </StyledIconButton>
  );
};
