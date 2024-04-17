import { ISearchOrderFilter } from '@/types/dto';

export const convertPatientName = (patientName: ISearchOrderFilter['patientName']) => {
  const checkPatientName = new RegExp(/[\^]/);
  if (checkPatientName.test(patientName ?? '')) {
    const finalPatientName = patientName?.replace(/\^/g, ' ').match(/^\D+/)?.[0];
    return finalPatientName;
  } else {
    const finalPatientName = patientName?.match(/^\D+/)?.[0];
    return finalPatientName;
  }
};
