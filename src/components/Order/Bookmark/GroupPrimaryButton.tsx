import { Stack } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

import { StyledPrimaryButton } from './ConnectedBookmarkModal';
type GroupPrimaryButtonProps = {
  onSave?: () => void;
};
const GroupPrimaryButton: FC<GroupPrimaryButtonProps> = (props) => {
  const { onSave } = props;
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();

  return (
    <Stack direction={'row'} spacing={1}>
      <StyledPrimaryButton variant="contained" onClick={onSave}>
        {translate.buttons.save()}
      </StyledPrimaryButton>
      <StyledPrimaryButton
        variant="contained"
        onClick={() => orderListFunctions.openBookmarkFolderModal()}
      >
        {translate.buttons.createFolder()}
      </StyledPrimaryButton>
    </Stack>
  );
};

export default GroupPrimaryButton;
