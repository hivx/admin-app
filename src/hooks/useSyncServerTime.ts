import { useGetCurrentTimeQuery } from '@/api/currentTime';
import { useAuth } from '@/providers/AuthProvider';
import { setCurrentTimeOffset } from '@/stores/localStorage';
import { getLocalTime } from '@/utils/dateUtils';

const POLLING_INTERVAL = 60000;

/**
 * Synchronizes server time and local time by periodically updating the time offset stored in localStorage
 */
export const useSyncServerTime = () => {
  const { data: serverTime, isFetching } = useGetCurrentTimeQuery(undefined, {
    pollingInterval: POLLING_INTERVAL,
  });
  const { user } = useAuth();

  if (user && serverTime && !isFetching) {
    const localTime = getLocalTime().valueOf();

    /**
     * offset = localTime - serverTime
     * serverTime = localTime - offset
     */
    const offset = localTime - serverTime;
    setCurrentTimeOffset(offset);
  }

  return;
};
