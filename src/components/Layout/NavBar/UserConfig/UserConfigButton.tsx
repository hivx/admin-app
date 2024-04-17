import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';

import { useDisclosure, useTranslate } from '@/hooks';

import { StyledIconButtonWithToolTip } from '../NavBar';

import { UserConfigModal } from './UserConfigModal';

export const UserConfigButton = () => {
  const translate = useTranslate();
  const disclosure = useDisclosure();

  return (
    <>
      <StyledIconButtonWithToolTip
        title={translate.buttons.userConfig()}
        color="primary"
        onClick={disclosure.open}
      >
        <SettingsIcon />
      </StyledIconButtonWithToolTip>
      {disclosure.isOpen && <UserConfigModal disclosure={disclosure} />}
    </>
  );
};
