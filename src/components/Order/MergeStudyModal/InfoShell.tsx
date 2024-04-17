import { colors, styled } from '@mui/material';
import React, { FC } from 'react';

type InfoShellProps = {
  Title: React.ReactNode;
  Content: React.ReactNode;
};
const InfoShell: FC<InfoShellProps> = (props) => {
  const { Title, Content } = props;
  return (
    <StyledInfoNeedMergeContainer>
      {Title}
      <StyledInfoOrderMain>{Content}</StyledInfoOrderMain>
    </StyledInfoNeedMergeContainer>
  );
};

export default InfoShell;

export const StyledTitle = styled('div')`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const StyledInfoNeedMergeContainer = styled('div')`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledInfoOrderMain = styled('div')`
  border: 1px solid ${colors.grey[400]};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  padding: ${(props) => props.theme.spacing(1)};
  display: grid;
`;
