import { useGetListModalityQuery } from '@/api/modality';
import { IProcedureDTO, IUserDTO } from '@/types/dto';

import { useGetListRoleQuery } from '../api/role';
import { useGetListUserGroupQuery } from '../api/userGroup';

type UseProcedureFormOptions = {
  record?: IUserDTO;
};

export const useUserForm = (props?: UseProcedureFormOptions) => {
  const { record } = props || {};

  const { data: userGroupData } = useGetListUserGroupQuery({
    filter: {},
  });

  const { data: roleData } = useGetListRoleQuery({ filter: {} });

  const { data: modalityData } = useGetListModalityQuery({ filter: {} });

  return {
    modalityData,
    roleData,
    userGroupData,
  };
};
