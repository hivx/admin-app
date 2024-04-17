import React from 'react';
import { useParams } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';

import { SummaryHeader } from './SummaryHeader';
import { SummaryLayoutLayout } from './SummaryLayout';
import { SummaryList } from './SummaryList';
import { SummaryWrapper } from './SummaryWrapper';

export const MainSummary = () => {
  const { site: siteID } = useParams();

  return (
    <SummaryLayoutLayout>
      <SummaryWrapper
        SummaryHeader={<SummaryHeader />}
        SummaryList={siteID && <SummaryList siteID={parseInt(siteID)} />}
      />
    </SummaryLayoutLayout>
  );
};
