import { styled } from '@mui/material';
import { FC } from 'react';

import { RenderFormFieldDefinition } from '@/types/form';

import { ISearchOrderFilterForm } from './OrderListFilterForm';

type OrderListExpandedFieldsProps = {
  fieldsDef: RenderFormFieldDefinition<ISearchOrderFilterForm>;
};

export const OrderListExpandedFields: FC<OrderListExpandedFieldsProps> = (props) => {
  const { fieldsDef } = props;

  return (
    <StyledOrderListExpandedFilterFormContainer>
      {Object.entries(fieldsDef).map(([_, fieldDef]) => fieldDef.Component)}
    </StyledOrderListExpandedFilterFormContainer>
  );
};

/**
 * Styles
 */
const StyledOrderListExpandedFilterFormContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing(1)};
`;
