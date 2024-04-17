import React from 'react';

import { DynamicSidepanelWrapper } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelWrapper';
import { BookmarkFolderMain } from '@/components/Order/Bookmark/BookmarkFolderMain';
import { BookmarkMain } from '@/components/Order/Bookmark/BookmarkMain';
import { OrderListFilterForm } from '@/components/Order/Filter/OrderListFilterForm';
import { MergeStudyMain } from '@/components/Order/MergeStudyModal/MergeStudyMain';
import { CreateOrderMain } from '@/components/Order/StudyInfo/CreateOrderMain';
import { StudyInfoMain } from '@/components/Order/StudyInfo/StudyInfoMain';
import { useTranslate } from '@/hooks';
import { OrderListFunctionsProvider } from '@/providers/Order/OrderListFunctionsProvider';
import { TABLE_EXAMINATION } from '@/stores/table/tableInitialState';

import ExaminationDynamicSidePanelWrapper from '../../../components/Order/DynamicPanel/ExaminationDynamicSidePanelWrapper';

import { ExaminationListLayout } from './layout/ExaminationListLayout';
import { ExaminationListShell } from './layout/ExaminationListShell';
import { ExaminationSidebar } from './Sidebar/ExaminationSidebar';
import { ExaminationTable } from './Table/ExaminationTable';

export const ExaminationPage = () => {
  const translate = useTranslate();
  return (
    <ExaminationListLayout title={translate.pages.examinationList.title()}>
      <OrderListFunctionsProvider>
        <ExaminationSidebar />
        <DynamicSidepanelWrapper>
          <ExaminationListShell
            TableComponent={
              <ExaminationTable
                FilterComponent={<OrderListFilterForm tableID={TABLE_EXAMINATION} />}
              />
            }
          />
          <ExaminationDynamicSidePanelWrapper />
        </DynamicSidepanelWrapper>
        <MergeStudyMain />
        <StudyInfoMain />
        {/* <AddRequestMain />
        <EditRequestMain /> */}
        <CreateOrderMain />
        <BookmarkMain />
        <BookmarkFolderMain />
      </OrderListFunctionsProvider>
    </ExaminationListLayout>
  );
};
