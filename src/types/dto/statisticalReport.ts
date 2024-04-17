import { Nullable } from '@/types';

export type IStatisticalReportDTOBase = {
  name: string;
  description: string;
};

export type IStatisticalReportDTO = Nullable<IStatisticalReportDTOBase> & {
  id: number;
};

export type ISearchStatisticalReportFilter = Partial<Pick<IStatisticalReportDTO, 'name'>>;
