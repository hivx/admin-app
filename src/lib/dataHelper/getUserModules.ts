import { IUserDTO } from '@/types/dto';
import { IModuleDTOBase } from '@/types/dto/module';

export type UserInfomationType = Pick<IModuleDTOBase, 'name' | 'index'> & {
  id: number;
};

export const getUserModules = ({ user }: { user: IUserDTO | null }) => {
  const userModulesInfomation: UserInfomationType[] = [];
  if (!user) return undefined;

  /**
   * Add object with {name,index,id} to userModulesInfomation
   */
  user.groups?.forEach((group) => {
    if (group.modules) {
      group.modules.forEach((module) => {
        if (module.index !== null && module.name)
          userModulesInfomation.push({
            index: module.index,
            name: module.name,
            id: module.id,
          });
      });
    }
  });

  /**
   * sort userModulesInfomation by index
   */
  userModulesInfomation.sort((a, b) => a.index - b.index);

  /**
   * Remove duplicate module
   */
  const userModules = [...new Set(userModulesInfomation.map((item) => item.name))];

  return { userModules, userModulesInfomation };
};
