/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { LiteralUnion } from 'type-fest';

const noop = () => {};

type AnyFn = (...args: any) => any;
type PredefinedAdminFunctions = {
  /**
   * Pre-defined functions
   */
  openCreateModal: AnyFn;
  openEditModal: AnyFn;
  submitCreateForm: AnyFn;
  submitEditForm: AnyFn;
  submitDelete: AnyFn;
};
type AdminFunctions = PredefinedAdminFunctions & Record<string, AnyFn>; // or any functions

const ADMIN_FUNCTIONS_DEFAULT: AdminFunctions = {
  openCreateModal: noop,
  openEditModal: noop,
  submitCreateForm: noop,
  submitEditForm: noop,
  submitDelete: noop,
};

type AdminContextValues = {
  /**
   * Holds all possible admin functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  fnRef: MutableRefObject<AdminFunctions>;
  registerFn: (
    name: LiteralUnion<keyof PredefinedAdminFunctions, string>,
    fn: AnyFn,
  ) => void;
  debug: () => void;
};

const AdminContext = createContext<AdminContextValues>({
  fnRef: {
    current: ADMIN_FUNCTIONS_DEFAULT,
  },
  registerFn: noop,
  debug: noop,
});

/**
 * Provides a stable reference for child components to define functions
 * for parent component to execute
 */
function AdminProvider(props: { children: ReactNode }) {
  const ref = useRef<AdminFunctions>(ADMIN_FUNCTIONS_DEFAULT);

  /**
   * Attach the function to the AdminProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const adminFunctions = useAdminFunctions();
   * adminFunctions.onClick(); // 'clicked'
   */
  const registerFn: AdminContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  const providerValue = useMemo(
    () => ({
      fnRef: ref,
      registerFn,
      debug: () => {},
    }),
    [registerFn],
  );

  return <AdminContext.Provider value={providerValue} {...props} />;
}

const useAdminContext = () => useContext(AdminContext);
const useAdminFunctions = () => {
  const context = useContext(AdminContext);
  return context.fnRef.current;
};

const useRegisterAdminFunctions = () => {
  const context = useContext(AdminContext);
  return context.registerFn;
};

export { AdminProvider, useAdminContext, useAdminFunctions, useRegisterAdminFunctions };
