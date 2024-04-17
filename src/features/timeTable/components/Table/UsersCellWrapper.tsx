import { Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type UsersCellWrapperProps = {
  UsersInfoComponent: ReactNode;
  UsersCellButton: ReactNode;
};
export const UsersCellWrapper: FC<UsersCellWrapperProps> = ({
  UsersCellButton,
  UsersInfoComponent,
}) => {
  return (
    <StyledUsersCellWrapper>
      <Stack>{UsersInfoComponent}</Stack>
      <Stack>{UsersCellButton}</Stack>
    </StyledUsersCellWrapper>
  );
};

const StyledUsersCellWrapper = styled('div')`
  display: grid;
  width: 100%;
  grid-template-columns: 4fr minmax(30px, 0.5fr);
  .MuiButtonBase-root {
    display: none;
  }
  :hover {
    .MuiButtonBase-root {
      display: flex;
    }
  }
`;
