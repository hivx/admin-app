import { ComponentProps, MouseEventHandler, ReactElement, ReactNode } from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { BUTTON_STATE } from '@/types';

/**
 * Define functions and state for Radiology Report Button
 */
export type IRadiologyReportButtonHandler = {
  buttonState: BUTTON_STATE;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onListItemClick?: MouseEventHandler<HTMLLIElement>;
};

type RenderActionButtonArgs = ComponentProps<typeof IconButtonWithToolTip>;

export type IRenderActionButton = (args: RenderActionButtonArgs) => ReactElement;
