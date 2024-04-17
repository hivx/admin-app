import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material';

import { PenIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { useAdminFunctions } from '@/providers/Admin/AdminProvider';

export const AdminRightClickMenu = (props: {
  menuID?: string;
  hideButtonDelete?: boolean;
  disabled?: boolean;
}) => {
  const { menuID, hideButtonDelete = false, disabled = false } = props;
  const adminFunctions = useAdminFunctions();
  const { close } = useContextMenu(menuID);
  const translate = useTranslate();
  return (
    <ContextPopupController menuID={menuID} type="menu">
      <StyleRightClickMenuContainer>
        <ContextMenuItemShell
          IconComponent={<PenIcon fontSize="small" color="inherit" />}
          MenuItemProps={{
            onClick: () => {
              close();
              adminFunctions.openEditModal();
            },
            disabled: disabled,
          }}
          MainComponent={translate.buttons.modify()}
        />

        {!hideButtonDelete && (
          <ContextMenuItemShell
            IconComponent={<DeleteIcon fontSize="small" color="error" />}
            MenuItemProps={{
              onClick: () => {
                close();
                adminFunctions.submitDelete();
              },
              disabled: disabled,
            }}
            MainComponent={translate.buttons.delete()}
          />
        )}
      </StyleRightClickMenuContainer>
    </ContextPopupController>
  );
};

const StyleRightClickMenuContainer = styled('div')`
  min-width: 150px;
`;
