import { Stack } from '@mui/material';
import { FC, ReactNode } from 'react';

type RadiologyPageLeftSideHeaderProps = {
  PatientInfo: ReactNode;
  CofigButton: ReactNode;
  SignIcon: ReactNode;
  HisStatusIcon: ReactNode;
  infoToggleButton: ReactNode;
};
export const RadiologyPageLeftSideHeader: FC<RadiologyPageLeftSideHeaderProps> = (
  props,
) => {
  const { CofigButton, PatientInfo, SignIcon, HisStatusIcon, infoToggleButton } = props;
  return (
    <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
      <div>{PatientInfo}</div>
      <Stack direction="row" gap={1} alignItems="center">
        {HisStatusIcon}
        {SignIcon}
        {CofigButton}
        {infoToggleButton}
      </Stack>
    </Stack>
  );
};
