import React, { ReactNode, createContext, useContext, useMemo } from 'react';

import { useGetListConfigQuery } from '@/api/config';
import { useAppSelector } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth';

export enum HOSPITAL_CONFIG_NAME {
  /**
   * Cấu hình bv có chữ ký số
   */
  CONNECT_HSM = 'CONNECT_HSM',
  /**
   * Cấu hình bv có ca làm việc
   */
  ENABLE_TIMETABLE = 'ENABLE_TIMETABLE',
  /**
   * Cấu hình bv có Vật tư tiêu hao
   */
  REQUIRE_CONSUMABLE = 'REQUIRE_CONSUMABLE',
  /**
   * Cấu hình mở viewer ở nhiều tab
   */
  MULTIPLE_VIEWER_TAB = 'MULTIPLE_VIEWER_TAB',
  /**
   * Sử dụng tính năng hội chẩn
   */
  ENABLE_CONFERENCE = 'ENABLE_CONFERENCE',
}

const HospitalConfigContext = createContext<HospitalConfigProviderValues>({
  isConnectHsm: false,
  isEnabledTimetable: false,
  isRequireConsumable: false,
  isMultiTabViewer: false,
  isEnabledConference: false,
});

export type HospitalConfigProviderValues = {
  isConnectHsm: boolean;
  isEnabledTimetable: boolean;
  isRequireConsumable: boolean;
  isMultiTabViewer: boolean;
  isEnabledConference: boolean;
};

/**
 * Provide configuration of the hospital
 */
function HospitalConfigProvider(props: { children: ReactNode }) {
  const user = useAppSelector(selectCurrentUser);

  const { data } = useGetListConfigQuery({ filter: {} }, { skip: !user });

  const listConfig = data?.list ?? [];
  const configConnectHSM = listConfig.find((config) => {
    return config.attribute?.id === HOSPITAL_CONFIG_NAME.CONNECT_HSM;
  });

  const configEnabledTimeTable = listConfig.find((config) => {
    return config.attribute?.id === HOSPITAL_CONFIG_NAME.ENABLE_TIMETABLE;
  });

  const configRequireConsumable = listConfig.find((config) => {
    return config.attribute?.id === HOSPITAL_CONFIG_NAME.REQUIRE_CONSUMABLE;
  });

  const configMultiTabViewer = listConfig.find((config) => {
    return config.attribute?.id === HOSPITAL_CONFIG_NAME.MULTIPLE_VIEWER_TAB;
  });

  const configEnabledConference = listConfig.find((config) => {
    return config.attribute?.id === HOSPITAL_CONFIG_NAME.ENABLE_CONFERENCE;
  });

  const providerValue = useMemo(
    () => ({
      isConnectHsm: configConnectHSM?.attributeValue === 'True',
      isEnabledTimetable: configEnabledTimeTable?.attributeValue === 'True',
      isRequireConsumable: configRequireConsumable?.attributeValue === 'True',
      isMultiTabViewer: configMultiTabViewer?.attributeValue === 'True',
      isEnabledConference: configEnabledConference?.attributeValue === 'True',
    }),
    [
      configConnectHSM?.attributeValue,
      configEnabledConference?.attributeValue,
      configEnabledTimeTable?.attributeValue,
      configMultiTabViewer?.attributeValue,
      configRequireConsumable?.attributeValue,
    ],
  );
  return <HospitalConfigContext.Provider value={providerValue} {...props} />;
}

const useHospitalProvider = () => useContext(HospitalConfigContext);

export { HospitalConfigProvider, useHospitalProvider };
