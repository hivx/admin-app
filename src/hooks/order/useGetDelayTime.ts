import { useLazyGetOneModalityTypeByNameQuery } from '@/api/modalityType';

export const useGetDelayTime = () => {
  const [trigger] = useLazyGetOneModalityTypeByNameQuery();
  const getModalityTypeDelayTime = async (modalityType: string) => {
    const data = await trigger({ name: modalityType }).unwrap();
    const delayTimeToOperation = data.attributes?.delay_time_to_operation;
    const delayTimeToApproval = data.attributes?.delay_time_to_approval;

    return {
      delayTimeToOperation: delayTimeToOperation
        ? parseInt(delayTimeToOperation) / 60
        : 0,
      delayTimeToApproval: delayTimeToApproval ? parseInt(delayTimeToApproval) / 60 : 0,
    };
  };
  return getModalityTypeDelayTime;
};
