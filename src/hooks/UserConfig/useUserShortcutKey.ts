import { useEffect, useState } from 'react';

import {
  useLazyGetOneUserSettingByIDQuery,
  useUpdateUserSettingMutation,
} from '@/api/setting';
import { useGetListShortcutKeyQuery } from '@/api/shortcutKey';
import { UserConfigTab } from '@/components/Layout/NavBar/UserConfig/temp';
import { useRegisterUserConfigFunctions } from '@/components/Layout/NavBar/UserConfig/UserConfigProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  SettingId,
  ShortcutSettingJsonValue,
  ShortcutSettingKey,
} from '@/types/dto/setting';

import { useTranslate } from '../useTranslate';

const ShortcutSettingDefaultValue = {
  open_viewer: 'V',
  lock_order: 'L',
};

export const useUserShortcutKey = () => {
  const [trigger] = useLazyGetOneUserSettingByIDQuery();
  const translate = useTranslate();
  const [updateGeneralSetting] = useUpdateUserSettingMutation();
  const register = useRegisterUserConfigFunctions();

  const [shortcutSettingState, setShortcutSettingState] =
    useState<ShortcutSettingJsonValue>();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.setting.shortcutKey(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.setting.shortcutKey(),
    }),
  );

  useEffect(() => {
    const setSettingState = async () => {
      const data = await trigger({
        id: SettingId.ShortcutKey,
      }).unwrap();
      const shortcutSettingObj: ShortcutSettingJsonValue = data?.value
        ? JSON.parse(data.value)
        : ShortcutSettingDefaultValue;
      setShortcutSettingState(shortcutSettingObj);
    };
    setSettingState();
  }, [trigger]);

  const onUpdateShortcut = () => {
    try {
      const response = updateGeneralSetting({
        id: 'shortcutKey',
        value: JSON.stringify(shortcutSettingState),
        valueType: 'JSON',
      });
      if ('error' in response) {
        notifyError();
      } else {
        notifySuccess();
      }
    } catch {
      notifyError();
    }
  };

  register('submitUserConfigForm', onUpdateShortcut);

  const onChangeOneShortcutKeySetting = ({
    shortcutSettingKey,
    keyValue,
  }: {
    shortcutSettingKey: `${ShortcutSettingKey}`;
    keyValue: string;
  }) => {
    if (shortcutSettingState) {
      const newState = { ...shortcutSettingState, [shortcutSettingKey]: keyValue };
      setShortcutSettingState(newState);
    }
  };

  return {
    shortcutSettingState,
    onChangeOneShortcutKeySetting,
  };
};
