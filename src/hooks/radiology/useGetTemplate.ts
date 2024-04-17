import { useCallback } from 'react';

import { useLazyGetListLayoutQuery } from '@/api/layout';
import { useGetOneOrderQuery } from '@/api/order';
import { useAppSelector } from '@/hooks';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { ILayoutDTO } from '@/types/dto';

/**
 * hook trả ra hàm lấy layout,danh sách layout
 */
export const useGetTemplate = (currentOrderID: BaseEntity['id']) => {
  const currentRequestID = useAppSelector(selectCurrentRequestID(currentOrderID));
  const { data: currentOrder } = useGetOneOrderQuery({ id: currentOrderID });
  const [triggerGetLayoutRelevant] = useLazyGetListLayoutQuery();

  const currentRequest = currentOrder?.requests?.find(
    (request) => request.id === currentRequestID,
  );

  const procedureID = currentRequest?.procedure?.id;
  const departmentID = currentOrder?.requestedDepartment?.id;
  const modalityType = currentOrder?.modalityType;

  const getTemplates = useCallback(async () => {
    const templates = await triggerGetLayoutRelevant(
      {
        filter: {
          departmentID,
          modalityType,
        },
      },
      true,
    ).unwrap();
    return templates.list;
  }, [triggerGetLayoutRelevant, departmentID, modalityType]);

  /**
   * Get layout template relevant by procedureID, departmentID, modalityType,
   */
  const getTemplate = useCallback(async () => {
    const templates = await getTemplates();
    let template: ILayoutDTO = templates[0];
    if (procedureID) {
      templates.forEach((item) => {
        if (item.procedures?.map((procedure) => procedure.id).includes(procedureID)) {
          template = item;
        }
      });
    }
    return template;
  }, [getTemplates, procedureID]);

  return { getTemplate, getTemplates };
};
