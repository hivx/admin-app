import { faker } from '@faker-js/faker';

import { IOrderRequestDTO } from '@/types/dto';
import { formatDateTime } from '@/utils/dateUtils';
import { uuidv4 } from '@/utils/uuidv4';

import { cloudUserGenerator } from './userGenerator';

export const orderRequestGenerator = (
  overrides?: Partial<IOrderRequestDTO>,
): IOrderRequestDTO => ({
  id: parseInt(faker.random.numeric(12)),
  /**
   * Thời gian duyệt
   */
  finalApprovedTime: formatDateTime(faker.date.past()),
  /**
   * Bác sĩ duyệt
   */
  finalApprover: Math.random() > 0.5 ? cloudUserGenerator() : null,
  operators: null,
  /**
   * ID kết quả
   */
  finalReportID: parseInt(faker.random.numeric(12)),
  hospitalID: faker.random.numeric(5),
  hisReportStatus: null,
  /**
   * Mã ICD
   */
  icdCode: `${faker.random.alphaNumeric(3, {
    casing: 'upper',
  })} - ${faker.random.alphaNumeric(3, { casing: 'upper' })}`,
  /**
   * orderID
   */
  orderID: parseInt(faker.random.numeric(12)),
  /**
   * Dịch vụ chụp
   */
  procedure: null,
  /**
   * Mã yêu cầu
   */
  requestedNumber: faker.random.numeric(5),
  /**
   * Kết quả
   */
  reports: [],
  uuid: uuidv4(),
  modality: null,
  ...overrides,
  operationTime: formatDateTime(faker.date.past()),
  modalityID: null,
  procedureID: null,
  expectedReporter: null,
  finalHtmlReportID: null,
  finalSignedReportID: null,
  consumables: [],
  finalSigner: null,
  numOfConsumables: 0,
  finalApproverID: null,
  finalSignedTime: '',
});
