import React from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { filterModalCreateNonDicom } from '@/dataHelper/filterModalCreateNonDicom';
import { useAppDispatch } from '@/hooks';
import { setRadiologyTabKey } from '@/stores/OrderRadiology';
import { TAB_PAGES } from '@/types/radiology/reportContext';

import { useCurrentOrderID } from '../../../providers';

import CreateNonDicomButton from './CreateNonDicomButton';

const QuickReportCreateNonDicomButton = () => {
  const orderID = useCurrentOrderID();
  const dispatch = useAppDispatch();

  const { data: order } = useGetOneOrderQuery({ id: orderID });
  /**
   * Check modalitype can use create nondicom
   * @returns boolean
   */
  const isVisible = filterModalCreateNonDicom(order?.modalityType ?? '');

  return order && isVisible ? (
    <CreateNonDicomButton
      color="primary"
      onClick={() => {
        dispatch(setRadiologyTabKey({ orderID, tabKey: TAB_PAGES.IMAGE_UPLOAD }));
      }}
    />
  ) : (
    <></>
  );
};

export default QuickReportCreateNonDicomButton;
