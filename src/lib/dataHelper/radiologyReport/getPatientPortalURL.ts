import { PATIENT_PORTAL_URL } from '@/config';
import { IOrderDTO, IPatientDTO } from '@/types/dto';

import { getBase64QRcode, getBase64barcode } from '../htmlElementHelper';

type GetUrlPatientPortalOptions = {
  orderDate: string;
  patientID: IPatientDTO['id'];
  pid: IPatientDTO['pid'];
};
export enum CommonReportImages {
  PidBarcode = 'pidBarcode',
  AccessionNumberBarcode = 'accessionNumberBarcode',
  PortalQR = 'portalQR',
}

export const getUrlPatientPortal = ({
  orderDate,
  patientID,
  pid,
}: GetUrlPatientPortalOptions) =>
  `${PATIENT_PORTAL_URL}/${orderDate.slice(0, 8)}/${patientID}/${pid}`;

/**
 * Lấy QR code đường link đến patient portal
 */
export const getPatientPortalQRCode = async ({
  orderDate,
  patientID,
  pid,
}: Partial<GetUrlPatientPortalOptions>) => {
  if (orderDate && patientID && pid) {
    const url = getUrlPatientPortal({ orderDate, patientID, pid });
    return await getBase64QRcode(url);
  }
  return '';
};

export const getCommonImagesSubmissionForOrderReport = async (
  order: IOrderDTO,
): Promise<Partial<Record<CommonReportImages, string>>> => {
  return {
    pidBarcode: order.patient?.pid ? getBase64barcode(order.patient?.pid) : undefined,
    accessionNumberBarcode: order.accessionNumber
      ? getBase64barcode(order.accessionNumber)
      : undefined,
    portalQR: await getPatientPortalQRCode({
      orderDate: order.requestedTime ?? undefined,
      patientID: order.patient?.id,
      pid: order.patient?.pid,
    }),
  };
};
