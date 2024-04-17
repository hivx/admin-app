import { FC, useEffect, useMemo } from 'react';

import { useGetListModalityQuery } from '@/api/modality';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { modalitiesByGroup } from '@/lib/dataHelper/modalityHelper';
import { TABLE_ORDER_MOBILE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchOrderFilter } from '@/types/dto';

import { MobileOrderListFilterForm } from './MobileOrderListFilterForm';

export type MobileOrderListFilter = Pick<
  ISearchOrderFilter,
  'patientName' | 'modalityIDs' | 'requestedDateFrom' | 'requestedDateTo'
> & { groupModalities: string };

export const MobileOrderListFilter: FC = () => {
  const dispatch = useAppDispatch();
  const { data: modalityData } = useGetListModalityQuery({
    filter: {},
  });

  const query = useAppSelector(
    getCurrentTableQuery<ISearchOrderFilter>(TABLE_ORDER_MOBILE),
  );

  /**
   * modalities by group data
   */
  const modalitiesByGroupData = useMemo(
    () => modalitiesByGroup(modalityData?.list),
    [modalityData?.list],
  );

  const modalityIDs = modalityData
    ? modalityData?.list.map((modality) => modality.id)
    : undefined;

  /**
   * set default filter for mobile order list
   */
  useEffect(() => {
    if (modalityIDs && !query?.filter.modalityIDs) {
      dispatch(
        setTableFilter({
          tableId: TABLE_ORDER_MOBILE,
          filter: { modalityIDs },
          merge: true,
        }),
      );
    }
  }, [dispatch, modalityIDs, query]);

  return modalityIDs ? (
    <MobileOrderListFilterForm
      modalityIDs={modalityIDs}
      modalitiesByGroupData={modalitiesByGroupData}
      query={query}
      dispatch={dispatch}
    />
  ) : (
    <FullPageSpinner />
  );
};
