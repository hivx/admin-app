import { useParams } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';

import { ConnectedAutoSelectModalityForm } from './ConnectedAutoSelectModalityForm';
export const AutoSelectModalityFormWrapper = () => {
  const { site: siteID } = useParams();

  return siteID ? (
    <ConnectedAutoSelectModalityForm siteID={parseInt(siteID)} />
  ) : (
    <FullPageSpinner />
  );
};
