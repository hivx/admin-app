import { styled, useTheme } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface AnimatedIconProps {
  /**
   * String that is set to `transform` css property when `isActive = false`
   * @default rotate(0deg) scale(1.0)
   */
  initialTransform?: string;
  /**
   * String that is set to `transform` css property when `isActive = true`
   * @default rotate(90deg) scale(0.7)
   */
  finalTransform?: string;
  /**
   * String that is set to `transition` css property.
   * Can use theme.transitions.create to create this string
   * @default all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
   */
  transition?: string;
  /**
   * Active state to allow transform
   * @default false
   */
  isActive?: boolean;
  /**
   * Custom css classname
   * @default undefined
   */
  className?: string;
}
const BaseWrapper: FC<PropsWithChildren<AnimatedIconProps>> = (props) => (
  <div className={props.className}>{props.children}</div>
);

const StyledMenuIconWrapper = styled(BaseWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  & > svg {
    transform: ${(props) =>
      props.isActive ? props.finalTransform : props.initialTransform};
    transition: ${(props) => props.transition};
  }
`;

export const ANIMATED_ICON_DEFAULT_PROPS: AnimatedIconProps = {
  isActive: false,
  initialTransform: 'rotate(0deg) scale(1.0)',
  finalTransform: 'rotate(90deg) scale(1.0)',
};

/**
 * Wrapper component around SVG Icons to allow transformation animations on state change
 */
export const AnimatedIcon: FC<PropsWithChildren<AnimatedIconProps>> = (props) => {
  const theme = useTheme();
  const transition = theme.transitions.create('all', {
    duration: theme.transitions.duration.standard,
  });
  return (
    <StyledMenuIconWrapper
      {...ANIMATED_ICON_DEFAULT_PROPS}
      transition={transition}
      {...props}
    >
      {props.children}
    </StyledMenuIconWrapper>
  );
};
