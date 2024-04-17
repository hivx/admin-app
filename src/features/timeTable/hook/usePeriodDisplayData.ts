import { useGetListTimetablePeriodQuery } from '@/api/timetablePeriod';
import { changeTimeFormat } from '@/utils/dateUtils';

export type PeriodDisplayType = {
  periodName: string | undefined;
  displayTime: string;
  consecutive: boolean | undefined;
  id: number;
};

export function usePeriodDisplayData(): PeriodDisplayType[] {
  const { data } = useGetListTimetablePeriodQuery({ filter: {} });

  /**
   * sort timetime period by index
   */
  const sortByIndex =
    data && data.list.length !== 0
      ? [...data.list].sort((a, b) => {
          if (a.index && b.index) return a.index - b.index;
          return 0;
        })
      : undefined;

  return data?.list
    ? data?.list.map((item) => {
        return {
          periodName: item.name,
          displayTime: `${changeTimeFormat(item.fromTime ?? '')} - ${changeTimeFormat(
            item.toTime ?? '',
          )} `,
          consecutive: item.consecutive,
          id: item.id,
        };
      })
    : [];
}
