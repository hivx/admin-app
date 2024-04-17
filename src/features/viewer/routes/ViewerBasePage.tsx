import qs from 'qs';
import { useLocation } from 'react-router-dom';

import { IframeViewer } from '../Component/IframeViewer';
import { ViewerFromOrderID } from '../Component/ViewerFromOrderID';

export const ViewerBasePage = () => {
  const location = useLocation();
  const { search } = location;
  const queryString = qs.parse(search, { comma: true, ignoreQueryPrefix: true });
  const { orderID, url } = queryString;
  if (orderID) {
    const orderIDs = processOrderID(orderID);
    return <ViewerFromOrderID orderIDs={orderIDs} />;
  }

  if (url && typeof url === 'string') {
    const decodedUrl = window.atob(url);
    return <IframeViewer url={decodedUrl} />;
  }

  return <></>;
};

const processOrderID = (
  orderID?: string | qs.ParsedQs | string[] | qs.ParsedQs[],
): number[] | undefined => {
  if (!orderID) return;
  if (Array.isArray(orderID)) {
    return orderID.map((item) => parseInt(item as string));
  }
  return [parseInt(orderID as string)];
};
