import { createApi } from '@reduxjs/toolkit/query/react';

import {
  API_URL_CONN,
  API_URL_PERMIT_ALL,
  API_URL_SECURED,
  API_URL_QMS,
  API_URL_KIOSK,
  API_URL_ANALYSTIC,
  API_URL_CLINICAL,
} from '@/config';

import {
  KIOSK_RESOURCES,
  KQXN_RESOURCES,
  QMS_RESOURCES,
  RESOURCES,
} from './../types/resources';
import { iTechBaseQuery, iTechBaseQueryWithReauth } from './iTechBaseQuery';

export const ADMIN_REDUCER = 'admin';
export const CONN_REDUCER = 'conn';
export const PERMIT_ALL_REDUCER = 'permitAll';
export const QMS_REDUCER = 'qms';
export const KIOSK_REDUCER = 'kiosk';
export const ANALYTICS_REDUCER = 'analytics';
export const CLINICAL_REDUCER = 'clinical';

// Define a service using a base URL and expected endpoints
export const securedApi = createApi({
  reducerPath: ADMIN_REDUCER,
  refetchOnMountOrArgChange: 10,
  baseQuery: iTechBaseQueryWithReauth({ baseUrl: API_URL_SECURED }),
  tagTypes: Object.values(RESOURCES),
  endpoints: () => ({
    // api for each resource will be populated by /features
    // global api endpoints goes here
  }),
});

// his-connector
export const connApi = createApi({
  reducerPath: CONN_REDUCER,
  baseQuery: iTechBaseQueryWithReauth({ baseUrl: API_URL_CONN }),
  endpoints: (builder) => ({
    // api for each resource will be populated by /features
    // global api endpoints goes here
    mockApi: builder.query({
      // do nothing
      query: () => ({
        url: '',
        method: undefined,
      }),
    }),
  }),
});

// permit-all api
export const permitAllApi = createApi({
  reducerPath: PERMIT_ALL_REDUCER,
  baseQuery: iTechBaseQueryWithReauth({ baseUrl: API_URL_PERMIT_ALL }),
  endpoints: (builder) => ({
    // api for each resource will be populated by /features
    // global api endpoints goes here
    mockApi: builder.query({
      // do nothing
      query: () => ({
        url: '',
        method: undefined,
      }),
    }),
  }),
});

export const qmsApi = createApi({
  reducerPath: QMS_REDUCER,
  baseQuery: iTechBaseQuery({ baseUrl: API_URL_QMS }),
  endpoints: (builder) => ({}),
  tagTypes: Object.values(QMS_RESOURCES),
});

export const kioskApi = createApi({
  reducerPath: KIOSK_REDUCER,
  baseQuery: iTechBaseQuery({ baseUrl: API_URL_KIOSK }),
  endpoints: (builder) => ({}),
  tagTypes: Object.values(KIOSK_RESOURCES),
});

// Define a service using a base URL and expected endpoints
export const analyticsApi = createApi({
  reducerPath: ANALYTICS_REDUCER,
  refetchOnMountOrArgChange: 10,
  baseQuery: iTechBaseQueryWithReauth({ baseUrl: API_URL_ANALYSTIC }),
  tagTypes: Object.values(RESOURCES),
  endpoints: () => ({
    // api for each resource will be populated by /features
    // global api endpoints goes here
  }),
});

export const clinicalApi = createApi({
  reducerPath: CLINICAL_REDUCER,
  refetchOnMountOrArgChange: 10,
  baseQuery: iTechBaseQueryWithReauth({ baseUrl: API_URL_CLINICAL }),
  tagTypes: Object.values(KQXN_RESOURCES),
  endpoints: () => ({
    // api for each resource will be populated by /features
    // global api endpoints goes here
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const {} = securedApi;
