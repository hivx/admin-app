import { darken, css, Paper, styled } from '@mui/material';

import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { globalStyles } from '@/providers/ThemeProvider';
import { IModalNotificationOptions } from '@/types';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { MyButton } from '../Buttons';

import { ModalContent } from './ModalContent';

type IStyledNotificationModalTitleProps = {
  $variant: IModalNotificationOptions['variant'];
};

const modalBorderRadius = '10px';

const titleStyle = css`
  font-weight: 400;
  font-size: 2rem;
  padding: 20px 40px;
  border-radius: ${modalBorderRadius} ${modalBorderRadius} 0 0;
`;

const bodyStyle = css`
  display: flex;
  flex-grow: 1;
  border-radius: 0;
`;

export const StyledNotificationModalTitle = styled(
  StyledDivLeftChildren,
  filterTransientProps,
)<IStyledNotificationModalTitleProps>`
  ${titleStyle};
  ${(props) => {
    switch (props.$variant) {
      case 'error':
        return css`
          background-color: ${props.theme.palette.error.main};
          color: ${props.theme.palette.error.contrastText};
        `;
      case 'info':
        return css`
          background-color: ${props.theme.palette.success.main};
          color: ${props.theme.palette.success.contrastText};
        `;
      case 'warning':
        return css`
          background-color: ${props.theme.palette.warning.main};
          color: ${props.theme.palette.warning.contrastText};
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}
`;

export const StyledNotificationModalContent = styled(ModalContent)`
  border-radius: ${modalBorderRadius};
`;

export const StyledNotificationModalBody = styled(Paper)`
  ${bodyStyle};
  ${globalStyles.centerChildren}
`;

export const StyledNotificationModalFooter = styled(Paper)`
  ${bodyStyle};
  ${globalStyles.rightChildren}
  justify-content:space-between;
  border-radius: 0 0 ${modalBorderRadius} ${modalBorderRadius};
  padding: 20px;
`;

export const StyledConfirmButton = styled(
  MyButton,
  filterTransientProps,
)<IStyledNotificationModalTitleProps>`
  ${(props) => {
    switch (props.$variant) {
      case 'error':
        return css`
          background-color: ${props.theme.palette.error.main};
          color: ${props.theme.palette.error.contrastText};
          &:hover {
            background-color: ${darken(props.theme.palette.error.main, 0.1)};
          }
        `;
      case 'info':
        return css`
          background-color: ${props.theme.palette.success.main};
          color: ${props.theme.palette.success.contrastText};
          &:hover {
            background-color: ${darken(props.theme.palette.success.main, 0.1)};
          }
        `;
      case 'warning':
        return css`
          background-color: ${props.theme.palette.warning.main};
          color: ${props.theme.palette.warning.contrastText};
          &:hover {
            background-color: ${darken(props.theme.palette.warning.main, 0.1)};
          }
        `;
      default:
        return css`
          background-color: white;
          color: black;
        `;
    }
  }}
`;
