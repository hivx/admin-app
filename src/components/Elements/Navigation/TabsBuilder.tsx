import { styled, Tab } from '@mui/material';
import React, { FC, ReactNode, ComponentProps } from 'react';

import { MyTabs } from './MyTabs';
import { TabPanel } from './TabPanel';

export type Tab = {
  /**
   * Unique key that identifies each tab
   */
  tabKey: string | number;
  /**
   * Label component in tab header
   */
  Label: ReactNode;
  /**
   * Tab content
   */
  TabPanel: ReactNode;
};

type TabsBuilderProps = {
  tabsList: Tab[];
  currentTabkey: Tab['tabKey'];
  handleChange: ComponentProps<typeof MyTabs>['onChange'];
};

/**
 * Automatically manage tab selection state and return Tab headers and panels
 */
export const TabsBuilder: FC<TabsBuilderProps> = (props) => {
  const { tabsList, currentTabkey, handleChange } = props;

  return (
    <StyledContainer>
      <MyTabs value={currentTabkey} onChange={handleChange}>
        {tabsList.map((tab) => (
          <Tab key={tab.tabKey} value={tab.tabKey} label={tab.Label} />
        ))}
      </MyTabs>
      {tabsList.map((tab) => (
        <TabPanel key={tab.tabKey} value={currentTabkey} tabValue={tab.tabKey}>
          {tab.TabPanel}
        </TabPanel>
      ))}
    </StyledContainer>
  );
};

/**
 * Styles
 */
const StyledContainer = styled('div')`
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: grid;
  grid-template-rows: auto minmax(50%, 1fr);
`;
