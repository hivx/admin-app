import React from 'react';

import ItechViewImageIcon from '@/assets/icon/ViewImageIcon';
import { useTranslate } from '@/hooks';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import { BUTTON_STATE } from '@/types';

import { MobileIconButton } from '../MobileIconButton';

import { MobileRadiologyButtonProps } from './RadiologyButton.styles';

/**
 * Nút Xem ảnh
 * Màn viết KQ
 */
export const MobileViewImageButton = ({ order }: MobileRadiologyButtonProps) => {
  const { onClick: viewImage, buttonState: viewImageButtonState } = useButtonImage({
    order,
  });
  return (
    <MobileIconButton
      IconComponent={<ItechViewImageIcon />}
      onClick={viewImage}
      disabled={viewImageButtonState === BUTTON_STATE.DISABLED}
    />
  );
};
