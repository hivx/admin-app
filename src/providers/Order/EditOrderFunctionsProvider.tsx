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

import { BaseEntity } from '@/types';

const noop = () => {};

type AnyFn = (...args: any) => any;
/**
 * This provider only works with Create Order modal , therefore
 * We do NOT allow the register of functions that is NOT DEFINED HERE
 */
type EditOrderContextFunctions = {
  /**
   * handle edit order info
   */
  editOrderInfo: (patientID?: BaseEntity['id']) => void;
  /**
   * handle edit order request
   */
  editOrderRequest: () => void;
  /**
   * handle edit patient info
   */
  editPatientInfo: () => void;
  /**
   * update patientID for order
   */
  changeOrderPatient: (patientID?: BaseEntity['id']) => void;
};

const DEFAULT_FUNCTIONS: EditOrderContextFunctions = {
  editPatientInfo: noop,
  editOrderRequest: noop,
  editOrderInfo: noop,
  changeOrderPatient: noop,
};

type EditOrderContextValues = {
  /**
   * Holds all possible orderList report functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  fnRef: MutableRefObject<EditOrderContextFunctions>;
  registerFn: (name: keyof EditOrderContextFunctions, fn: AnyFn) => void;
  debug: () => void;
};

const Context = createContext<EditOrderContextValues>({
  fnRef: {
    current: DEFAULT_FUNCTIONS,
  },
  registerFn: noop,
  debug: noop,
});

type EditOrderFunctionsProviderProps = {
  children: ReactNode;
};
/**
 * Provides a stable reference for child components to define functions
 * for Edit Order modal module
 */
function EditOrderFunctionsProvider(props: EditOrderFunctionsProviderProps) {
  const ref = useRef<EditOrderContextFunctions>(DEFAULT_FUNCTIONS);

  /**
   * Attach the function to the EditOrderFunctionsProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const functions = useOrderListFunctions();
   * functions.onClick(); // 'clicked'
   */
  const registerFn: EditOrderContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  const providerValue = useMemo<EditOrderContextValues>(
    () => ({
      fnRef: ref,
      registerFn,
      debug: () => {},
    }),
    [registerFn],
  );

  return <Context.Provider value={providerValue} {...props} />;
}

const useEditOrderContext = () => useContext(Context);
const useEditOrderFunctions = () => {
  const context = useContext(Context);
  return context.fnRef.current;
};

const useRegisterEditOrderFunctions = () => {
  const context = useContext(Context);
  return context.registerFn;
};

export {
  EditOrderFunctionsProvider,
  useEditOrderContext,
  useEditOrderFunctions,
  useRegisterEditOrderFunctions,
};
