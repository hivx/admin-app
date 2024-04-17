// For simple reducer, we can include getters here

import { USER_MODULE } from '@/types/dto';

import { RootState } from '../redux';

// New naming convention: https://redux.js.org/style-guide/#name-selector-functions-as-selectthing
export const selectSidepanels = (page: USER_MODULE) => (state: RootState) =>
  state.dynamicSidebar[page];
