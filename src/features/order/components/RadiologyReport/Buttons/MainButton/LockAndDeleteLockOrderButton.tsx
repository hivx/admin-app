import { lighten, Typography, useTheme } from '@mui/material';
import { ComponentProps, FC } from 'react';

import { IMyButtonProps } from '@/components';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { BUTTON_STATE } from '@/types';

import {
  useCheckDeletableLockOrder,
  useDeleteLockOrderButton,
} from '../../../../../../hooks/lockOrder/useDeleteLockOrderButton';
import { useLockOrderButton } from '../../../../../../hooks/lockOrder/useLockOrderButton';

import { MainButton } from './MainButton';

/**
 * Handles UI of Lock Order and Delete Lock Order
 */

export const LockAndDeleteLockOrderButton: FC<Partial<IMyButtonProps>> = (props) => {
  /**
   * Check lockorder can delete or not
   * if can delete show DeleteLockOrder button, otherwise show LockOrderButton
   */
  const { deletable } = useCheckDeletableLockOrder();
  // show delete lock order button if this order can delete lock order
  return deletable ? (
    <DeleteLockOrderButton {...props} />
  ) : (
    <LockOrderButton {...props} />
  );
};

const LockOrderButton: FC<ComponentProps<typeof MainButton>> = (props) => {
  const translate = useTranslate();
  const theme = useTheme();

  const { buttonState, onClick, requestID } = useLockOrderButton(); // logic

  useKeybinds(HOTKEYS.LOCK_ORDER.key, () => {
    onClick();
  });

  return buttonState !== BUTTON_STATE.HIDDEN ? (
    <MainButton
      key={requestID}
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.pages.orderReport.actions.lock(),
        key: HOTKEYS.DELETE_LOCK_ORDER.title,
      })}
      disabled={buttonState === BUTTON_STATE.DISABLED}
      onClick={onClick}
      sx={{
        backgroundColor: lighten(theme.pacs?.customColors.text.blue ?? 'blue', 0.2),
        '&:hover': {
          backgroundColor: theme.pacs?.customColors.text.blue,
        },
        width: '100%',
      }}
      {...props}
    >
      <Typography textTransform="uppercase">
        {translate.pages.orderReport.actions.lock()}
      </Typography>
    </MainButton>
  ) : (
    <></>
  );
};

const DeleteLockOrderButton: FC<IMyButtonProps> = (props) => {
  const translate = useTranslate();
  const theme = useTheme();
  const { buttonState, onClick, requestID } = useDeleteLockOrderButton();

  useKeybinds(HOTKEYS.DELETE_LOCK_ORDER.key, () => {
    onClick();
  });

  return buttonState !== BUTTON_STATE.HIDDEN ? (
    <MainButton
      key={requestID}
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.pages.orderReport.actions.deleteLock(),
        key: HOTKEYS.DELETE_LOCK_ORDER.title,
      })}
      disabled={buttonState === BUTTON_STATE.DISABLED}
      onClick={onClick}
      sx={{
        backgroundColor: lighten(theme.palette.text.primary, 0.2),
        '&:hover': {
          backgroundColor: theme.palette.text.primary,
        },
        width: '100%',
      }}
      {...props}
    >
      <Typography textTransform="uppercase">
        {translate.pages.orderReport.actions.deleteLock()}
      </Typography>
    </MainButton>
  ) : (
    <></>
  );
};
