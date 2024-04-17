export enum SettingId {
  GeneralSetting = 'generalSetting',
  ShortcutKey = 'shortcutKey',
  OrderTable = 'orderTable',
}

export enum ValueType {
  Json = 'JSON',
}
export enum GeneralSettingKey {
  AutoLockOrder = 'autoLockOrder',
  AutoOpenViewer = 'autoOpenViewer',
  ShowDiagnosisPanel = 'showDiagnosisPanel',
  AutoSelectTemplate = 'autoSelectTemplate',
  PreferPersonalTemplate = 'preferPersonalTemplate',
  DoubleClickToOpenViewer = 'doubleClickToOpenViewer',
}
export enum ShortcutSettingKey {
  OpenViewer = 'open_viewer',
  LockOrder = 'lock_order',
}
export enum OrderTableColumnKey {
  Stt = 'stt',
  ReportStatus = 'reportStatus',
  PatientName = 'patientName',
  PatientPID = 'patientPID',
  ModalityType = 'modalityType',
  Inpatient = 'inpatient',
  NumOfConsumables = 'numOfConsumables',
  StudyTime = 'studyTime',
  Requests = 'requests',
  BodyPart = 'bodyPart',
  RequestedTime = 'requestedTime',
  OperationTime = 'operationTime',
  ApprovedTime = 'approvedTime',
  AccessionNumber = 'accessionNumber',
  PatientGender = 'patientGender',
  Approver = 'approver',
  ExpectedReporter = 'expectedReporter',
  RequestedDepartment = 'requestedDepartment',
}

export type GeneralSettingJsonValue = Record<`${GeneralSettingKey}`, boolean>;
export type ShortcutSettingJsonValue = Record<`${ShortcutSettingKey}`, string>;

export type ISettingDTO = {
  id: `${SettingId}`;
  value: string;
  valueType: `${ValueType}`;
};

export type ICreateUpdateSettingDTO = ISettingDTO;
