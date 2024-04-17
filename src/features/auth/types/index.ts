import { Nullable } from '@/types';
import { IJwtToken, IUserDTO } from '@/types/dto';

export type AuthState = {
  user: IUserDTO | null;
  token: Nullable<IJwtToken> | null;
};

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};
