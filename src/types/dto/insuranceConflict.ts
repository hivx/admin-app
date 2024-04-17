import { BaseEntity } from '..';

export type IInsuranceConflictDTO = {
  approvedModalityID?: BaseEntity['id'];
  approverID?: BaseEntity['id'];
  requestID: BaseEntity['id'];
  operationTime: string;
  approvedTime: string;
  orderID: BaseEntity['id'];
  operatorIDs?: BaseEntity['id'][];
};
