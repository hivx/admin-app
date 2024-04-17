import { IOrderDTO } from '@/types/dto';
import { partition } from '@/utils/partition';

/**
 * For any order list, put orders with report status is APPROVED on top
 */
export const sortOrderResultTableData = (data?: IOrderDTO[]): IOrderDTO[] => {
  if (!data) return [];
  /**
   * Divide list into partitions based on report status
   */
  const partitions = partition((a) => a.reportStatus === 'APPROVED', data);

  return [...partitions[0], ...partitions[1]];
};
