import type { Translation } from './../i18n-types';
import bookmark from './bookmark';
import buttons from './buttons';
import common from './common';
import date from './date';
import kiosk from './kiosk';
import messages from './messages';
import orderListForm from './orderListForm';
import pages from './pages';
import resources from './resources';
import studyInfo from './studyInfo';
import tab from './tab';
import tooltip from './tooltip';

const en: Translation = {
  buttons,
  messages,
  resources,
  pages,
  orderListForm,
  studyInfo,
  bookmark,
  notifications: {},
  tooltip,
  kiosk,
  tab,
  date,
  common,
};

export default en;
