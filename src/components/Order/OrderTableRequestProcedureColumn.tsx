import { alpha, styled } from '@mui/material';
import { FC } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { IOrderDTO } from '@/types/dto';

type OrderTableInfoColumnProps = {
  order: IOrderDTO;
};

export const OrderTableRequestProcedureColumn: FC<OrderTableInfoColumnProps> = (
  props,
) => {
  const { order } = props;
  const content = order.requests
    ?.map((item) => item?.procedure?.name)
    .filter((item) => !!item);
  if (!content) return <></>;

  const firstProcedure = content[0];
  return firstProcedure ? (
    <StyledNewlinesText title={firstProcedure}>
      {firstProcedure}{' '}
      {content.length > 1 && (
        <StyledExtraProcedures>+{content.length - 1}</StyledExtraProcedures>
      )}
    </StyledNewlinesText>
  ) : (
    <></>
  );
};

const StyledNewlinesText = styled('div')`
  max-width: 100%;
  ${globalStyles.ellipsisEffect};
`;

const StyledExtraProcedures = styled('span')`
  background-color: ${(props) => alpha(props.theme.palette.primary.main, 0.1)};
  padding: 0 ${(props) => props.theme.spacing(0.5)} 0
    ${(props) => props.theme.spacing(0.5)};
`;
