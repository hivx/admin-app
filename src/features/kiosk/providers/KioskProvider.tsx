import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { LiteralUnion } from 'type-fest';

const noop = () => {};

type AnyFn = (...args: unknown[]) => unknown;

type PredefinedKioskFunctions = {
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

type KioskFunctions = PredefinedKioskFunctions & Record<string, AnyFn>; // or any functions

const KIOSK_FUNCTIONS_DEFAULT: KioskFunctions = {
  submitFormAutoSelectModality: noop,
  submitTicketInfomationForm: noop,
  openAutoSelectModalityModal: noop,
  closeAutoSelectModalityModal: noop,
  autoFocusPID: noop,
  clearPID: noop,
};

type KioskContextValues = {
  registerFn: (
    name: LiteralUnion<keyof PredefinedKioskFunctions, string>,
    fn: AnyFn,
  ) => void;
  fnRef: MutableRefObject<KioskFunctions>;
};

export const KioskContext = createContext<KioskContextValues>({
  registerFn: noop,

  fnRef: {
    current: KIOSK_FUNCTIONS_DEFAULT,
  },
});

export const useGlobalContext = () => useContext(KioskContext);

export function KioskProvider(props: { children: ReactNode }) {
  const ref = useRef<KioskFunctions>(KIOSK_FUNCTIONS_DEFAULT);

  const registerFn: KioskContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  return (
    <KioskContext.Provider
      value={{
        registerFn,
        fnRef: ref,
      }}
      {...props}
    />
  );
}

export const useKioskFunctions = () => {
  const context = useContext(KioskContext);
  return context.fnRef.current;
};

export const useRegisterKioskFunctions = () => {
  const context = useContext(KioskContext);
  return context.registerFn;
};
