import { translate } from '@/hooks';
import { ImageDataState } from '@/hooks/useSelectDicomImage';
import { base64toURI } from '@/lib/dataHelper/base64FileHelper';
import {
  createPrintDocumentHTML,
  PrintDocumentFormat,
} from '@/lib/dataHelper/htmlElementHelper';
import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO, IUserDTO } from '@/types/dto';
import { HTMLPrintElement, PrintDataType } from '@/types/htmlPrint';
import {
  PRINT_FORMAT,
  getCurrentDate,
  getCurrentDateTime,
  itechDateTimeToDayjs,
  itechDateToDayjs,
} from '@/utils/dateUtils';

import { getPatientAge } from './getPatientAge';
import { getUrlPatientPortal } from './getPatientPortalURL';

/**
 * https://wiki.ipacs.com.vn/en/developer/PACS/modules/admin/layout-template/description
 */
enum REPORT_ELEMENT_ID {
  /**
   * Mã phiếu barcode
   */
  accessionNumberBarcode = 'accessionNumberBarcode',
  /** Mã phiếu */
  accessionNumber = 'accessionNumber',
  /** Điện thoại BN */
  patientPhone = 'patientPhone',
  /** Bác sĩ đọc */
  doctorName = 'doctorName',
  /** Mã BN */
  patientId = 'patientId',
  /** Mã BN barcode */
  pidBarcode = 'pidBarcode',
  /** Tên BN */
  patientName = 'patientName',
  /** Năm sinh */
  patientBirthYear = 'patientBirthYear',
  /** Tuổi */
  patientAge = 'patientAge',
  /** Địa chỉ */
  patientAddress = 'patientAddress',
  /** Giới tính */
  patientGender = 'patientGender',
  /** Số bảo hiểm */
  patientInsurance = 'patientInsurance',
  /** Bác sĩ chỉ định */
  clinicalPhysician = 'clinicalPhysician',
  /** Khoa chỉ định */
  clinicalDepartment = 'clinicalDepartment',
  /** Chẩn đoán lâm sàng */
  clinicalDiagnosis = 'clinicalDiagnosis',
  /** Mã kết nối */
  orderNumber = 'orderNumber',
  /** Dịch vụ */
  orderProcedure = 'orderProcedure',
  /** Cấp cứu */
  urgentOrder = 'urgentOrder',
  /** Không ưu tiên */
  normalOrder = 'normalOrder',
  /** Khám dịch vụ */
  scheduleOrder = 'scheduleOrder',
  /** Ngày chụp */
  studyDate = 'studyDate',
  /** Mô tả */
  reportBody = 'reportBody',
  /** Kết luận */
  reportConclusion = 'reportConclusion',
  /** Ngày hiệu lực bảo hiểm */
  insuranceEffectiveDate = 'insuranceEffectiveDate',
  /** Ngày hết hạn bảo hiểm */
  insuranceExpirationDate = 'insuranceExpirationDate',
  /** Ngày tháng năm */
  today = 'today',
  /** Mã ICD */
  icdCode = 'icdCode',
  /** Mã yêu cầu */
  requestNumber = 'requestNumber',
  /** Khung ảnh */
  imageSegment = 'imageSegment',
  /** Logo BV */
  logo = 'logo',
  /** Logo ký số */
  logoDigitalSignature = 'logoIcon',
  /** Mã QR lấy link portal*/
  portalQR = 'portalQR',
  /** Link tra cứu portal*/
  patientUrl = 'patientUrl',
  /** Mật khẩu portal*/
  portalCode = 'portalCode',
  /** Chữ ký BS */
  signature = 'signature',
  /** Máy chụp */
  modalityName = 'modalityName',
  /** Ngày giờ in kết quả */
  printTimedate = 'printTimedate',
  /** Ngày giờ duyệt kết quả */
  approvedTimedate = 'approvedTimedate',
  /** Đề nghị */
  suggestion = 'suggestion',
  /** STT khám sức khỏe */
  sttKSK = 'sttKSK',
  /** Người thực hiện */
  printUserName = 'printUserName',
  /** Thời gian thực hiện */
  operationTime = 'operationTime',
}

