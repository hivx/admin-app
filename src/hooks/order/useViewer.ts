import { join } from 'path';

import { useCallback } from 'react';

import { useLazyGetViewerUrlQuery } from '@/api/viewerUrl';
import { ROUTE_VIEWER } from '@/features/viewer';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { BaseEntity } from '@/types';

type Options = {
  shouldReplaceTab?: boolean;
  orderIDs: BaseEntity['id'][];
};
export const useViewer = (options: Options) => {
  const { isMultiTabViewer } = useHospitalProvider();
  const { orderIDs, shouldReplaceTab = !isMultiTabViewer } = options;
  const [trigger] = useLazyGetViewerUrlQuery();

  const getViewerUrl = useCallback(async () => {
    const viewerUrl = await trigger({ orderIDs }).unwrap();
    return viewerUrl;
  }, [orderIDs, trigger]);

  /**
   * Open up viewer as an iframe wrapped within a custom React component
   */
  const getAIViewerUrl = useCallback((viewerUrl: string) => {
    const encodedUrl = window.btoa(viewerUrl);
    return join(ROUTE_VIEWER, `?url=${encodedUrl}`);
  }, []);

  const openInNewTab = useCallback(
    async ({ useAIViewer = false }: { useAIViewer?: boolean } = {}) => {
      try {
        const viewerUrl = await getViewerUrl();
        const tabUrl = useAIViewer ? getAIViewerUrl(viewerUrl) : viewerUrl;

        if (shouldReplaceTab) {
          window.open(tabUrl, '_itech_viewer')?.focus();
        } else window.open(tabUrl, `_itech_viewer${orderIDs}`)?.focus();
      } catch (e) {
        return;
      }
    },
    [getAIViewerUrl, getViewerUrl, orderIDs, shouldReplaceTab],
  );

  return { openInNewTab, getViewerUrl, getAIViewerUrl };
};
