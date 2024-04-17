import { BaseEntity, Nullable, Voidable } from '@/types';

export type ICertificateDTOBase = {
  hospitalID: string;
  uuid: string;
  /**
   * Mã tài khoản
   *
   */
  account: string;
  /**
   * Tên chủ chữ ký số
   */
  name: string;
  /**
   * Nhà cung cấp
   */
  provider: string;
  /**
   * Mã pin
   */
  maskedSecret: string;
  /**
   * Cấu hình
   */
  config: string;
};

export type ICertificateDTO = Nullable<ICertificateDTOBase> & BaseEntity & Voidable;

export type ICertificateFilter = Partial<Pick<ICertificateDTO, 'name' | 'account'>>;

export type ICertificateDTOCreate = Partial<
  Pick<ICertificateDTO, 'account' | 'name' | 'config' | 'provider'>
> & { secret: string };

export type ICertificateDTOUpdate = BaseEntity & ICertificateDTOCreate;

export type ICertificateDTODelete = BaseEntity;
