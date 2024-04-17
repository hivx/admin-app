import { BaseEntity } from '..';

export type TransferStudyDTO = {
  orderID: BaseEntity['id'];
  storeID: BaseEntity['id'];
};
