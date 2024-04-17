/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnhancedStore, PreloadedState } from '@reduxjs/toolkit';
import {
  render as rtlRender,
  renderHook,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PropsWithChildren } from 'react';

import '@testing-library/jest-dom';
import { AppProvider } from '@/providers/app';
import { RootState, setupStore } from '@/stores/redux';

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
    { timeout: 4000 },
  );

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

const defaultReduxState: PreloadedState<RootState> = {};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = defaultReduxState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <AppProvider store={store}>{children}</AppProvider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders(hookFunc: (initialProps: unknown) => unknown) {
  const store = setupStore({});
  function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
    return <AppProvider store={store}>{children}</AppProvider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...renderHook(hookFunc, { wrapper: Wrapper }) };
}

// eslint-disable-next-line import/export
export * from '@testing-library/react';
export { userEvent, rtlRender };
