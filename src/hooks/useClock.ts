import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { getCurrentTime } from '@/utils/dateUtils';

/**
 * Periodically refresh the time
 * @param updateInterval update interval in ms
 * @returns Dayjs time
 */
export const useClock = (updateInterval?: number) => {
  const [currentTime, setCurrentTime] = useState<Dayjs>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(getCurrentTime()),
      updateInterval || 1000,
    );
    return () => clearInterval(interval);
  }, [updateInterval]);
  return currentTime;
};
