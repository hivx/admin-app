import { useEffect, useState } from 'react';

import {
  useLazyGetOneUserSettingByIDQuery,
  useUpdateUserSettingMutation,
} from '@/api/setting';
import { useRegisterUserConfigFunctions } from '@/components/Layout/NavBar/UserConfig/UserConfigProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { OrderTableColumnKey, SettingId } from '@/types/dto/setting';

import { useTranslate } from '../useTranslate';

export type SettingOrderTableValue = {
  width: number;
  visible: boolean;
};
export type SettingOrderTableDataType = Record<
  `${OrderTableColumnKey}`,
  SettingOrderTableValue
>;

export type SettingOrderTableType = {
  id: `${OrderTableColumnKey}`;
} & SettingOrderTableValue;

export const SettingOrderTableDefaultValue: SettingOrderTableDataType = {
  stt: { visible: true, width: 0 },
  reportStatus: { visible: true, width: 0 },
  patientName: { visible: true, width: 0 },
  patientPID: { visible: true, width: 0 },
  modalityType: { visible: true, width: 0 },
  inpatient: { visible: true, width: 0 },
  numOfConsumables: { visible: true, width: 0 },
  studyTime: { visible: true, width: 0 },
  requests: { visible: true, width: 0 },
  bodyPart: { visible: true, width: 0 },
  requestedTime: { visible: true, width: 0 },
  operationTime: { visible: true, width: 0 },
  approvedTime: { visible: true, width: 0 },
  accessionNumber: { visible: true, width: 0 },
  patientGender: { visible: true, width: 0 },
  approver: { visible: true, width: 0 },
  expectedReporter: { visible: true, width: 0 },
  requestedDepartment: { visible: true, width: 0 },
};

/**
 * Hook xử lý lấy dữ liệu cho bảng đọc ca
 */
export const useUserSettingOrderTable = () => {
  const [trigger] = useLazyGetOneUserSettingByIDQuery();
  const translate = useTranslate();
  const [updateOrderTableSetting] = useUpdateUserSettingMutation();
  const register = useRegisterUserConfigFunctions();

  const [orderTableSettingState, setOrderTableSettingState] =
    useState<SettingOrderTableDataType>();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.setting.tableSetting(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.setting.tableSetting(),
    }),
  );

  useEffect(() => {
    const setSettingState = async () => {
      const data = await trigger({
        id: SettingId.OrderTable,
      }).unwrap();
      const orderTableSettingObj: SettingOrderTableDataType = data?.value
        ? JSON.parse(data.value)
        : SettingOrderTableDefaultValue;
      setOrderTableSettingState(orderTableSettingObj);
    };
    setSettingState();
  }, [trigger]);

  const onUpdateShortcut = () => {
    try {
      const response = updateOrderTableSetting({
        id: 'orderTable',
        value: JSON.stringify(orderTableSettingState),
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

  const onChangeColumnVisible = ({
    orderTableSettingKey,
  }: {
    orderTableSettingKey: `${OrderTableColumnKey}`;
  }) => {
    if (orderTableSettingState) {
      const newValue: SettingOrderTableValue = {
        visible: !orderTableSettingState[orderTableSettingKey].visible,
        width: orderTableSettingState[orderTableSettingKey].width,
      };
      const newState = { ...orderTableSettingState, [orderTableSettingKey]: newValue };
      setOrderTableSettingState(newState);
    }
  };

  const onChangeColumnWidth = ({
    orderTableSettingKey,
    width,
  }: {
    orderTableSettingKey: `${OrderTableColumnKey}`;
    width: number;
  }) => {
    if (orderTableSettingState) {
      const newValue: SettingOrderTableValue = {
        visible: orderTableSettingState[orderTableSettingKey].visible,
        width: width,
      };
      const newState = { ...orderTableSettingState, [orderTableSettingKey]: newValue };
      setOrderTableSettingState(newState);
    }
  };
  return { onChangeColumnVisible, orderTableSettingState, onChangeColumnWidth };
};
