import { BaseEntity, IGenericFilter, Nullable } from '@/types';

export type IModalityRoomDTOBase = {
  hospitalID: string;
  uuid: string;
  /**
   * Mã phòng
   */
  code: string;
  /**
   * Mô tả
   */
  description: string;
  /**
   * Tên phòng
   */
  name: string;
};

export type IModalityRoomDTO = Nullable<IModalityRoomDTOBase> & BaseEntity;

export type ISearchModalityRoomFilter = IGenericFilter;

export type IModalityRoomDTOCreate = Partial<Pick<IModalityRoomDTOBase, 'description'>> &
  Pick<IModalityRoomDTO, 'name' | 'code'>;

export type IModalityRoomDTOUpdate = BaseEntity &
  Partial<Pick<IModalityRoomDTOBase, 'description' | 'name' | 'code'>>;

export type IModalityRoomDTODelete = BaseEntity;
