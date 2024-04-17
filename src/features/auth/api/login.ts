import { permitAllApi, securedApi } from '@/lib/api';
import { transformResponseGeneric } from '@/lib/dataHelper/apiHelper';
import { IJwtToken } from '@/types/dto';

import { LoginCredentialsDTO } from '../types';

import { IUserDTO } from './../../../types/dto/user';

// Define a service using a base URL and expected endpoints
const loginApiPermitAll = permitAllApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<IJwtToken, LoginCredentialsDTO>({
      query: (credentials: LoginCredentialsDTO) => ({
        url: 'login',
        method: 'POST',
        data: credentials,
        useHospitalID: true,
      }),
    }),
  }),
});

const loginApiSecured = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<IUserDTO, IJwtToken | undefined>({
      /**
       * Get current user information
       * IJwtToken is needed if login in for the first time without accessToken
       */
      query: (token) => ({
        url: `me`,
        method: 'GET',
        useHospitalID: true,
        useAsync: true,
        headers: token && {
          Authorization: `${token.type} ${token.accessToken}`,
        },
      }),
      transformResponse: transformResponseGeneric,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyLoginQuery, useLoginQuery } = loginApiPermitAll;
export const { useLazyGetCurrentUserQuery, useGetCurrentUserQuery } = loginApiSecured;
