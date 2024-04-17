import { SvgIconProps, SxProps } from '@mui/material';
import { FC } from 'react';

type TableSVGIconProps = {
  /**
   * Icon Component
   */
  IconComponent: FC<SvgIconProps>;
  IconComponentProps?: SvgIconProps;
  sx?: SxProps;
};

const FONT_SIZE = 20;

export const TableSVGIcon: FC<TableSVGIconProps> = (props) => {
  const { IconComponent, IconComponentProps, sx } = props;
  return (
    <IconComponent
      sx={{ fontSize: FONT_SIZE, ...sx }}
      {...IconComponentProps}
    ></IconComponent>
  );
};
