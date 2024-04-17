import { BaseEntity } from '@/types';

import { IExtensionDTO } from './extension';
import { USER_MODULE } from './user';

export type IModuleExtensionDTOBase = {
  activeOnInit: boolean;

  config: string | null;

  extension: IExtensionDTO;

  extensionID: number;

  hospitalID: string;

  index: number;

  moduleID: string;

  uuid: string;
};

/**
 * Guaranteed to not be nullable
 */
export type IModuleExtensionDTO = IModuleExtensionDTOBase & BaseEntity;
export type IModuleExtensionDTOSearch = Partial<{
  extensionIDs: BaseEntity['id'][];
  ids: BaseEntity['id'][];
  moduleIDs: BaseEntity['id'][];
}> & { module: USER_MODULE };
