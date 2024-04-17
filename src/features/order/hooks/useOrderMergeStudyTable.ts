import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';

import { useGetListOrdersQuery, useLazyGetListOrdersQuery } from '@/api/order';
import { convertPatientName } from '@/dataHelper/convertPatientName';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { TABLE_ORDER_MERGE_STUDY } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { IOrderDTO, ISearchOrderFilter, ORDER_CREATION_TYPE } from '@/types/dto';
import { formatDate, getCurrentDate } from '@/utils/dateUtils';

export const useOrderMergeStudyTable = (order?: IOrderDTO) => {
  const dispatch = useAppDispatch();
  const defaultFilter: ISearchOrderFilter = {
    patientName: convertPatientName(order?.patient?.fullname ?? ''),
    modalityType: order?.modalityType,
    requestedDateFrom: formatDate(getCurrentDate()),
    requestedDateTo: formatDate(getCurrentDate()),
  };

  const query = useAppSelector(
    getCurrentTableQuery<ISearchOrderFilter>(TABLE_ORDER_MERGE_STUDY),
  );

  const { data, isLoading } = useGetListOrdersQuery(query ? query : skipToken);

  const [trigger] = useLazyGetListOrdersQuery();
  /**
   * Trigger Api get list with default filter
   */
  useEffect(() => {
    dispatch(setTableFilter({ tableId: TABLE_ORDER_MERGE_STUDY, filter: defaultFilter }));
    trigger({ ...query, filter: defaultFilter });
  }, []);

  /**
   * Remove item creationType = 'TAG'
   */
  const filterDataList = data?.list.filter(
    (item) => item.creationType !== ORDER_CREATION_TYPE.TAG,
  );

  return { filterDataList, isLoading, query };
};
