import { lighten, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

type InfomationShellProps = {
  label: string;
  OptionLabel?: ReactNode;
  Content?: ReactNode;
  height?: string;
};

export const InfomationShell = (props: InfomationShellProps) => {
  const { label, Content, OptionLabel, height } = props;
  return (
    <div style={{ height: height }}>
      <StyledLabelGroup>
        <StyledLabel>{label}</StyledLabel>
        {OptionLabel}
      </StyledLabelGroup>
      <StyledContent>{Content}</StyledContent>
    </div>
  );
};

const StyledLabel = styled(Typography)`
  padding-left: 10px;
  font-size: 25px;
  font-weight: 500;
  color: ${(props) => props.theme.palette.primary.main};
`;
const StyledLabelGroup = styled('div')`
  max-height: ${(props) => props.theme.qms?.layout.qmsLabelInfoHeight};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => lighten(props.theme.palette.primary.main, 0.7)};
`;

const StyledContent = styled('div')`
  padding: ${(props) => props.theme.spacing(1)};
  height: calc(100% - ${(props) => props.theme.qms?.layout.qmsLabelInfoHeight});
  overflow: auto;
`;
