import React, { FC, ReactNode } from 'react';

import { IMyIconButtonProps, MyIconButton } from '@/components';

type MobileIconButtonProps = {
  onClick: () => void;
  IconComponent: ReactNode;
} & IMyIconButtonProps;

/**
 * Icon Button for mobile
 */
export const MobileIconButton: FC<MobileIconButtonProps> = ({
  IconComponent,
  onClick,
  ...rest
}) => {
  return (
    <MyIconButton {...rest} onClick={onClick}>
      {IconComponent}
    </MyIconButton>
  );
};
