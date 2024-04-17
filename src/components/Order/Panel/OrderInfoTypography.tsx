import { styled, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { filterTransientProps } from '@/utils/filterTransientProps';

const OrderInfoTypography: FC<TypographyProps & { isEllipsis?: boolean }> = (props) => {
  const { isEllipsis = true, ...typographyProps } = props;
  return (
    <StyledTypography variant="body2" {...typographyProps} $isEllipsis={isEllipsis}>
      {props.children}
    </StyledTypography>
  );
};

const StyledTypography = styled(Typography, filterTransientProps)<{
  $isEllipsis?: boolean;
}>`
  ${(props) => props.$isEllipsis && globalStyles.ellipsisEffect}
`;

export default OrderInfoTypography;
