import React from 'react';
import { AppProvider } from '../src/providers/app';
import { setupStore } from '../src/stores/redux';
import { MOCK_SYSADMIN_USER, MOCK_TOKEN } from '../src/test/mock-data-stable';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};

const testStore = setupStore({
  auth: {
    token: MOCK_TOKEN,
    user: MOCK_SYSADMIN_USER,
  },
});

export const decorators = [
  (Story) => (
    <AppProvider store={testStore}>
      <Story />
    </AppProvider>
  ),
];
