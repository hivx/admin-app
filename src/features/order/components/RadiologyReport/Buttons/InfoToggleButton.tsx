import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from '@mui/icons-material';

import { StyledIconButton } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelController';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { selectInfoSidebar, setInfoSidebar } from '@/stores/sideBar/InfoSidebarSlice';

const InfoToggleButton = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const buttonStatus = useAppSelector(selectInfoSidebar);

  return (
    <StyledIconButton
      title={buttonStatus ? translate.buttons.close() : 'Mở'}
      placement="left"
      $isActive={false}
      onClick={() => dispatch(setInfoSidebar(!buttonStatus))}
    >
      {buttonStatus ? (
        <KeyboardDoubleArrowLeft color="disabled" />
      ) : (
        <KeyboardDoubleArrowRight color="disabled" />
      )}
    </StyledIconButton>
  );
};

export default InfoToggleButton;
