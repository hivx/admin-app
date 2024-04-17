import { IOrderDTO, IProcedureDTO } from '@/types/dto';

/**
 * Hiển thị BHYT với dịch vụ yêu cầu bhyt
 */
export const getDisplayProcedureName = (
  insuranceApplied: IOrderDTO['insuranceApplied'],
  procedureName: IProcedureDTO['name'],
) => {
  return insuranceApplied ? `BHYT - ${procedureName}` : procedureName;
};
