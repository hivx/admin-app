import { Tabs, TabsProps, styled } from '@mui/material';

type IMyTabsProps = TabsProps;

const StyledTabs = styled(Tabs)``;

export const MyTabsDefaults: IMyTabsProps = {
  sx: { borderBottom: 1, borderColor: 'divider' },
};

export const MyTabs = (props: IMyTabsProps) => {
  return (
    <StyledTabs {...MyTabsDefaults} {...props}>
      {props.children}
    </StyledTabs>
  );
};
