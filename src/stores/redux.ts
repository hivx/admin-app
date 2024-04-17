import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
  PreloadedState,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistStore from 'redux-persist/lib/persistStore';

import {
  EXAMINATION_DEFAULT_CONFIG,
  examinationDefaultConfigReducer,
} from '@/features/examination';
import {
  PATIENT_HISTORY,
  patientHistoryReducer,
  SESSION_RADIOLOGY_CONFIG,
  sessionRadiologyReducer,
} from '@/features/order';
import {
  connApi,
  permitAllApi,
  securedApi,
  qmsApi,
  kioskApi,
  analyticsApi,
  clinicalApi,
} from '@/lib/api';
import { tableReducer, TABLE_REDUCER } from '@/stores/table/tableSlice';

import {
  KIOSK_TICKET_INFOMATION_REDUCER,
  kioskTicketInfomationReducer,
} from '../features/kiosk/stores/kioskTicketInfomationSlice';
import {
  QMS_TICKET_INFOMATION_REDUCER,
  ticketInfomationReducer,
} from '../features/qms/stores';
import {
  CURRENT_PERIOD_ID_REDUCER,
  currentPeriodIdReducer,
} from '../features/timeTable/stores/currentPeriodIdSlice';

import {
  ACTION_CLEAR_CREDENTIALS,
  authReducer,
  AUTH_REDUCER,
  myAuthMiddleware,
} from './auth';
import { BOOKMARK_REDUCER, bookmarkReducer } from './bookmark/bookmarkSlice';
import { CONTEXT_MENU_REDUCER, contextMenuReducer } from './contextMenu/contextMenuSlice';
import {
  dynamicSidepanelReducer,
  DYNAMIC_SIDEBAR_REDUCER,
} from './dynamicSidepanel/dynamicSidepanelSlice';
import {
  CREATE_ORDER_REDUCER,
  createOrderReducer,
} from './examinnation/createOrderSlice';
import { layoutReducer, LAYOUT_REDUCER } from './layoutSlice';
import {
  radiologyContextMiddleware,
  radiologyButtonsReducer,
  radiologyContextReducer,
  RADIOLOGY_REPORT_UI_REDUCER,
  RADIOLOGY_CONTEXT_REDUCER,
  uploadNonDicomReducer,
  UPLOAD_NON_DICOM,
} from './OrderRadiology';
import {
  ORDER_LAYOUT_REDUCER,
  orderLayoutReducer,
} from './OrderRadiology/orderLayoutSlice';
import { orderPanelReducer, ORDER_PANEL_REDUCER } from './OrderRadiology/orderPanelSlice';
import { persistConfig } from './persist';
import { autoSelectReducer, AUTO_SELECT_REDUCER } from './qms/autoSelectSlice';
import { QMS_SELECT_MODALITY, selectModalityReducer } from './qms/selectModalitySlice';
import { INFORSIDE_BAR_REDUCER, infoSidebarReducer } from './sideBar/InfoSidebarSlice';
import { menuExpandedReducer, MENU_EXPANDED_REDUCER } from './sideBar/menuSlice';
import {
  STATISTICAL_REPORT_REDUCER,
  statisticalReportReducer,
} from './statisticalReport/statisticalReportSlice';
import { tabReducer, TAB_REDUCER } from './tabs/tabSlice';
import { themeReducer, THEME_REDUCER } from './themeSlice';

const rootReducers = combineReducers({
  // custom reducer goes here
  [AUTH_REDUCER]: authReducer,
  [THEME_REDUCER]: themeReducer,
  [MENU_EXPANDED_REDUCER]: menuExpandedReducer,
  [TABLE_REDUCER]: tableReducer,
  [CONTEXT_MENU_REDUCER]: contextMenuReducer,
  [LAYOUT_REDUCER]: layoutReducer,
  [TAB_REDUCER]: tabReducer,
  [AUTO_SELECT_REDUCER]: autoSelectReducer,
  [DYNAMIC_SIDEBAR_REDUCER]: dynamicSidepanelReducer,
  [QMS_TICKET_INFOMATION_REDUCER]: ticketInfomationReducer,
  [KIOSK_TICKET_INFOMATION_REDUCER]: kioskTicketInfomationReducer,
  [CREATE_ORDER_REDUCER]: createOrderReducer,
  [BOOKMARK_REDUCER]: bookmarkReducer,
  [STATISTICAL_REPORT_REDUCER]: statisticalReportReducer,
  [INFORSIDE_BAR_REDUCER]: infoSidebarReducer,
  // radiology report
  [RADIOLOGY_CONTEXT_REDUCER]: radiologyContextReducer,
  [RADIOLOGY_REPORT_UI_REDUCER]: radiologyButtonsReducer,
  [QMS_SELECT_MODALITY]: selectModalityReducer,
  [ORDER_PANEL_REDUCER]: orderPanelReducer,
  // upload non dicom
  [UPLOAD_NON_DICOM]: uploadNonDicomReducer,
  // API data cache goes here
  [connApi.reducerPath]: connApi.reducer,
  [permitAllApi.reducerPath]: permitAllApi.reducer,
  [securedApi.reducerPath]: securedApi.reducer,
  [qmsApi.reducerPath]: qmsApi.reducer,
  [kioskApi.reducerPath]: kioskApi.reducer,
  [clinicalApi.reducerPath]: clinicalApi.reducer,
  [analyticsApi.reducerPath]: analyticsApi.reducer,
  [CURRENT_PERIOD_ID_REDUCER]: currentPeriodIdReducer,
  [SESSION_RADIOLOGY_CONFIG]: sessionRadiologyReducer,
  [PATIENT_HISTORY]: patientHistoryReducer,
  [EXAMINATION_DEFAULT_CONFIG]: examinationDefaultConfigReducer,
  [ORDER_LAYOUT_REDUCER]: orderLayoutReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

/**
 * Clear redux store on logout
 */
const persistedReducerWithClearOnLogout: ConfigureStoreOptions['reducer'] = (
  state,
  action,
) => {
  // Clear redux store on logout but not clear examinationDefaultConfig
  if (action.type === `${AUTH_REDUCER}/${ACTION_CLEAR_CREDENTIALS}`) {
    const examinationDefaultConfig = state[EXAMINATION_DEFAULT_CONFIG];
    state = undefined;
    return persistedReducer({ ...state, examinationDefaultConfig }, action);
  }
  return persistedReducer(state, action);
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: persistedReducerWithClearOnLogout,
    middleware: (getDefaulMiddleware) =>
      getDefaulMiddleware({
        serializableCheck: {
          ignoredActions: [
            // for redux-persist
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
            'admin/executeQuery/fulfilled', // we need to store PDF in cache in our convertPDF endpoint
          ],
          ignoredActionPaths: ['payload.callbackSuccess'],
          ignoredPaths: ['admin.queries'], // we need to store PDF in cache in our convertPDF endpoint
        },
      })
        .prepend(myAuthMiddleware.middleware, radiologyContextMiddleware.middleware)
        .concat(
          connApi.middleware,
          permitAllApi.middleware,
          securedApi.middleware,
          qmsApi.middleware,
          kioskApi.middleware,
          analyticsApi.middleware,
          clinicalApi.middleware,
        ),
    preloadedState,
  });

export const store = setupStore({});
// Persistor
export let persistor = persistStore(store);
export const initializePersistor = () => {
  persistor = persistStore(store);
  return persistor;
};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
