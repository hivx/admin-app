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

import { useAppSelector } from '@/hooks';
import {
  IRadiologyReportCallbacks,
  useRadiologyReport,
} from '@/hooks/radiology/useRadiologyReport';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';
import { IRadiologyReportContextFunctions } from '@/types/radiology/reportContext';

const noop = () => {};

type AnyFn = (...args: any) => any;

const DEFAULT_FUNCTIONS: IRadiologyReportContextFunctions = {
  saveDraftReport: noop,
  approveReport: noop,
  lockOrder: () => Promise.resolve(false),
  fetchAndSetReport: noop,
  setIsEditable: noop,
  openModalSelectApproveTime: noop,
  submitFormApproveWithTime: noop,
  openModalPrintRadiologyReport: noop,
  openModalMedicalEquipment: noop,
  openModalDefaultInfoRadiology: noop,
  submitUpdatePdf: noop,
  close: noop,
};

type RadiologyReportContextValues = {
  /**
   * current order ID
   */
  orderID: BaseEntity['id'];
  /**
   * Holds all possible radiology report functions
   * By using a Ref, the children will not get re-render when we register a new function
   */
  fnRef: MutableRefObject<IRadiologyReportContextFunctions>;
  registerFn: (name: keyof IRadiologyReportContextFunctions, fn: AnyFn) => void;
  debug: () => void;
};

const RadiologyReportContext = createContext<RadiologyReportContextValues>({
  orderID: 0,
  fnRef: {
    current: DEFAULT_FUNCTIONS,
  },
  registerFn: noop,
  debug: noop,
});

type RadiologyReportProviderProps = {
  // orderID: BaseEntity['id'];
  order: IOrderDTO;
  reportID?: BaseEntity['id'];
  children: ReactNode;
  callbacks: IRadiologyReportCallbacks;
};
/**
 * Provides a stable reference for child components to define functions
 * for Radiology Report module
 * We also define hotkeys logic here for hotkey feature
 */
function RadiologyReportProvider(props: RadiologyReportProviderProps) {
  const { order, reportID, callbacks } = props;
  const ref = useRef<IRadiologyReportContextFunctions>(DEFAULT_FUNCTIONS);
  const { fetchAndSetReport, approveReport, saveDraftReport, setIsEditable, lockOrder } =
    useRadiologyReport({
      order,
      callbacks,
      reportID,
    });
  const currentRequestID = useAppSelector(selectCurrentRequestID(order.id));

  /**
   * Attach the function to the RadiologyReportProvider functions storage
   * Usage
   * @example
   * registerFn("onClick", () => console.log('clicked'));
   *
   * // later in another component
   * const functions = useRadiologyReportFunctions();
   * functions.onClick(); // 'clicked'
   */
  const registerFn: RadiologyReportContextValues['registerFn'] = useCallback(
    (name, fn) => {
      ref.current[name] = fn;
    },
    [],
  );

  ref.current.approveReport = approveReport;
  ref.current.saveDraftReport = saveDraftReport;
  ref.current.fetchAndSetReport = fetchAndSetReport;
  ref.current.setIsEditable = setIsEditable;
  ref.current.lockOrder = lockOrder;
  ref.current.close = callbacks.onClose;

  const providerValue = useMemo<RadiologyReportContextValues>(
    () => ({
      orderID: order.id,
      fnRef: ref,
      registerFn,
      debug: () => {},
    }),
    [order.id, registerFn],
  );

  return (
    <RadiologyReportContext.Provider value={providerValue}>
      {currentRequestID && props.children}
    </RadiologyReportContext.Provider>
  );
}

const useRadiologyReportContext = () => useContext(RadiologyReportContext);
const useRadiologyReportFunctions = () => {
  const context = useContext(RadiologyReportContext);
  return context.fnRef.current;
};

const useRegisterRadiologyFunctions = () => {
  const context = useContext(RadiologyReportContext);
  return context.registerFn;
};

/**
 * Get current orderID
 *
 * Must be a child of RadiologyReportProvider to work
 */
const useCurrentOrderID = () => {
  const context = useContext(RadiologyReportContext);
  return context.orderID;
};

export {
  RadiologyReportProvider,
  useRadiologyReportContext,
  useRadiologyReportFunctions,
  useRegisterRadiologyFunctions,
  useCurrentOrderID,
};
