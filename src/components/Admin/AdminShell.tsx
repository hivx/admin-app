import { Box, Divider, Grid, Stack, StackProps, styled, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';

type AdminShellProps = {
  title: string | LocalizedString;
  FilterComponent?: ReactNode;
  TableComponent: ReactNode;
  PanelComponent?: ReactNode;
  ActionButtons: ReactNode;
  ContainerProps?: StackProps;
};

/**
 * Handles UI Layout of an Admin page
 */
export const AdminShell: FC<AdminShellProps> = (props) => {
  const { title, FilterComponent, TableComponent, PanelComponent, ContainerProps } =
    props;
  return (
    <StyledAdminWrapper spacing={1} {...ContainerProps}>
      <Stack>
        <StyledAdminTitleContainer>
          <StyledAdminTitle>{title}</StyledAdminTitle>
        </StyledAdminTitleContainer>
        <StyledAdminDivider />
      </Stack>
      <Grid item container direction="row" mt={1}>
        <Grid item xs={6}>
          <StyledFilterContainer>{FilterComponent}</StyledFilterContainer>
        </Grid>
      </Grid>
      <StyledTableContainerWithCollapsiblePanel>
        <StyledTableContainer>{TableComponent}</StyledTableContainer>
        {PanelComponent && PanelComponent}
      </StyledTableContainerWithCollapsiblePanel>
    </StyledAdminWrapper>
  );
};

/**
 * Styles
 */

const StyledAdminWrapper = styled(Stack)`
  padding: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(0.5)};
  width: 100%;
  height: 100%;
  max-width: 100%;
`;

const StyledAdminTitleContainer = styled('div')`
  /* height: 30px; */
  align-items: center;
  display: flex;
`;

const StyledAdminTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-transform: uppercase;
`;
const StyledTableContainer = styled(Box)`
  display: flex;
  flex: 1;
  margin-top: ${(props) => props.theme.spacing(1)};
  width: 100%;
  height: 0;
  max-height: 100%;
  overflow: hidden;
`;

const StyledAdminDivider = styled(Divider)`
  border-color: ${(props) => props.theme.palette.primary.main};
  width: 10%;
  min-width: 120px;
`;

const StyledFilterContainer = styled('div')`
  width: 100%;
  height: 100%;
`;
