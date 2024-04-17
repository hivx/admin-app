import { BaseEntity, Nullable } from '..';

import { IUserDTO } from './user';

export enum UserActivityType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  OPEN_VIEWER = 'OPEN_VIEWER',
}

export type IUserActivityDTOBase = {
  /**
   * Loại hoạt động
   */
  type: string;
  /**
   * Ghi chú
   */
  description: string;
  /**
   * Thời gian hoạt động
   */
  activityTime: string;
  /**
   * Địa chỉ IP
   */
  remoteAddress: string;
  /**
   * Nội dung
   */
  content: string;
  /**
   * Người dùng
   */
  user: IUserDTO;
  uuid: string;
  hospitalID: string;
};

export type IUserActivityDTO = Nullable<IUserActivityDTOBase> & BaseEntity;

export type ISearchUserActivityFilter = Partial<{
  fullname: IUserDTO['fullname'];
  username: IUserDTO['username'];
  type: IUserActivityType['id'];
}>;

export type IUserActivityType = {
  id: `${UserActivityType}`;
  name: `${UserActivityType}`;
};
