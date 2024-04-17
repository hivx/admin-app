import { Box, Stack, Tab, Tabs } from '@mui/material';
import React from 'react';

import { UserConfigTab } from './temp';
import { useUserConfigContext } from './UserConfigProvider';
import { UserGeneralSetting } from './UserGeneralSetting/UserGeneralSetting';
import { UserConfigShortcut } from './UserShortcutKey/UserConfigShortcut';

interface TabPanelProps {
  children?: React.ReactNode;
  panelKey: UserConfigTab;
  value: UserConfigTab;
}

/**
 * Content của Popup cấu hình cá nhân
 */
export const UserConfigContent = () => {
  const { currentTab, setCurrentTab } = useUserConfigContext();

  const handleChange = (event: React.SyntheticEvent, newValue: UserConfigTab) => {
    setCurrentTab(newValue);
  };

  return (
    <Stack width="100%">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Cấu hình chung" value={UserConfigTab.CommonConfig} />
          <Tab label="Phím tắt" value={UserConfigTab.ShortcutConfig} />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} panelKey={UserConfigTab.CommonConfig}>
        <UserGeneralSetting />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} panelKey={UserConfigTab.ShortcutConfig}>
        <UserConfigShortcut />
      </CustomTabPanel>
    </Stack>
  );
};

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, panelKey, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== panelKey}
      id={panelKey}
      aria-labelledby={panelKey}
      {...other}
    >
      {value === panelKey && <Box sx={{ p: 1, pl: 2 }}>{children}</Box>}
    </div>
  );
};
