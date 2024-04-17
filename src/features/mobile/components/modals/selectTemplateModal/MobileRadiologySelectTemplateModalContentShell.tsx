import { styled } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type MobileRadiologySelectTemplateModalContentShellProps = {
  ContentComponent: ReactNode;
};
const MobileRadiologySelectTemplateModalContentShell: FC<
  MobileRadiologySelectTemplateModalContentShellProps
> = (props) => {
  const { ContentComponent } = props;
  return (
    <StyledMobileRadiologySelectTemplateModalContentShellContainer>
      {ContentComponent}
    </StyledMobileRadiologySelectTemplateModalContentShellContainer>
  );
};

export default MobileRadiologySelectTemplateModalContentShell;

const StyledMobileRadiologySelectTemplateModalContentShellContainer = styled('div')``;