export type ComposeRadiologyReportHTMLOptions = {
  order: IOrderDTO;
  request: IOrderRequestDTO;
  report: IRadiologyReportDTO;
  approver: IUserDTO;
  currentUser: IUserDTO;
  template: string;
  format?: PrintDocumentFormat;
  selectedImages?: ImageDataState[];
  pacsIcon: string;
};

/**
 * Receive information from order, request, report and add appropriate fields
 * to the html template
 * https://wiki.ipacs.com.vn/en/developer/PACS/modules/admin/layout-template/description
 * @returns composed HTML document
 */
export const createRadiologyReportHTML = async (
  options: ComposeRadiologyReportHTMLOptions,
) => {
  const {
    order,
    template,
    report,
    request,
    selectedImages,
    approver,
    currentUser,
    format = { lineHeight: 1.2, fontSize: 12 },
    pacsIcon,
  } = options;
  const composeDocs = new DOMParser().parseFromString(template, 'text/html');
  const patient = order.patient;
  const procedure = request.procedure;
  const patientBirthYear = patient?.birthDate
    ? itechDateToDayjs(patient?.birthDate)?.format('YYYY')
    : null;

  const patientGender =
    patient?.gender && translate?.messages.gender({ gender: patient.gender });
  const portalURL =
    order.requestedTime &&
    patient?.pid &&
    getUrlPatientPortal({
      orderDate: order.requestedTime,
      patientID: patient?.id,
      pid: patient?.pid,
    });

  const approverSignature = approver.signature && base64toURI(approver.signature);
  const images: HTMLPrintElement[] = selectedImages
    ? selectedImages?.map((image, index) => {
        return {
          id: `image${index + 1}`,
          dataType: PrintDataType.Image,
          value: image.data,
        };
      })
    : [];

  const items: HTMLPrintElement[] = [
    // images
    {
      id: REPORT_ELEMENT_ID.logo,
      dataType: PrintDataType.Image,
      value: pacsIcon,
    },
    {
      id: REPORT_ELEMENT_ID.logoDigitalSignature,
      dataType: PrintDataType.Image,
      value: pacsIcon,
    },
    {
      id: REPORT_ELEMENT_ID.portalQR,
      dataType: PrintDataType.QRCode,
      value: portalURL ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.signature,
      dataType: PrintDataType.Image,
      value: approverSignature ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.signature,
      dataType: PrintDataType.Image,
      value: approverSignature ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.signature,
      dataType: PrintDataType.Image,
      value: approverSignature ?? '',
    },
    ...images,
    //barcode,
    {
      id: REPORT_ELEMENT_ID.accessionNumberBarcode,
      dataType: PrintDataType.Barcode,
      value: order.accessionNumber ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.pidBarcode,
      dataType: PrintDataType.Barcode,
      value: patient?.pid ?? '',
    },
    // set patient info
    {
      id: REPORT_ELEMENT_ID.patientAge,
      dataType: PrintDataType.Text,
      value: getPatientAge(order.patient?.birthDate).toString(),
    },
    {
      id: REPORT_ELEMENT_ID.patientBirthYear,
      dataType: PrintDataType.Text,
      value: patientBirthYear ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientGender,
      dataType: PrintDataType.Text,
      value: patientGender ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientName,
      dataType: PrintDataType.Text,
      value: patient?.fullname ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientAddress,
      dataType: PrintDataType.Text,
      value: patient?.address ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientPhone,
      dataType: PrintDataType.Text,
      value: patient?.phone ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientId,
      idType: 'classname',
      dataType: PrintDataType.Text,
      value: patient?.pid ?? '',
    },

    // order info
    {
      id: REPORT_ELEMENT_ID.requestNumber,
      idType: 'classname',
      dataType: PrintDataType.Text,
      value: request.requestedNumber ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.orderProcedure,
      dataType: PrintDataType.Text,
      value: procedure?.name ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.clinicalDiagnosis,
      dataType: PrintDataType.Text,
      value: order.diagnosis ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientInsurance,
      dataType: PrintDataType.Text,
      value: order.insuranceNumber ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.clinicalDepartment,
      dataType: PrintDataType.Text,
      value: order.requestedDepartment?.name ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.orderNumber,
      dataType: PrintDataType.Text,
      value: order.orderNumber ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.insuranceEffectiveDate,
      dataType: PrintDataType.Text,
      value: itechDateToDayjs(order.insuranceIssuedDate)?.format(PRINT_FORMAT.date) ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.insuranceExpirationDate,
      dataType: PrintDataType.Text,
      value:
        itechDateToDayjs(order.insuranceExpiredDate)?.format(PRINT_FORMAT.date) ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.sttKSK,
      dataType: PrintDataType.Text,
      value: order.attributes?.sttKSK ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.modalityName,
      dataType: PrintDataType.Text,
      value: request.modality?.name ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.accessionNumber,
      idType: 'classname',
      dataType: PrintDataType.Text,
      value: order.accessionNumber ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.requestNumber,
      dataType: PrintDataType.Text,
      value: request.requestedNumber ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.icdCode,
      dataType: PrintDataType.Text,
      value: request.icdCode ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.portalCode,
      dataType: PrintDataType.Text,
      value: patient?.portalCode ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.urgentOrder,
      dataType: PrintDataType.Checkbox,
      value: !!order.urgent,
    },
    {
      id: REPORT_ELEMENT_ID.normalOrder,
      dataType: PrintDataType.Checkbox,
      value: !order.urgent,
    },
    {
      id: REPORT_ELEMENT_ID.studyDate,
      dataType: PrintDataType.Text,
      value: order.study?.studyTime
        ? itechDateTimeToDayjs(order.study?.studyTime)?.format(PRINT_FORMAT.dateTime) ??
          ''
        : '',
    },

    // report
    {
      id: REPORT_ELEMENT_ID.reportBody,
      dataType: PrintDataType.Text,
      value: report.findings ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.reportConclusion,
      dataType: PrintDataType.Text,
      value: report.impression ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.suggestion,
      dataType: PrintDataType.Text,
      value: report.comments ?? '',
    },

    // radiologist
    {
      id: REPORT_ELEMENT_ID.doctorName,
      idType: 'classname',
      dataType: PrintDataType.Text,
      value: report.approver?.fullname ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.doctorName,
      dataType: PrintDataType.Text,
      value: report.approver?.fullname ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.printUserName,
      dataType: PrintDataType.Text,
      value: currentUser.fullname ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.clinicalPhysician,
      dataType: PrintDataType.Text,
      value: order.referringPhysician?.fullname ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.patientUrl,
      dataType: PrintDataType.Text,
      value: portalURL ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.today,
      idType: 'classname',
      dataType: PrintDataType.Text,
      value: getCurrentDate().format('[Ngày] DD [tháng] MM [năm] YYYY'),
    },
    {
      id: REPORT_ELEMENT_ID.printTimedate,
      idType: 'classname',
      dataType: PrintDataType.Text,
      value: getCurrentDateTime().format(PRINT_FORMAT.dateTime) ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.approvedTimedate,
      dataType: PrintDataType.Text,
      value:
        itechDateTimeToDayjs(report.approvedTime)?.format(PRINT_FORMAT.dateTime) ?? '',
    },
    {
      id: REPORT_ELEMENT_ID.operationTime,
      dataType: PrintDataType.Text,
      value:
        itechDateTimeToDayjs(request.operationTime)?.format(PRINT_FORMAT.dateTime) ?? '',
    },
  ];
  await createPrintDocumentHTML(composeDocs, {
    items,
    formatOptions: {
      format,
      formatElements: [
        REPORT_ELEMENT_ID.reportBody,
        REPORT_ELEMENT_ID.reportConclusion,
        REPORT_ELEMENT_ID.suggestion,
      ],
    },
  });

  return composeDocs;
};
