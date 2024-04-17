import { IOrderDTO } from '@/types/dto';
import { partition } from '@/utils/partition';

/**
 * For any order list, put orders with report status is NOT_STARTED on top
 */
export const sortOrderTableData = (data?: IOrderDTO[]): IOrderDTO[] => {
  if (!data) return [];
  /**
   * Divide list into partitions based on report status
   */
  const partitions = partition((a) => a.reportStatus === 'NOT_STARTED', data);
  return [...partitions[0], ...partitions[1]];
};
