import { IOrderRequestDTO, IUserDTO } from '@/types/dto';

type Options = {
  user?: IUserDTO | null;
  request?: IOrderRequestDTO;
};
/**
 * Check if the report is re-approveable (duyệt lại)
 */
export const isReportReApproveAble = (options: Options) => {
  const { user, request } = options;
  if (!user || !request) return false;

  if (request.finalReportID) {
    if (request.finalApprover?.id === user.id) return true;
    if ((user.level ?? 0) > (request.finalApprover?.level ?? 0)) return true;
  }
  return false;
};
