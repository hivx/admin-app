import localforage from 'localforage';
// import storage from 'redux-persist/lib/storage';

import { EXAMINATION_DEFAULT_CONFIG } from '@/features/examination';
import { SESSION_RADIOLOGY_CONFIG } from '@/features/order';

import { AUTH_REDUCER } from './auth';
import { DYNAMIC_SIDEBAR_REDUCER } from './dynamicSidepanel/dynamicSidepanelSlice';
import { LAYOUT_REDUCER } from './layoutSlice';
import {
  RADIOLOGY_CONTEXT_REDUCER,
  RADIOLOGY_REPORT_UI_REDUCER,
  UPLOAD_NON_DICOM,
} from './OrderRadiology';
import { AUTO_SELECT_REDUCER } from './qms/autoSelectSlice';
import { INFORSIDE_BAR_REDUCER } from './sideBar/InfoSidebarSlice';
import { MENU_EXPANDED_REDUCER } from './sideBar/menuSlice';
import { STATISTICAL_REPORT_REDUCER } from './statisticalReport/statisticalReportSlice';
import { TABLE_REDUCER } from './table/tableSlice';
import { TAB_REDUCER } from './tabs/tabSlice';
import { THEME_REDUCER } from './themeSlice';

// localForage config
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'CloudPACS',
  storeName: 'redux', // Should be alphanumeric, with underscores.
  description: 'CloudPacs Redux Storage',
});

// define which reducer we want to keep between browser refresh
export const persistConfig = {
  key: 'root',
  version: 1,
  storage: localforage,
  whitelist: [
    AUTH_REDUCER,
    THEME_REDUCER,
    MENU_EXPANDED_REDUCER,
    STATISTICAL_REPORT_REDUCER,
    LAYOUT_REDUCER,
    TAB_REDUCER,
    AUTO_SELECT_REDUCER,
    TABLE_REDUCER,
    RADIOLOGY_CONTEXT_REDUCER,
    RADIOLOGY_REPORT_UI_REDUCER,
    UPLOAD_NON_DICOM,
    DYNAMIC_SIDEBAR_REDUCER,
    SESSION_RADIOLOGY_CONFIG,
    INFORSIDE_BAR_REDUCER,
    EXAMINATION_DEFAULT_CONFIG,
  ],
};
