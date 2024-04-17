import { DynamicSidepanelWrapper } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelWrapper';
import { BookmarkFolderMain } from '@/components/Order/Bookmark/BookmarkFolderMain';
import { BookmarkMain } from '@/components/Order/Bookmark/BookmarkMain';
import OrderListDynamicSidepanelWrapper from '@/components/Order/DynamicPanel/OrderListDynamicSidepanelWrapper';
import { OrderListFilterForm } from '@/components/Order/Filter/OrderListFilterForm';
import OrderPrintImageModalMain from '@/components/Order/PrintDicomModal/OrderPrintImageModalMain';
import { useTranslate } from '@/hooks/useTranslate';
import { OrderListFunctionsProvider } from '@/providers/Order/OrderListFunctionsProvider';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';

import { MergeStudyMain } from '../../../components/Order/MergeStudyModal/MergeStudyMain';
import { StudyInfoMain } from '../../../components/Order/StudyInfo/StudyInfoMain';
import { OrderListLayout } from '../components/Layout/OrderListLayout';
import { OrderListShell } from '../components/Layout/OrderListShell';
import { OrderTablePanel } from '../components/OrderList/Panel/OrderTablePanel';
import { OrderListSidebar } from '../components/OrderList/Sidebar/OrderListSidebar';
import { OrderTable } from '../components/OrderList/Table/OrderTable';
import { QuickReportMain } from '../components/RadiologyReport/QuickReport/QuickReportMain';

export const OrderListPage = () => {
  const translate = useTranslate();

  return (
    <OrderListLayout title={translate.pages.orderList.title()}>
      <OrderListFunctionsProvider>
        <OrderListSidebar />
        <DynamicSidepanelWrapper>
          <OrderListShell
            TableComponent={
              <OrderTable
                FilterComponent={<OrderListFilterForm tableID={TABLE_ORDER} />}
              />
            }
            PanelComponent={<OrderTablePanel />}
          />
          <OrderListDynamicSidepanelWrapper />
        </DynamicSidepanelWrapper>

        <QuickReportMain />
        <StudyInfoMain />
        {/* <AddRequestMain />
        <EditRequestMain /> */}
        <MergeStudyMain />
        <BookmarkMain />
        <BookmarkFolderMain />
        <OrderPrintImageModalMain />
      </OrderListFunctionsProvider>
    </OrderListLayout>
  );
};
