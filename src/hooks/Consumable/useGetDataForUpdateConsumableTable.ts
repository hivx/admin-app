import { useGetListConsumableMaterialQuery } from '@/api/consumableMaterial';
import {
  IConsumableDTO,
  IConsumableMaterialDTO,
  IModalityTypeDTO,
  IOrderRequestDTO,
} from '@/types/dto';

export type ConsumableMaterialWithQuantity = IConsumableMaterialDTO &
  Pick<IConsumableDTO, 'quantity' | 'materialID'> & { consumableID?: number };

/**
 * hook xử lý để lấy dữ liệu hiển thị trong bảng Cập nhật VTTH
 */
export const useGetDataForUpdateConsumableTable = ({
  request,
  modalityType,
}: {
  request?: IOrderRequestDTO;
  modalityType: IModalityTypeDTO['name'];
}) => {
  const { data: consumableMaterialData, isLoading: isLoadingConsumableMaterial } =
    useGetListConsumableMaterialQuery(
      {
        filter: { modalityType: modalityType ?? undefined },
      },
      { skip: !modalityType },
    );

  /**
   * Danh sách  loại VTTH
   */
  const consumableMaterials = consumableMaterialData?.list ?? [];

  /**
   * Danh sách VTTH của dịch vụ chụp
   */
  const consumables =
    request?.consumables &&
    request?.consumables?.length === 0 &&
    request?.procedure?.consumables
      ? request?.procedure?.consumables
      : request?.consumables ?? [];

  // const consumables = request?.consumables ?? [];
  const dataForTable: ConsumableMaterialWithQuantity[] = consumableMaterials.map(
    (consumableMaterial) => {
      let quantity = 0;
      let consumableID: ConsumableMaterialWithQuantity['consumableID'] = undefined;
      const materialID = consumableMaterial.id;
      let id = 0;
      consumables.forEach((consumable) => {
        if (consumable.materialID === consumableMaterial.id) {
          quantity = consumable.quantity ?? 0;
          consumableID = consumable.id;
          id = consumable.id ?? 0;
        }
      });
      return { ...consumableMaterial, consumableID, quantity, materialID, id };
    },
  );

  return { isLoading: isLoadingConsumableMaterial, dataForTable };
};
