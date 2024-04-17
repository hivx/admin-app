import { styled } from '@mui/material';

import { MyButton } from '@/components';
import { IOrderDTO } from '@/types/dto';

export type MobileRadiologyButtonProps = {
  order: IOrderDTO;
};

export const StyledMobileRadiologyButton = styled(MyButton)`
  min-width: 80px;
`;
