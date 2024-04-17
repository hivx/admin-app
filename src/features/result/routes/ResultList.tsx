import React from 'react';

import { DynamicSidepanelWrapper } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelWrapper';
import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import OrderResultDynamicSidepanelWrapper from '@/components/Order/DynamicPanel/OrderResultDynamicSidepanelWrapper';
import { useTranslate } from '@/hooks';

import { ResultListLayout } from '../components/Layout/ResultListLayout';
import { ResultListWrapper } from '../components/Layout/ResultListWrapper';
import { ResultListFilterForm } from '../components/Table/filter/ResultListFilterForm';
import { ResultTable } from '../components/Table/ResultTable';

export const ResultList = () => {
  const translate = useTranslate();

  return (
    <NavBarLayout>
      <ResultListLayout title={translate.pages.result.title()}>
        <DynamicSidepanelWrapper>
          <ResultListWrapper
            TableComponent={<ResultTable FilterComponent={<ResultListFilterForm />} />}
          />
          <OrderResultDynamicSidepanelWrapper />
        </DynamicSidepanelWrapper>
      </ResultListLayout>
    </NavBarLayout>
  );
};
