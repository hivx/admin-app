import { Stack, styled } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import { DynamicPanelHeader, DynamicPanelHeaderProps } from './DynamicPanelHeader';

type NoHeaderProps = {
  noHeader: boolean;
} & PropsWithChildren;

type WithHeaderProps = DynamicPanelHeaderProps & PropsWithChildren;
type DynamicPanelShellProps = NoHeaderProps | WithHeaderProps;
/**
 * Base component to build a DynamicPanel component
 * Contains layout code for Header + Main Component
 */
export const DynamicPanelShell: FC<DynamicPanelShellProps> = (props) => {
  if ('noHeader' in props) {
    return (
      <StyledLayout direction="column">
        <StyledPanelContent>{props.children}</StyledPanelContent>
      </StyledLayout>
    );
  }
  const { children, ...headerProps } = props;
  return (
    <StyledLayout direction="column">
      <DynamicPanelHeader {...headerProps} />
      <StyledPanelContent>{children}</StyledPanelContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Stack)`
  border: 1px solid ${(props) => props.theme.pacs?.customColors.borderColor};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledPanelContent = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background-color: ${(props) => props.theme.pacs?.customColors.backgroundPanelContent};
`;
