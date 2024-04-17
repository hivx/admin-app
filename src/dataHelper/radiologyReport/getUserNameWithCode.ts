import { ICloudUserDTO } from '@/types/dto';

export const getUserNameWithCode = (user?: ICloudUserDTO) => {
  if (user?.code && user.fullname) {
    return `${user?.fullname} (${user?.code})`;
  }
  return '';
};
