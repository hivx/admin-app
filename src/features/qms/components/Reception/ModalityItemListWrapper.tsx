import React from 'react';
import { useParams } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';

import { ModalityItemList } from './ModalityItemList';
export const ModalityItemListWrapper = () => {
  const { site: siteID } = useParams();

  return siteID ? <ModalityItemList siteID={parseInt(siteID)} /> : <FullPageSpinner />;
};
