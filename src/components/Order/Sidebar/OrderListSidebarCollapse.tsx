import { MenuItem } from '@mui/material';
import React from 'react';

import { FolderIcon } from '@/assets/icon';
import { IRenderTree } from '@/components';
import { StyledIconButtonWithToolTip } from '@/components/Layout/NavBar/NavBar';

export const OrderListSidebarCollapse = ({
  trees,
  handleNodeSelect,
  currentSelected,
}: {
  trees: IRenderTree[];
  handleNodeSelect: (event: React.SyntheticEvent, nodeId: string) => void;
  currentSelected?: string;
}) => {
  return (
    <>
      {trees.map((menu, index) => (
        <MenuItem
          key={index}
          onClick={(event) => {
            handleNodeSelect(event, menu.MyTreeItemProps.nodeId);
          }}
          sx={{ padding: 0, justifyContent: 'center', alignItems: 'center' }}
          selected={currentSelected === menu.MyTreeItemProps.nodeId}
        >
          <StyledIconButtonWithToolTip
            size="small"
            title={`${menu.MyTreeItemProps.label}`}
            placement="right-end"
          >
            <FolderIcon color="primary" />
          </StyledIconButtonWithToolTip>
        </MenuItem>
      ))}
    </>
  );
};
