import { SvgIconProps, SxProps } from '@mui/material';
import { FC } from 'react';

type DynamicPanelHeaderSVGIconProps = {
  /**
   * Icon Component
   */
  IconComponent: FC<SvgIconProps>;
  IconComponentProps?: SvgIconProps;
  sx?: SxProps;
  disabled?: boolean;
};

const FONT_SIZE = 20;

/**
 * A specialized icon style for dynamic panel header
 */
export const DynamicPanelHeaderSVGIcon: FC<DynamicPanelHeaderSVGIconProps> = (props) => {
  const { IconComponent, IconComponentProps, sx, disabled } = props;
  return (
    <IconComponent
      sx={{
        fontSize: FONT_SIZE,
        color: 'white',
        opacity: disabled ? 0.6 : 1,
        ...sx,
      }}
      {...IconComponentProps}
    ></IconComponent>
  );
};
