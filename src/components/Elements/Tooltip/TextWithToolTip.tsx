import { styled, Tooltip, Typography, TypographyProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { filterTransientProps } from '@/utils/filterTransientProps';
type TextWithToolTipProps = {
  title?: string;
  children: ReactNode;
  ellipsisEffect?: boolean;
} & TypographyProps;
export const TextWithToolTip: FC<TextWithToolTipProps> = (props) => {
  const { title, children, ellipsisEffect, ...rest } = props;
  return (
    <>
      <Tooltip title={title ?? ''} followCursor>
        <StyledText variant="body2" $ellipsisEffect={ellipsisEffect ?? false} {...rest}>
          {children}
        </StyledText>
      </Tooltip>
    </>
  );
};

const StyledText = styled(Typography, filterTransientProps)<{ $ellipsisEffect: boolean }>`
  ${(props) => props.$ellipsisEffect && globalStyles.ellipsisEffect};
  color: inherit;
  max-width: 100%;
`;
