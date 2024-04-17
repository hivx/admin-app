import styled from '@emotion/styled';
import { Grid, SxProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
type OrderInfoFieldProps = {
  Label: ReactNode;
  FieldValue?: ReactNode;
  labelXS?: number;
  valueXS?: number;
  containerSpacing?: number;
  sx?: SxProps;
};

const DEFAULT_LABEL_XS = 4;
const DEFAULT_VALUE_XS = 8;

const OrderInfoField: FC<OrderInfoFieldProps> = (props) => {
  const { Label, FieldValue, labelXS, valueXS, containerSpacing, sx } = props;
  let computedLabelXS = DEFAULT_LABEL_XS;
  let computedValueXS = DEFAULT_VALUE_XS;
  if (labelXS && valueXS) {
    computedLabelXS = labelXS;
    computedValueXS = valueXS;
  } else if (labelXS) {
    computedLabelXS = labelXS;
    computedValueXS = 12 - labelXS;
  } else if (valueXS) {
    computedValueXS = valueXS;
    computedLabelXS = 12 - valueXS;
  }
  return (
    <StyledOrderInfoFieldContainer
      container
      alignItems="center"
      spacing={containerSpacing}
      sx={sx}
    >
      <StyledLabel item xs={computedLabelXS}>
        {Label}
      </StyledLabel>
      <StyledOrderInfoFieldValue item xs={computedValueXS}>
        {FieldValue}
      </StyledOrderInfoFieldValue>
    </StyledOrderInfoFieldContainer>
  );
};

export default OrderInfoField;

const StyledLabel = styled(Grid)`
  color: ${(props) => props.theme.pacs?.customColors.text.label};
  max-width: 100px !important;
  min-width: 50px;
`;
const StyledOrderInfoFieldValue = styled(Grid)``;

const StyledOrderInfoFieldContainer = styled(Grid)`
  ${globalStyles.ellipsisEffect};
`;
