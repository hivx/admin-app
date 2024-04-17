import React from 'react';

import { useTranslate } from '@/hooks';

import { MobileLayout } from '../layout/MobileLayout';

import { MobileOrderListFilter } from './filter/MobileOrderListFilter';
import { MobileOrderListShell } from './MobileOrderListShell';
import { MobileOrderListTable } from './MobileOrderListTable';

export const MobileOrderListPage = () => {
  const translate = useTranslate();
  return (
    <MobileLayout title={translate.pages.orderList.title()}>
      <MobileOrderListShell
        FilterComponent={<MobileOrderListFilter />}
        TableComponent={<MobileOrderListTable />}
      />
    </MobileLayout>
  );
};
