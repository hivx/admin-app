import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { FC } from 'react';

import { useGetViewerUrlQuery } from '@/api/viewerUrl';
import { BaseEntity } from '@/types';

import { IframeViewer } from './IframeViewer';

type ViewerFromOrderIDProps = {
  orderIDs: BaseEntity['id'][] | undefined;
};
/**
 * Process viewer url from order IDs
 */
export const ViewerFromOrderID: FC<ViewerFromOrderIDProps> = (props) => {
  const { orderIDs } = props;
  const { data: viewerUrl } = useGetViewerUrlQuery(orderIDs ? { orderIDs } : skipToken);

  return viewerUrl ? <IframeViewer url={viewerUrl} /> : <></>;
};
