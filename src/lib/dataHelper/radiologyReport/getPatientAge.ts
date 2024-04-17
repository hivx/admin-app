import dayjs from 'dayjs';

import { IPatientDTO } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

export const getPatientAge = (age?: IPatientDTO['birthDate']) => {
  const currentYear = dayjs().year();
  const currentMonth = dayjs().month();
  const currentDay = dayjs().day();
  if (age) {
    const yearOfBirth = itechDateToDayjs(age || '')?.format(DISPLAY_FORMAT.year);
    const monthOfBirth = itechDateToDayjs(age || '')?.month() ?? 0;
    const dayOfBirth = itechDateToDayjs(age || '')?.day() ?? 0;
    /**
     * This year - birth of year => age patient
     */
    const currentAge = currentYear - parseInt(yearOfBirth ?? '');
    if (currentAge > 3) {
      return `${currentAge}T`;
    }
    const currentMonthAge = currentAge * 12 + currentMonth - monthOfBirth;

    if (currentMonthAge > 0) {
      return `${currentMonthAge} Tháng`;
    }

    return `${currentDay - dayOfBirth} Ngày`;
  }
  return 0;
};
