import { styled } from '@mui/material';
import { FC, ReactNode } from 'react';

import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';

type BottomFieldsItemWrapperProps = {
  label: string;
  FieldValue?: ReactNode;
};
/**
 * Component wrapper bottom fields (Chỉ định ,CĐLS, Bác sĩ đọc, Bác sĩ duyệt) in radiology report
 */
export const BottomFieldsItemWrapper: FC<BottomFieldsItemWrapperProps> = ({
  label,
  FieldValue,
}) => {
  return (
    <StyledBottomFieldsItemWrapper>
      <StyledLabel>
        <OrderInfoTypography title={label}>{label}</OrderInfoTypography>
      </StyledLabel>
      {FieldValue}
    </StyledBottomFieldsItemWrapper>
  );
};

const StyledLabel = styled('div')`
  color: ${(props) => props.theme.pacs?.customColors.text.label};
`;

const StyledBottomFieldsItemWrapper = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(75px, 0.5fr) 4fr;
  align-items: center;
`;
