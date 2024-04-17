import { useCallback } from 'react';

import { CONSULTANT_MEETING_URL } from '@/config';
import { getRndInteger } from '@/utils/getRndInteger';

export const useConsultantMeeting = () => {
  const openMeetingPage = useCallback(() => {
    const randomRoomNumber = getRndInteger(100000, 999999);
    window.open(`${CONSULTANT_MEETING_URL}/${randomRoomNumber}`, '_blank');
  }, []);
  return openMeetingPage;
};
