import { Stack, styled } from '@mui/material';
import React from 'react';

import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { globalStyles } from '@/providers/ThemeProvider';
import { IUserDTO } from '@/types/dto';

export const UsersCell = ({ users = [] }: { users: IUserDTO[] }) => {
  /**
   * return users name string by type
   */
  const renderSortedUsersByType = (type: IUserDTO['type'], users: IUserDTO[]) => {
    if (users.length === 0) return null;
    const sortedUsers = users.filter((item) => item.type === type);
    const stringSortedUsers = sortedUsers.map((item) => item.fullname).join(', ');
    return (
      <OrderInfoTypography title={stringSortedUsers}>
        {stringSortedUsers}
      </OrderInfoTypography>
    );
  };

  return (
    <Stack width="100%" spacing={1}>
      <StyledLabelAndValueWrapper>
        <StyledLabel title="BS">BS</StyledLabel>
        <>{renderSortedUsersByType('IMAGING_DOCTOR', users)}</>
      </StyledLabelAndValueWrapper>

      <StyledLabelAndValueWrapper>
        <StyledLabel title="KTV">KTV</StyledLabel>
        <>{renderSortedUsersByType('TECHNICIAN', users)}</>
      </StyledLabelAndValueWrapper>

      <StyledLabelAndValueWrapper>
        <StyledLabel title="ĐD">ĐD</StyledLabel>
        <>{renderSortedUsersByType('NURSING', users)}</>
      </StyledLabelAndValueWrapper>
    </Stack>
  );
};

const StyledLabel = styled(OrderInfoTypography)`
  color: ${(props) => props.theme.pacs?.customColors.text.label};
`;

const StyledLabelAndValueWrapper = styled('div')`
  ${globalStyles.ellipsisEffect};
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(30px, 0.5fr) 5fr;
`;
