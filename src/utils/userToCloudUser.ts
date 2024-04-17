import { ICloudUserDTO, IUserDTO } from '@/types/dto';

/**
 * Convert a user object to Cloud User object
 * We can do this since Cloud User is a subset of User
 */
export const userToCloudUser = (user: IUserDTO): ICloudUserDTO => {
  return {
    code: user.code,
    fullname: user.fullname,
    hospitalID: user.hospitalID,
    level: user.level,
    roles: user.roles,
    title: user.title,
    type: user.type,
    username: user.username,
    uuid: user.uuid,
    id: user.id,
  };
};
