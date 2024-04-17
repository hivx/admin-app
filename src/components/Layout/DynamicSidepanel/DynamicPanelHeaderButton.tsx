import React, { ComponentProps, FC } from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';

import { DynamicPanelHeaderSVGIcon } from './DynamicPanelHeaderSVGIcon';

type DynamicPanelHeaderButtonProps = {
  IconComponent: ComponentProps<typeof DynamicPanelHeaderSVGIcon>['IconComponent'];
} & ComponentProps<typeof IconButtonWithToolTip>;
/**
 * UI for button inside a dynamic panel header
 */
export const DynamicPanelHeaderButton: FC<DynamicPanelHeaderButtonProps> = (props) => {
  const { IconComponent, ...IconButtonProps } = props;
  return (
    <IconButtonWithToolTip size="extrasmall" {...IconButtonProps}>
      <DynamicPanelHeaderSVGIcon
        IconComponent={IconComponent}
        disabled={props.disabled}
      />
    </IconButtonWithToolTip>
  );
};
