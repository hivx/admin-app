import GroupsIcon from '@mui/icons-material/Groups';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useTranslate } from '@/hooks';
import { useConsultantMeeting } from '@/hooks/useConsultantMeeting';

import { StyledIconButtonWithToolTip } from './NavBar';

const NavBarConsultantMeetingButton = () => {
  const translate = useTranslate();
  const openMeetingPage = useConsultantMeeting();

  return (
    <StyledIconButtonWithToolTip
      title={translate.buttons.consultantMeeting()}
      onClick={openMeetingPage}
      color="primary"
    >
      <GroupsIcon />
    </StyledIconButtonWithToolTip>
  );
};

export default NavBarConsultantMeetingButton;
