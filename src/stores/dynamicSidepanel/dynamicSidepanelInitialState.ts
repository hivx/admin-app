import { USER_MODULE } from '@/types/dto';
import { IDynamicSidePanelReduxState } from '@/types/dynamicSidepanel';

export const dynamicSidebarInitialState: IDynamicSidePanelReduxState = {
  [USER_MODULE.ADMINISTRATION]: [],
  [USER_MODULE.EXAMINATION]: [],
  [USER_MODULE.PUBLICATION]: [],
  [USER_MODULE.REGISTRATION]: [],
  [USER_MODULE.REPORTING]: [],
  [USER_MODULE.STATISTICS]: [],
  [USER_MODULE.SUMMARY]: [],
  [USER_MODULE.TELEMEDICINE]: [],
  [USER_MODULE.TIMETABLE]: [],
  [USER_MODULE.TEMPLATE]: [],
  [USER_MODULE.REPORTING_READING]: [],
};
