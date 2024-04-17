import { Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { ItechConfigTableIcon, ItechSearchDefaultIcon } from '@/assets/icon';
import ItechConfigIcon from '@/assets/icon/ConfigIcon';
import { MyRadio } from '@/components/Elements/Inputs/MyRadio';
import { StyledIconButtonWithToolTip } from '@/components/Layout/NavBar/NavBar';
import { MyMenu } from '@/components/Menu/MyMenu';
import { StyledMenuItem } from '@/components/Menu/StyledMenuItem';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAnchorElement, useAppDispatch, useTranslate } from '@/hooks';
import { setTableDefaultFilterField } from '@/stores/table/tableSlice';
import { RenderFormFieldDefinition } from '@/types/form';

type DefaultFieldSelectorProps = {
  fieldsDef: RenderFormFieldDefinition;
  currentFieldName: string;
  tableId: string;
};

/**
 * This is the generic selector for default filter field
 */
const DefaultFieldSelector: FC<DefaultFieldSelectorProps> = (props) => {
  const { fieldsDef, currentFieldName, tableId } = props;
  const translate = useTranslate();
  const { anchorEl, isOpen, open, close } = useAnchorElement();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const getClickHandler: (name: string) => React.MouseEventHandler = (name) => (e) => {
    e.stopPropagation();
    dispatch(setTableDefaultFilterField({ fieldName: name, tableId }));
    close();
  };

  return (
    <>
      <StyledIconButtonWithToolTip
        title={translate.buttons.displayConfig()}
        onClick={(e) => {
          e.stopPropagation();
          open(e);
        }}
      >
        <TableSVGIcon
          IconComponent={ItechSearchDefaultIcon}
          IconComponentProps={{ color: 'inherit' }}
        />
      </StyledIconButtonWithToolTip>
      <MyMenu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        onClick={close}
        transitionDuration={theme.transitions.duration.shortest}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {Object.entries(fieldsDef).map(([name, renderFormField]) => (
          <StyledMenuItem
            key={name}
            onClick={getClickHandler(name)}
            sx={{ gap: theme.spacing(1), justifyContent: 'normal' }}
          >
            <MyRadio checked={name === currentFieldName} compact />
            <Typography>{renderFormField?.label}</Typography>
          </StyledMenuItem>
        ))}
      </MyMenu>
    </>
  );
};

export default DefaultFieldSelector;
