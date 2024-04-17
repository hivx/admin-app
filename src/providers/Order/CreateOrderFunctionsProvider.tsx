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

import { BaseEntity } from '@/types';
import { IPatientDTO, IProcedureDTO } from '@/types/dto';

const noop = () => {};

type AnyFn = (...args: any) => any;
/**
 * This provider only works with Create Order modal , therefore
 * We do NOT allow the register of functions that is NOT DEFINED HERE
 */
type CreateOrderContextFunctions = {
  /**
   * handle create order info
   */
  createOrderInfo: (patientID?: BaseEntity['id']) => void;
  /**
   * handle create request
   */
  createOrderRequest: () => void;
  /**
   * handle create patient info
   */
  createPatientInfo: () => void;
  /**
   * Control set value when add procedure
   * @param selectedOption
   * @returns
   */
  handleSetValue: (selectedOption?: IProcedureDTO) => void;
  /**
   * Edit value when edit procedure
   * @param oldOption
   * @param editOptionID
   * @returns
   */
  handleEditValue: (oldOption?: IProcedureDTO, editOptionID?: BaseEntity['id']) => void;
};

const DEFAULT_FUNCTIONS: CreateOrderContextFunctions = {
  createPatientInfo: noop,
  createOrderInfo: noop,
  createOrderRequest: noop,
  handleEditValue: noop,
  handleSetValue: noop,
};

type PatientInfomationType = IPatientDTO | undefined;

type CreateOrderContextValues = {
  /**
   * Holds all possible orderList report functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  currentPatient: PatientInfomationType;
  setCurrentPatient?: React.Dispatch<React.SetStateAction<PatientInfomationType>>;
  fnRef: MutableRefObject<CreateOrderContextFunctions>;
  registerFn: (name: keyof CreateOrderContextFunctions, fn: AnyFn) => void;
  debug: () => void;
};

const Context = createContext<CreateOrderContextValues>({
  currentPatient: undefined,
  fnRef: {
    current: DEFAULT_FUNCTIONS,
  },
  registerFn: noop,
  debug: noop,
});

type CreateOrderFunctionsProviderProps = {
  children: ReactNode;
};
/**
 * Provides a stable reference for child components to define functions
 * for Create Order modal module
 */
function CreateOrderFunctionsProvider(props: CreateOrderFunctionsProviderProps) {
  const ref = useRef<CreateOrderContextFunctions>(DEFAULT_FUNCTIONS);

  /**
   * Attach the function to the CreateOrderFunctionsProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const functions = useOrderListFunctions();
   * functions.onClick(); // 'clicked'
   */
  const registerFn: CreateOrderContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  /**
   * State lưu bệnh nhân hiện tại theo pid trong form
   */
  const [currentPatient, setCurrentPatient] = useState<PatientInfomationType>();

  const providerValue = useMemo<CreateOrderContextValues>(
    () => ({
      fnRef: ref,
      registerFn,
      currentPatient,
      setCurrentPatient,
      debug: () => {},
    }),
    [currentPatient, registerFn],
  );

  return <Context.Provider value={providerValue} {...props} />;
}

const useCreateOrderContext = () => useContext(Context);
const useCreateOrderFunctions = () => {
  const context = useContext(Context);
  return context.fnRef.current;
};

const useRegisterCreateOrderFunctions = () => {
  const context = useContext(Context);
  return context.registerFn;
};

export {
  CreateOrderFunctionsProvider,
  useCreateOrderContext,
  useCreateOrderFunctions,
  useRegisterCreateOrderFunctions,
};
