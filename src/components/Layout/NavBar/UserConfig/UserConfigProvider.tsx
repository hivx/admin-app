/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LiteralUnion } from 'type-fest';

import { UserConfigTab } from './temp';

const noop = () => {};

type AnyFn = (...args: any) => any;
type PredefinedUserConfigFunctions = {
  /**
   * Pre-defined functions
   */
  submitUserConfigForm: AnyFn;
};
type UserConfigFunctions = PredefinedUserConfigFunctions & Record<string, AnyFn>; // or any functions

const USER_CONFIG_FUNCTIONS_DEFAULT: UserConfigFunctions = {
  submitUserConfigForm: noop,
};

type AdminContextValues = {
  /**
   * Holds all possible admin functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  fnRef: MutableRefObject<UserConfigFunctions>;
  registerFn: (
    name: LiteralUnion<keyof PredefinedUserConfigFunctions, string>,
    fn: AnyFn,
  ) => void;
  currentTab: UserConfigTab;
  setCurrentTab: React.Dispatch<React.SetStateAction<UserConfigTab>>;
};

const AdminContext = createContext<AdminContextValues>({
  fnRef: {
    current: USER_CONFIG_FUNCTIONS_DEFAULT,
  },
  registerFn: noop,
  currentTab: UserConfigTab.CommonConfig,
  setCurrentTab: () => {},
});

/**
 * Provides a stable reference for child components to define functions
 * for parent component to execute
 */
function UserConfigProvider(props: { children: ReactNode }) {
  const ref = useRef<UserConfigFunctions>(USER_CONFIG_FUNCTIONS_DEFAULT);
  const [currentTab, setCurrentTab] = useState<UserConfigTab>(UserConfigTab.CommonConfig);

  /**
   * Attach the function to the AdminProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const UserConfigFunctions = useUserConfigFunctions();
   * UserConfigFunctions.onClick(); // 'clicked'
   */
  const registerFn: AdminContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  const providerValue = useMemo(
    () => ({
      fnRef: ref,
      registerFn,
      currentTab,
      setCurrentTab,
    }),
    [currentTab, registerFn],
  );

  return <AdminContext.Provider value={providerValue} {...props} />;
}

const useUserConfigContext = () => useContext(AdminContext);
const useUserConfigFunctions = () => {
  const context = useContext(AdminContext);
  return context.fnRef.current;
};

const useRegisterUserConfigFunctions = () => {
  const context = useContext(AdminContext);
  return context.registerFn;
};

export {
  UserConfigProvider,
  useUserConfigContext,
  useUserConfigFunctions,
  useRegisterUserConfigFunctions,
};
