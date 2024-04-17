import { colors, Divider, styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type StudyHistoryTableShellProps = {
  TableComponent: ReactNode;
  Title?: ReactNode;
};

export const StudyHistoryTableShell: FC<StudyHistoryTableShellProps> = (props) => {
  const { TableComponent, Title } = props;
  return (
    <StyledStudyHistoryTableShell>
      {Title && (
        <>
          {Title}
          <Divider />
        </>
      )}

      <StyledTableContainer>{TableComponent}</StyledTableContainer>
    </StyledStudyHistoryTableShell>
  );
};

const StyledStudyHistoryTableShell = styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 0;
  text-align: center;

  .table-container,
  .table-footer {
    border: 0;
  }

  .table-container {
    border-top: 1px solid ${colors.grey[400]};
  }
`;

const StyledTableContainer = styled('div')`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: auto;
  min-height: 200px;
  /* padding-bottom: ${(props) => props.theme.spacing(2)}; */
`;
