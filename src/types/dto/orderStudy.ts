import { IOrderDTO } from './order';
import { IStudyDTO } from './study';

export type IOrderStudyDTOUpdate = {
  orderID: IOrderDTO['id'];
  studyID: IStudyDTO['id'];
};
