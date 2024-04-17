import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import axios, { RawAxiosRequestHeaders } from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import urlJoin from 'url-join';

import { APP_NAME, API_URL_PERMIT_ALL } from '@/config';
import { translate } from '@/hooks';
import { NotificationController } from '@/providers/NotificationProvider';
import { clearCredentials, setToken } from '@/stores/auth';
import { KEYS_CONFIG, findOrCreateSessionID } from '@/stores/localStorage';
import { RootState } from '@/stores/redux';
import { IJwtToken } from '@/types/dto';
import { uuidv4 } from '@/utils/uuidv4';

export type BaseQueryArgs = {
  baseUrl: string;
};

export type ItechBaseRequest = {
  /**
   * Main identifying URL to be joined with Base URL + async + optional
   * @Example url = search/order --> final url is BASE_URL + (async) + (hospitalID) + ${url}
   */
  url: string;
  /**
   * HTTP Method
   * @Example: GET, POST, PUT, DELETE
   */
  method: AxiosRequestConfig['method'];
  /**
   * HTTP Request Body
   */
  data?: AxiosRequestConfig['data'];
  /**
   * Will be serialized as Query String and append to the final URL
   * @Example: { userID: 123 } --> ?userID=123
   */
  params?: AxiosRequestConfig['params'];
  /**
   * Add Async keyword to Base URL
   * @Default false
   */
  useAsync?: boolean;
  /**
   * Add HOSPITAL ID from local storage
   * @Default false
   */
  useHospitalID?: boolean;
  /**
   * Additional headers that needs to be merged with base headers
   */
  headers?: RawAxiosRequestHeaders;
} & Partial<AxiosRequestConfig>;

type RequestError = {
  error: {
    status: number | undefined;
    data: Record<string, unknown> | string;
  };
};

const prepareHeaders = (state: RootState): RawAxiosRequestHeaders => ({
  Accept: '*/*',
  Authorization: state.auth.token?.accessToken
    ? `${state.auth.token.type} ${state.auth.token.accessToken}`
    : false,
  ['Corporate-Id']: APP_NAME,
  ['Request-Id']: uuidv4(),
  ['Request-Time']: dayjs().format('YYYY-MM-DDTHH:mm:ssZZ'),
  ['Request-Session-Id']: findOrCreateSessionID(),
});

// https://stackoverflow.com/questions/70789043/rtk-query-interceptor-multiple-requests
/**
 * When access_token is expired and we fires multiple requests at the same time
 * the first request will successfully get the refresh_token, while the subsequent requests
 * will fail to get the refresh_token, resulting in error
 * We use Mutex to ensure that only 1 request at a time is has results before firing another request
 */
const mutex = new Mutex();

export const iTechBaseQuery = (
  args: BaseQueryArgs,
): BaseQueryFn<ItechBaseRequest, unknown, unknown> => {
  const { baseUrl = '' } = args;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (queryArgs, api, _extraOptions) => {
    const {
      url,
      useAsync = false,
      useHospitalID = false,
      headers,
      ...axiosOptions
    } = queryArgs;

    const state = api.getState() as RootState;
    try {
      const hospitalID = localStorage.getItem(KEYS_CONFIG.HOSPITAL_ID);
      /**
       * URL with hospitalID
       */
      const hospitalURL = `hospital/${hospitalID}`;
      const finalUrl = urlJoin(
        baseUrl,
        useAsync ? 'async' : '',
        useHospitalID ? hospitalURL : '',
        url,
      );
      const finalHeaders = { ...prepareHeaders(state), ...headers };
      // perform first query
      const result = await axios({
        url: finalUrl,
        headers: finalHeaders,
        ...axiosOptions,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      throw {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export const iTechBaseQueryWithReauth = (
  args: BaseQueryArgs,
): BaseQueryFn<ItechBaseRequest, unknown, unknown> => {
  const { baseUrl = '' } = args;
  const hospitalID = localStorage.getItem(KEYS_CONFIG.HOSPITAL_ID);
  return async (queryArgs, api, extraOptions) => {
    await mutex.waitForUnlock();
    try {
      const result = await iTechBaseQuery({ baseUrl })(queryArgs, api, extraOptions);
      return result;
    } catch (e) {
      const err = e as RequestError;
      const { error } = err;
      /**
       * Get current refreshToken from localStorage instead of redux store since
       * this one is more up-to-date
       */
      const refreshToken = localStorage.getItem(KEYS_CONFIG.REFRESH_TOKEN);
      if (error.status === StatusCodes.UNAUTHORIZED && refreshToken) {
        if (!mutex.isLocked()) {
          // no other request is making a refresh_token call, safe to call refresh_token
          const release = await mutex.acquire();
          try {
            if (!hospitalID) {
              throw new Error('No hospitalID');
            } else {
              // eslint-disable-next-line no-console
              // Try to use refresh token to get a new access token and retry request
              // get new token
              const tokenResult = await iTechBaseQuery({ baseUrl: API_URL_PERMIT_ALL })(
                {
                  url: `hospital/${hospitalID}/refreshToken`,
                  method: 'POST',
                  data: {
                    refreshToken,
                  },
                },
                api,
                (extraOptions = { skipToken: !hospitalID }),
              );
              const token = tokenResult.data as IJwtToken;

              if (token) {
                api.dispatch(setToken(token));

                // retry query
                const result = await iTechBaseQuery({ baseUrl })(
                  queryArgs,
                  api,
                  extraOptions,
                );
                return result;
              } else {
                // refresh token failed
                throw new Error('Refresh token failed');
              }
            }
          } catch (error) {
            translate &&
              NotificationController.notifyModal({
                message: translate.messages.notification.unauthorized(),
                options: {
                  variant: 'error',
                },
              }),
              api.dispatch(clearCredentials());
          } finally {
            // release the lock
            release();
          }
        } else {
          // there is a request for refresh_token happening, wait for it to finish and then re-fetch again
          await mutex.waitForUnlock();
          // retry query
          try {
            const result = await iTechBaseQuery({ baseUrl })(
              queryArgs,
              api,
              extraOptions,
            );
            return result;
          } catch (e) {
            const err = e as RequestError;
            return err;
          }
        }
      }
      return err;
    }
  };
};
