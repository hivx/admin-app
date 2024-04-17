import { lighten, styled } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

import { filterTransientProps } from '@/utils/filterTransientProps';

type RadiologyCustomSelectFieldsWrapperProps = {
  isErrorField?: boolean;
};

/**
 * Custom background of Select field
 */
export const RadiologyCustomSelectFieldsWrapper: FC<
  PropsWithChildren<RadiologyCustomSelectFieldsWrapperProps>
> = ({ isErrorField = false, children }) => {
  return (
    <StyledCustomSelectFields $isErrorField={isErrorField}>
      {children}
    </StyledCustomSelectFields>
  );
};

const StyledCustomSelectFields = styled('div', filterTransientProps)<{
  $isErrorField: boolean;
}>`
  width: 100%;
  .MuiInputBase-root > .MuiSelect-select {
    background-color: ${(props) =>
      props.$isErrorField
        ? lighten(props.theme.palette.error.main, 0.6)
        : lighten(props.theme.palette.primary.main, 0.6)};
  }
`;
