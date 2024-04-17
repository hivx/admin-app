import { IOrderDTO, IOrderRequestDTO, IOrderRequestDTOCreate } from '@/types/dto';

/**
 * Func được dùng src/components/Order/StudyInfo/AddRequestForm.tsx
 * Khi thêm mới 1 request sẽ trường 'Mã yêu cầu' sẽ lấy theo trường 'Mã chỉ định'
 * Tự động thêm _xxx(số tăng dần) NẾU số lượng request >= 1
 * @param baseValue
 * @param requests
 * @returns string
 */
export const transformSelfIncrementingValueWithRequests = (
  baseValue?: IOrderDTO['accessionNumber'],
  requests?: IOrderRequestDTO[] | IOrderRequestDTOCreate[],
) => {
  if (!baseValue) '';
  return requests && `${baseValue}${requests.length >= 1 ? `_${requests.length}` : ''}`;
};
