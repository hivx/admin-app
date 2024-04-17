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

const noop = () => {};

type AnyFn = (...args: any) => any;
/**
 * This provider only works with Create Order modal , therefore
 * We do NOT allow the register of functions that is NOT DEFINED HERE
 */
type BookmarkContextFunctions = {
  /**
   * handle create bookmark
   */
  createBookMark: () => void;
  /**
   * handle create bookmark folder
   */
  createBookMarkFolder: () => void;
  /**
   * handle update bookmark folder
   */
  updateBookMarkFolder: () => void;
  /**
   * handle update bookmark
   */
  updateBookMark: () => void;
};

const DEFAULT_FUNCTIONS: BookmarkContextFunctions = {
  createBookMark: noop,
  updateBookMark: noop,
  createBookMarkFolder: noop,
  updateBookMarkFolder: noop,
};

type BookmarkContextValues = {
  /**
   * Holds all possible orderList report functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  fnRef: MutableRefObject<BookmarkContextFunctions>;
  registerFn: (name: keyof BookmarkContextFunctions, fn: AnyFn) => void;
  debug: () => void;
};

const Context = createContext<BookmarkContextValues>({
  fnRef: {
    current: DEFAULT_FUNCTIONS,
  },
  registerFn: noop,
  debug: noop,
});

type BookmarkFunctionsProviderProps = {
  children: ReactNode;
};
/**
 * Provides a stable reference for child components to define functions
 * for Create Order modal module
 */
function BookmarkFunctionsProvider(props: BookmarkFunctionsProviderProps) {
  const ref = useRef<BookmarkContextFunctions>(DEFAULT_FUNCTIONS);

  /**
   * Attach the function to the BookmarkFunctionsProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const functions = useOrderListFunctions();
   * functions.onClick(); // 'clicked'
   */
  const registerFn: BookmarkContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  const providerValue = useMemo<BookmarkContextValues>(
    () => ({
      fnRef: ref,
      registerFn,
      debug: () => {},
    }),
    [registerFn],
  );

  return <Context.Provider value={providerValue} {...props} />;
}

const useBookmarkContext = () => useContext(Context);
const useBookmarkFunctions = () => {
  const context = useContext(Context);
  return context.fnRef.current;
};

const useRegisterBookmarkFunctions = () => {
  const context = useContext(Context);
  return context.registerFn;
};

export {
  BookmarkFunctionsProvider,
  useBookmarkContext,
  useBookmarkFunctions,
  useRegisterBookmarkFunctions,
};
