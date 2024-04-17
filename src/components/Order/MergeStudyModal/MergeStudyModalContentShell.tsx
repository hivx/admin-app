import { styled } from '@mui/material';
import React, { FC } from 'react';
type MergeStudyModalContentShellProps = {
  InfoNeedMerge: React.ReactNode;
  InfoOrder: React.ReactNode;
  RequestTable: React.ReactNode;
};
const MergeStudyModalContentShell: FC<MergeStudyModalContentShellProps> = (props) => {
  const { InfoNeedMerge, InfoOrder, RequestTable } = props;
  return (
    <StyledMergeStudyModalContentShellContainer>
      <StyledLeftItemWrapper>
        {InfoNeedMerge}
        {RequestTable}
      </StyledLeftItemWrapper>
      {InfoOrder}
    </StyledMergeStudyModalContentShellContainer>
  );
};

export default MergeStudyModalContentShell;

const StyledLeftItemWrapper = styled('div')`
  display: grid;
  grid-template-rows: 1fr 250px;
  row-gap: ${(props) => props.theme.spacing(2)};
`;

const StyledMergeStudyModalContentShellContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(45%, 1fr) minmax(45%, 1fr);
  gap: ${(props) => props.theme.spacing(2)};
`;
