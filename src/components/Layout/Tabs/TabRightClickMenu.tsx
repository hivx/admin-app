import { MenuItem } from '@mui/material';

import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useTab } from '@/hooks/useTab';
import { ITabItem } from '@/types';

export const TabRightClickMenu = (props: {
  tab: ITabItem;
  closeOneTabCallback: () => void;
}) => {
  const { tab, closeOneTabCallback } = props;
  const {
    translate,
    handleDeleteTab,
    handleDeleteAllTab,
    handleDeleteOtherTab,
    tabMenuID,
  } = useTab(tab, closeOneTabCallback);
  return (
    <ContextPopupController menuID={tabMenuID} type="menu">
      <MenuItem onClick={handleDeleteTab}>{translate.tab.button.close()}</MenuItem>
      <MenuItem onClick={handleDeleteOtherTab}>
        {translate.tab.button.closeOtherTab()}
      </MenuItem>
      <MenuItem onClick={handleDeleteAllTab}>
        {translate.tab.button.closeAllTab()}
      </MenuItem>
    </ContextPopupController>
  );
};
