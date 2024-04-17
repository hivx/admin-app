export enum OrderListForm {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  PATIENT_NAME = 'patientName',
  PATIENT_ID = 'patientId',
  ORDER_ID = 'orderId',
  READING_STATUS = 'readingStatus',
  DOCTOR_READER = 'doctorReader',
  REFERRING_PHYSICAIN_NAME = 'referringPhysicianName',
  REQUESTED_DEPARTMENT_NAME = 'requestedDepartmentName',
}

/**
 * Data order list form
 */
export type IDataOrderListFormFields = Partial<{
  startDate: string;
  endDate: string;
  patientName: string;
  patientId: string;
  orderId: string;
  readingStatus: string;
  doctorReader: string;
  referringPhysicianName: string;
  requestedDepartmentName: string;
}>;
