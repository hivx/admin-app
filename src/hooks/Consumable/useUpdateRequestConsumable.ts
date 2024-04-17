import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  IOrderReportKey,
  selectRadiologyReportConsumables,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { IConsumableUpdateDTO } from '@/types/dto';

import { ConsumableMaterialWithQuantity } from './useGetDataForUpdateConsumableTable';

type UpdateConsumableFuntionCommonProps = {
  consumableData: ConsumableMaterialWithQuantity;
  oldQuantity: number;
  newQuantity: number;
};

/**
 * hook xử lý cập nhật dữ liệu VTTH cho request
 */
export const useUpdateRequestConsumable = ({ requestID, orderID }: IOrderReportKey) => {
  const translate = useTranslate();
  const consumablesFromStore = useAppSelector(
    selectRadiologyReportConsumables({ orderID, requestID }),
  );
  const dispatch = useAppDispatch();

  /**
   * Kiểm tra số lượng VTTH cũ, VTTH hiện tại,
   * để xác định thực hiện các hành động Thêm ,Sửa hay Xóa VTTH
   */
  const onChangeConsumable = ({
    consumableData,
    oldQuantity,
    newQuantity,
  }: UpdateConsumableFuntionCommonProps) => {
    if (newQuantity === 0) {
      deleteConsumable(consumableData.id);
      return;
    }
    if (oldQuantity === 0 && newQuantity > 0) {
      createConsumable({ consumableData, oldQuantity, newQuantity });
      return;
    }
    if (oldQuantity > 0 && newQuantity === 0) {
      deleteConsumable(consumableData.materialID);
      return;
    }
    updateConsumable({ consumableData, oldQuantity, newQuantity });
  };

  /**
   * Thêm mới VTTH cho request
   */
  const createConsumable = async ({
    consumableData,
    newQuantity,
    oldQuantity,
  }: UpdateConsumableFuntionCommonProps) => {
    const consumableID = consumableData.consumableID ?? 0;

    const newConsumable: IConsumableUpdateDTO = {
      error: false,
      id: consumableID,
      materialID: consumableData.materialID,
      quantity: newQuantity,
    };

    const newConsumables = consumablesFromStore
      ? [
          ...consumablesFromStore.filter(
            (item) => item.materialID !== consumableData.materialID,
          ),
          newConsumable,
        ]
      : [newConsumable];

    dispatch(
      setRadiologyReportSubmissionData({
        consumables: newConsumables,
        orderID,
        requestID,
      }),
    );
    // const createData: IConsumableCreateDTO = [
    //   { materialID: consumableData.id, requestID, quantity: newQuantity, error: false },
    // ];
    // try {
    //   const res = await triggerCreate(createData);
    //   if ('error' in res) {
    //     notifyError();
    //   } else {
    //     notifySuccess();
    //   }
    // } catch (e) {
    //   notifyError();
    // }
  };

  /**
   * Xóa VTTH khỏi request
   */
  const deleteConsumable = (materialID: number | null) => {
    if (!materialID) {
      return;
    }
    const newConsumables = consumablesFromStore
      ? consumablesFromStore.filter((item) => item.id !== materialID)
      : undefined;
    dispatch(
      setRadiologyReportSubmissionData({
        consumables: newConsumables,
        orderID,
        requestID,
      }),
    );

    // if (consumableID) {
    //   try {
    //     const res = triggerDelete({ id: consumableID });
    //     if ('error' in res) {
    //       notifyError();
    //     } else {
    //       notifySuccess();
    //     }
    //   } catch (e) {
    //     notifyError();
    //   }
    // }
  };

  /**
   * Cập nhật số lượng VTTH cho request
   */
  const updateConsumable = async ({
    consumableData,
    newQuantity,
    oldQuantity,
  }: UpdateConsumableFuntionCommonProps) => {
    const consumableID = consumableData.consumableID ?? 0;

    const newConsumable: IConsumableUpdateDTO = {
      error: false,
      id: consumableID,
      materialID: consumableData.materialID,
      quantity: newQuantity,
    };

    const newConsumables = consumablesFromStore
      ? [
          ...consumablesFromStore.filter(
            (item) => item.materialID !== consumableData.materialID,
          ),
          newConsumable,
        ]
      : [newConsumable];

    dispatch(
      setRadiologyReportSubmissionData({
        consumables: newConsumables,
        orderID,
        requestID,
      }),
    );
    // if (consumableData.consumableID) {
    //   const updateData: IConsumableUpdateDTO[] = [
    //     {
    //       materialID: consumableData.id,
    //       quantity: newQuantity,
    //       error: false,
    //       id: consumableData.consumableID,
    //     },
    //   ];
    // try {
    //   const res = await triggerUpdate(updateData);
    //   if ('error' in res) {
    //     notifyError();
    //   } else {
    //     notifySuccess();
    //   }
    // } catch (e) {
    //   notifyError();
    // }
    // }
  };

  return onChangeConsumable;
};
