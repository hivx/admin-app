import { styled } from '@mui/material';
import { FC } from 'react';
import { useMeasure } from 'react-use';

import { ITabItem } from '@/types';

import { TabItem } from './TabItem';

type TabsShellProps = {
  listTabs: ITabItem[];
};

const DEFAULT_TAB_WIDTH = 170;
const MIN_TAB_WIDTH = 75;

/**
 * Compute tab widths for each tabs
 * MIN_TAB_WIDTH < tab width < DEFAULT_TAB_WIDTH
 */
const computeTabWidth = (containerWidth: number, numTabs: number) => {
  if (!numTabs) return DEFAULT_TAB_WIDTH;
  return Math.min(
    Math.max(MIN_TAB_WIDTH, Math.floor(containerWidth / numTabs)),
    DEFAULT_TAB_WIDTH,
  );
};

/**
 * Parent container for tab items
 */
export const TabsShell: FC<TabsShellProps> = (props) => {
  const { listTabs } = props;
  const [tabContainerRef, { width }] = useMeasure<HTMLDivElement>();
  const tabWidth = computeTabWidth(width, listTabs.length);

  return (
    <StyledTabContainer ref={tabContainerRef}>
      {listTabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} width={tabWidth} />
      ))}
    </StyledTabContainer>
  );
};

const StyledTabContainer = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
`;
