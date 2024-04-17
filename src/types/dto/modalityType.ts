import { BaseEntity, Nullable, Voidable } from '..';

import type { IModalityDTO } from './modality';

export type IModalityTypeDTOBase = {
  hospitalID: string;
  uuid: string;
  /**
   * Tên loại
   */
  name: string;
  /**
   * Tên khác
   */
  otherNames: string[];
  /**
   * Máy mặc định
   */
  preferredModality: IModalityDTO;

  /**
   * Yêu cầu ảnh DICOM
   */
  requireDicom: boolean;
  /**
   * Cấu hình
   */
  config: string;
  attributes: Record<string, string | undefined>;
};
export type IModalityTypeDTO = Nullable<IModalityTypeDTOBase> & BaseEntity & Voidable;

export type IModalityTypeCreateDTO = Pick<IModalityTypeDTO, 'name'> &
  Partial<
    Pick<IModalityTypeDTO, 'otherNames' | 'requireDicom' | 'config' | 'attributes'>
  > & {
    preferredModalityID?: number;
    preferredProcedureID?: number;
  };
export type IModalityTypeDTOFilter = Partial<Pick<IModalityTypeDTOBase, 'name'>>;
export type IModalityTypeUpdateDTO = BaseEntity & Partial<IModalityTypeCreateDTO>;
export type IModalityTypeDTODelete = BaseEntity;

export const ModalityTypeRequiredConsumables = ['DX', 'DR', 'CT'];
