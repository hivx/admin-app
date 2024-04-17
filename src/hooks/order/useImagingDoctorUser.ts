import { useAppSelector } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth';

/**
 * Check if a user is a doctor or not
 */
export const useImagingDoctorUser = () => {
  const user = useAppSelector(selectCurrentUser);
  return user?.type === 'IMAGING_DOCTOR';
};
