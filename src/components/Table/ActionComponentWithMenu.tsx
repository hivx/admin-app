import React, {
  cloneElement,
  FC,
  forwardRef,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';

import { useAnchorElement } from '@/hooks';

import { IMyMenuProps, MyMenu } from '../Menu/MyMenu';

type ActionComponentWithMenuProps = {
  ActionComponent: ReactElement;
  /**
   * Optional element for the menu to catch onto
   */
  anchorRef?: RefObject<HTMLElement>;
  /**
   * Menu props
   */
  MyMenuProps?: Partial<IMyMenuProps>;
  ListMenu?: ReactNode;
  /**
   * When mouse out my menu will close
   */
  hideMenuOnMouseLeave?: boolean;
  disabled?: boolean;
  /**
   * Show menu on mouse hover
   */
  showMenuOnHover?: boolean;
};
export const ActionComponentWithMenu: FC<ActionComponentWithMenuProps> = forwardRef<
  HTMLDivElement,
  ActionComponentWithMenuProps
>((props, ref) => {
  const {
    ActionComponent,
    ListMenu,
    MyMenuProps,
    anchorRef,
    disabled,
    showMenuOnHover,
    hideMenuOnMouseLeave,
  } = props;
  const { anchorEl, isOpen, open, close } = useAnchorElement();

  /**
   * Compose ActionComponent's mouse events with our open menu action
   */
  const handleClick: MouseEventHandler<HTMLElement> = (e) => {
    if (ActionComponent.props.onClick) ActionComponent.props.onClick(e);
    if (!disabled) open(e, anchorRef?.current);
  };
  const handleMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
    if (ActionComponent.props.onMouseEnter) ActionComponent.props.onMouseEnter(e);
    if (!disabled && showMenuOnHover) open(e, anchorRef?.current);
  };
  /**
   * We compose the ActionComponent and also allow passing ref to it
   */
  const ComposedActionComponent = cloneElement(
    ActionComponent,
    {
      ref,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
    },
    React.Children.map(ActionComponent.props.children, (children) => children),
  );
  return (
    <>
      {ComposedActionComponent}
      <MyMenu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        onClick={close}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        MenuListProps={{
          onMouseLeave: () => {
            if (!disabled && hideMenuOnMouseLeave) close();
          },
        }}
        {...MyMenuProps}
      >
        {ListMenu}
      </MyMenu>
    </>
  );
});

ActionComponentWithMenu.displayName = 'ActionComponentWithMenu';
