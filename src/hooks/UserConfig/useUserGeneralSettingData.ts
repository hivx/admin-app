import { useEffect, useState } from 'react';

import {
  useLazyGetOneUserSettingByIDQuery,
  useUpdateUserSettingMutation,
} from '@/api/setting';
import { useRegisterUserConfigFunctions } from '@/components/Layout/NavBar/UserConfig/UserConfigProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import {
  GeneralSettingJsonValue,
  GeneralSettingKey,
  SettingId,
} from '@/types/dto/setting';

import { useTranslate } from '../useTranslate';

const GeneralSettingDefaultValue = {
  autoLockOrder: false,
  autoOpenViewer: false,
  showDiagnosisPanel: false,
  autoSelectTemplate: false,
  preferPersonalTemplate: false,
  doubleClickToOpenViewer: false,
};

export const useUserGeneralSettingData = () => {
  const [trigger] = useLazyGetOneUserSettingByIDQuery();
  const translate = useTranslate();
  const [updateGeneralSetting] = useUpdateUserSettingMutation();
  const register = useRegisterUserConfigFunctions();

  const [genaralSettingState, setGeneralSettingState] =
    useState<GeneralSettingJsonValue>();

  useEffect(() => {
    const setSettingState = async () => {
      const data = await trigger({
        id: SettingId.GeneralSetting,
      }).unwrap();
      const generalSettingObj: GeneralSettingJsonValue = data?.value
        ? JSON.parse(data.value)
        : GeneralSettingDefaultValue;
      setGeneralSettingState(generalSettingObj);
    };
    setSettingState();
  }, [trigger]);

  const onChangeOneGeneralSetting = ({
    generalSettingKey,
  }: {
    generalSettingKey: `${GeneralSettingKey}`;
  }) => {
    if (genaralSettingState) {
      const value = genaralSettingState[generalSettingKey];
      const newState = { ...genaralSettingState, [generalSettingKey]: !value };
      setGeneralSettingState(newState);
    }
  };

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.setting.generalSetting(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.setting.generalSetting(),
    }),
  );

  const onUpdateGeneralConfig = () => {
    try {
      const response = updateGeneralSetting({
        id: 'generalSetting',
        value: JSON.stringify(genaralSettingState),
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

  register('submitUserConfigForm', onUpdateGeneralConfig);

  return { genaralSettingState, onChangeOneGeneralSetting };
};
