/**
 * Các paramater truyền đi để replace giá trị vào trong report
 */
export enum PrintRadiolyReportParameters {
  PatientName = 'patientName',
  PatientBirthdat = 'patientBirthday',
  PatientGender = 'patientGender',
  RequestedProcedureName = 'requestedProcedureName',
  ClinicalDiagnosis = 'clinicalDiagnosis',
}

export type PrintRadiolyReportParametersType = Record<
  PrintRadiolyReportParameters,
  string | undefined
>;
