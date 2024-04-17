import { Stack, Switch, Typography, styled } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { GeneralSettingKey } from '@/types/dto/setting';

type UserConfigItemProps = {
  generalItemKey: `${GeneralSettingKey}`;
  value: boolean;
  onChangeOneGeneralSetting: ({
    generalSettingKey,
  }: {
    generalSettingKey: `${GeneralSettingKey}`;
  }) => void;
};
export const UserConfigItem: FC<UserConfigItemProps> = (props) => {
  const translate = useTranslate();
  const { generalItemKey, value, onChangeOneGeneralSetting } = props;

  return (
    <StyledItemWrapper>
      <Stack>
        <Typography variant="subtitle1" fontWeight="500">
          {translate.resources.setting.generalItemTitle({ key: generalItemKey })}
        </Typography>
        <Typography variant="body1">
          {translate.resources.setting.generalItemDescription({ key: generalItemKey })}
        </Typography>
      </Stack>
      <Switch
        checked={value}
        onChange={(e) => onChangeOneGeneralSetting({ generalSettingKey: generalItemKey })}
      />
    </StyledItemWrapper>
  );
};

const StyledItemWrapper = styled('div')`
  display: grid;
  grid-template-columns: 3fr minmax(75px, 0.5fr);
`;
