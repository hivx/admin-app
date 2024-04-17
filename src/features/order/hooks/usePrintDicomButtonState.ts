import { BUTTON_STATE } from '@/types';
import { IModalityTypeNameDTO, IOrderDTO } from '@/types/dto';

export const typeCanPrintDicom: IModalityTypeNameDTO['id'][] = [
  'US',
  'ED',
  'ES',
  'ECG',
  'SC',
  'OP',
];

export const usePrintDicomButtonState = (order?: IOrderDTO) => {
  const hasStudy = order?.study && order.study.id;
  // const hasModalityTypeCanPrint =
  //   order?.modalityType && typeCanPrintDicom.includes(order.modalityType);
  const buttonState = hasStudy ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED;
  return buttonState;
};
