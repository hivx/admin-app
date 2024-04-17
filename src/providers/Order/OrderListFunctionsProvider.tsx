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
import { IBookmarkDTO, IOrderDTO, IProcedureDTO } from '@/types/dto';

const noop = () => {};

type AnyFn = (...args: any) => any;
/**
 * This provider only works with Order List, therefore
 * We do NOT allow the register of functions that is NOT DEFINED HERE
 */
type OrderListContextFunctions = {
  /**
   * Open bookmark modal
   */
  openBookmarkModal: (orderID?: BaseEntity['id'], bookmarks?: IBookmarkDTO[]) => void;
  /**
   * Open create bookmark folder modal
   */
  openBookmarkFolderModal: (isEdit?: boolean) => void;
  /**
   * Open study info modal
   */
  openStudyInfoModal: (orderID?: BaseEntity['id']) => void;
  /**
   * Open add request modal
   */
  openAddrequestModal: (
    option?: IProcedureDTO,
    order?: IOrderDTO,
    accessionNumber?: IOrderDTO['accessionNumber'],
  ) => void;
  /**
   * Open edit request modal
   */
  openEditRequestModal: (
    procedure: IProcedureDTO | null,
    order?: IOrderDTO,
    accessionNumber?: IOrderDTO['accessionNumber'],
  ) => void;
  /**
   * Open print image  modal
   */
  openPrintImageModal: (orderID?: BaseEntity['id']) => void;
  /**
   * Open merge study modal
   */
  openMergeStudyModal: (orderID?: BaseEntity['id']) => void;
  /**
   * Open Quick Report modal
   */
  openQuickReportModal: (orderID?: BaseEntity['id'], reportID?: BaseEntity['id']) => void;
  /**
   * Update Order Study
   * This func will using when merge study
   */
  updateOrderStudy: (studyID?: BaseEntity['id']) => void;
  /**
   * Handle open modal create order
   */
  openCreateOrderModal: () => void;
  /**
   * Handle open order
   */
  openOrderTab: () => void;
  /**
   * Handle open modal config request infomation
   */
  openConfigRequestModal: () => void;

  /**
   *
   */
  submitEditConfigForm: () => void;
};

const DEFAULT_FUNCTIONS: OrderListContextFunctions = {
  openBookmarkModal: noop,
  openStudyInfoModal: noop,
  openCreateOrderModal: noop,
  openBookmarkFolderModal: noop,
  openAddrequestModal: noop,
  openEditRequestModal: noop,
  openQuickReportModal: noop,
  openMergeStudyModal: noop,
  openOrderTab: noop,
  openPrintImageModal: noop,
  updateOrderStudy: noop,
  openConfigRequestModal: noop,
  submitEditConfigForm: noop,
};

type KeyType = string | undefined;

type OrderListContextValues = {
  /**
   * Holds all possible orderList report functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  key: KeyType;
  setKey?: React.Dispatch<React.SetStateAction<KeyType>>;
  fnRef: MutableRefObject<OrderListContextFunctions>;
  registerFn: (name: keyof OrderListContextFunctions, fn: AnyFn) => void;
  debug: () => void;
};

const Context = createContext<OrderListContextValues>({
  key: '',
  fnRef: {
    current: DEFAULT_FUNCTIONS,
  },
  registerFn: noop,
  debug: noop,
});

type OrderListFunctionsProviderProps = {
  children: ReactNode;
};
/**
 * Provides a stable reference for child components to define functions
 * for OrderList module
 */
function OrderListFunctionsProvider(props: OrderListFunctionsProviderProps) {
  const ref = useRef<OrderListContextFunctions>(DEFAULT_FUNCTIONS);

  /**
   * Attach the function to the OrderListFunctionsProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const functions = useOrderListFunctions();
   * functions.onClick(); // 'clicked'
   */
  const registerFn: OrderListContextValues['registerFn'] = useCallback((name, fn) => {
    ref.current[name] = fn;
  }, []);

  /**
   * State key to render component from other component
   */
  const [key, setKey] = useState<KeyType>();

  const providerValue = useMemo<OrderListContextValues>(
    () => ({
      fnRef: ref,
      registerFn,
      debug: () => {},
      key,
      setKey,
    }),
    [key, registerFn],
  );

  return <Context.Provider value={providerValue} {...props} />;
}

const useOrderListContext = () => useContext(Context);
const useOrderListFunctions = () => {
  const context = useContext(Context);
  return context.fnRef.current;
};

const useRegisterOrderListFunctions = () => {
  const context = useContext(Context);
  return context.registerFn;
};

export {
  OrderListFunctionsProvider,
  useOrderListContext,
  useOrderListFunctions,
  useRegisterOrderListFunctions,
};
