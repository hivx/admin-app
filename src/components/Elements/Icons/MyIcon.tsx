import { styled, SvgIcon, SvgIconProps } from '@mui/material';

interface IMyIconProps extends SvgIconProps {
  /**
   * CSS Width Property
   * @default 20px
   */
  width?: string;
  /**
   * CSS Height Property
   * @default 20px
   */
  height?: string;
}

const StyledIcon = styled(SvgIcon)`
  cursor: pointer;
  width: ${(props: IMyIconProps) => (props.width ? props.width : '20px')};
  height: ${(props: IMyIconProps) => (props.height ? props.height : '20px')};
`;

export const MyIcon = (props: IMyIconProps) => {
  return <StyledIcon {...props}>{props.children}</StyledIcon>;
};
