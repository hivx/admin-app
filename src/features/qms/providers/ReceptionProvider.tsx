import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { LiteralUnion } from 'type-fest';

import { NavBarFilterForm } from '../components/Reception/NavBarFilterForm';

const noop = () => {};

type AnyFn = (...args: unknown[]) => unknown;

type PredefinedReceptionFunctions = {
  /**
   * Pre-defined functions
   */
  submitFormAutoSelectModality: AnyFn;
  submitTicketInfomationForm: AnyFn;
  openAutoSelectModalityModal: AnyFn;
  closeAutoSelectModalityModal: AnyFn;
  autoFocusPID: AnyFn;
  clearPID: AnyFn;
};

type ReceptionFunctions = PredefinedReceptionFunctions & Record<string, AnyFn>; // or any functions

const RECEPTION_FUNCTIONS_DEFAULT: ReceptionFunctions = {
  submitFormAutoSelectModality: noop,
  submitTicketInfomationForm: noop,
  openAutoSelectModalityModal: noop,
  closeAutoSelectModalityModal: noop,
  autoFocusPID: noop,
  clearPID: noop,
};

type ReceptionContextValues = {
  filter: NavBarFilterForm;
  setFilter?: React.Dispatch<React.SetStateAction<NavBarFilterForm>>;

  registerFn: (
    name: LiteralUnion<keyof PredefinedReceptionFunctions, string>,
    fn: AnyFn,
  ) => void;
  fnRef: MutableRefObject<ReceptionFunctions>;
};

export const ReceptionContext = createContext<ReceptionContextValues>({
  filter: {},
  registerFn: noop,

  fnRef: {
    current: RECEPTION_FUNCTIONS_DEFAULT,
  },
});

export const useGlobalContext = () => useContext(ReceptionContext);

export function ReceptionProvider(props: { children: ReactNode }) {
  const ref = useRef<ReceptionFunctions>(RECEPTION_FUNCTIONS_DEFAULT);

  const [filter, setFilter] = useState<NavBarFilterForm>({});

  const registerFn: ReceptionContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  return (
    <ReceptionContext.Provider
      value={{
        filter,
        setFilter,
        registerFn,
        fnRef: ref,
      }}
      {...props}
    />
  );
}

export const useReceptionFunctions = () => {
  const context = useContext(ReceptionContext);
  return context.fnRef.current;
};

export const useRegisterReceptionFunctions = () => {
  const context = useContext(ReceptionContext);
  return context.registerFn;
};
