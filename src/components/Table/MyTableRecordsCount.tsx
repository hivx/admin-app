import { Stack, styled, SxProps, Typography } from '@mui/material';
import { FC } from 'react';

import { useTranslate } from '@/hooks';

type MyTableRecordsCountProps = {
  displayRowsPerPage?: boolean;
  /**
   * Custom theme override
   */
  sx?: SxProps;
  start?: number;
  end?: number;
};

export const MyTableRecordsCount: FC<MyTableRecordsCountProps> = (props) => {
  const translate = useTranslate();
  const { displayRowsPerPage = true, start, end, sx } = props;
  return (
    <StyledMyTableRecordsCount sx={sx}>
      {displayRowsPerPage && (
        <Stack direction="row" alignItems="center">
          <Typography variant="body2">
            {translate.messages.pagination.recordsRange({
              end: end || 0,
              start: start || 0,
            })}
          </Typography>
        </Stack>
      )}
    </StyledMyTableRecordsCount>
  );
};

const StyledMyTableRecordsCount = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  font-size: 12px;
  & > :not(:last-child) {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;
