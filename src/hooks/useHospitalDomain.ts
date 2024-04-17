import { useGetHospitalCommonByDomainQuery } from '@/api/domain';

/**
 * Get hospital common data
 */
export const useHospitalDomain = () => {
  const { data: hospitalData } = useGetHospitalCommonByDomainQuery(
    {
      id: window.location.host,
    },
    { refetchOnMountOrArgChange: 86400 },
  );

  return hospitalData;
};
