import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { addTab } from '@/stores/tabs/tabSlice';
import { IOrderDTO } from '@/types/dto';

import { ROUTE_ORDER_LIST } from '../routes';

export const useHistoryStudyTable = (orders?: IOrderDTO[]) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rowSelected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));

  const filterOrders = orders?.filter((order) => order.id !== rowSelected?.id);
  const orderHistoryListReverse =
    filterOrders &&
    filterOrders
      .sort((a, b) => Number(a?.study?.studyTime) - Number(b?.study?.studyTime))
      .reverse();
  /**
   * When double click into a row in table will open new tab
   * @param row
   */
  const handleHistoryStudy = (row: Row<IOrderDTO>) => {
    const tabHref = urlJoin(ROUTE_ORDER_LIST, String(row.original.id));
    dispatch(
      addTab({
        id: row.original.id,
        label: row?.original.patient?.fullname || '',
        href: tabHref,
      }),
    );
    navigate(tabHref);
  };
  return { handleHistoryStudy, orderHistoryListReverse };
};
