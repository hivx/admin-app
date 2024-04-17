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
type PredefinedTimetableFunctions = {
  /**
   * Pre-defined functions
   */

  submitUpdateTimetable: AnyFn;
  openModalUpdateTimetable: AnyFn;
};
type TimeTableFuntions = PredefinedTimetableFunctions & Record<string, AnyFn>; // or any functions

const TIMETABLE_FUNCTIONS_DEFAULT: TimeTableFuntions = {
  submitUpdateTimetable: noop,
  openModalUpdateTimetable: noop,
};

type TimeTableContextValues = {
  /**
   * Holds all possible Timetable functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  fnRef: MutableRefObject<TimeTableFuntions>;
  registerFn: (
    name: LiteralUnion<keyof PredefinedTimetableFunctions, string>,
    fn: AnyFn,
  ) => void;
  debug: () => void;
};

const TimeTableContext = createContext<TimeTableContextValues>({
  fnRef: {
    current: TIMETABLE_FUNCTIONS_DEFAULT,
  },
  registerFn: noop,
  debug: noop,
});

/**
 * Provides a stable reference for child components to define functions
 * for parent component to execute
 */
function TimeTableProvider(props: { children: ReactNode }) {
  const ref = useRef<TimeTableFuntions>(TIMETABLE_FUNCTIONS_DEFAULT);

  /**
   * Attach the function to the TimetableProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const TimetableFunctions = useTimetableFunctions();
   * TimetableFunctions.onClick(); // 'clicked'
   */
  const registerFn: TimeTableContextValues['registerFn'] = useCallback((name, fn) => {
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

  return <TimeTableContext.Provider value={providerValue} {...props} />;
}

const useTimeTableContext = () => useContext(TimeTableContext);
const useTimetableFunctions = () => {
  const context = useContext(TimeTableContext);
  return context.fnRef.current;
};

const useRegisterTimetableFunctions = () => {
  const context = useContext(TimeTableContext);
  return context.registerFn;
};

export {
  TimeTableProvider,
  useTimeTableContext,
  useTimetableFunctions,
  useRegisterTimetableFunctions,
};
