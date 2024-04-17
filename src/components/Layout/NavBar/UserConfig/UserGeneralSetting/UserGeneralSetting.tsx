import React from 'react';

import { MyDivider } from '@/components/Elements';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useUserGeneralSettingData } from '@/hooks/UserConfig/useUserGeneralSettingData';
import { GeneralSettingKey } from '@/types/dto/setting';

import { UserConfigItem } from './UserConfigItem';

/**
 * Tab cấu hình chung
 */
export const UserGeneralSetting = () => {
  const { genaralSettingState, onChangeOneGeneralSetting } = useUserGeneralSettingData();

  return (
    <>
      {genaralSettingState ? (
        Object.entries(genaralSettingState).map(([key, value], index) => (
          <>
            <UserConfigItem
              generalItemKey={key as GeneralSettingKey}
              value={value as boolean}
              onChangeOneGeneralSetting={onChangeOneGeneralSetting}
            />
            <MyDivider />
          </>
        ))
      ) : (
        <FullPageSpinner />
      )}
    </>
  );
};
