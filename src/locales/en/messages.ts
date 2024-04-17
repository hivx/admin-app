import { Translation } from '../i18n-types';

const messages: Translation['messages'] = {
  technicalSupport: 'Technical support: {phone}',
  status: {
    long: 'Status',
    short: 'Status',
  },
  action: 'Action',
  stt: 'STT',
  validation: {
    genericRequired: '{resource} is required.',
    genericDuplicated: '{name} already exists!',
    genericMinLength: '{resource} must contain at least {length} character(s)',
    genericRequiredType:
      '{resource} should be {type|{number: number type, string: string type, jsonObject: json object type}}.',
    patientNameRequired:
      'Patient Name must have at least 3 characters, including only letters and digits, not including special characters',
    patientIdRequired:
      'Patient Id must have at least 3 characters, including letters and digits, and special characters',
    orderIdRequired:
      'Patient Name must have at least 3 characters, including only letters and digits, not including special characters',
    approvedTimeLessThanRequire: 'Approved time cannot less than request time ({time})',
    exceedMaxFileSize: 'The size of 1 file exceed {{maxSize}) MB',
    passwordDontMatch: 'Passwords dont match',
    genericInvalid: '{name} invalid',
    operationTime: 'Operation time > Requested time and Operation time < Approved time',
    approveTime: 'Approved Time > Requested time and Approved Time > Operation time',
  },
  result: {
    genericUnsuccess: '{subject} unsuccessful.',
    genericSuccess: '{subject} successful.',
    noData: 'No data.',
  },
  loading: 'Loading...',
  notification: {
    info: 'Information',
    error: 'Error',
    warning: 'Warning',
    success: 'Success',
    failure: 'Failure',
    unauthorized: 'Người dùng không có quyền thực hiện chức năng này!',
    sessionExpired: 'Session expired! Please login again.',
    sessionWillExpire: 'Session is about to expire!',
    create: 'Are you sure you want to add [<b>{name}</b>] ?',
    delete: 'Are you sure you want to delete [<b>{name}</b>] ?',
    createRequest: 'Are you sure you want to add request [<b>{name}</b>] ?',
    deleteRequest: 'Are you sure you want to delete request [<b>{name}</b>] ?',
    deleteOrder: 'Are you sure you want to delete order [<b>{name}</b>] ?',
    cancelApproved:
      'Yêu cầu hủy duyệt chỉ định mã <b>{code}</b> <br/> Của bệnh nhân <b>{patient}</b> <br/> <b>{procudure}</b> <br/> Thời gian thực hiện <b>{operationTime}</b> <br/> Thời gian kết luận <b>{approveTime}</b> ?',
    deleteBookmark: 'Are you sure you want to delete bookmark [<b>{name}</b>] ?',
    orderAlreadyLocked: 'DR. <b>{name}</b> is currently locking this order. ',
    orderLockedTryAgain: 'Please contact DR. <b>{name}</b> or try again later.',
    orderAlreadyApproved: 'This order is already approved by DR. <b>{name}</b>.',
    orderRequestApprovedByUser:
      'Cannot lock,Order request is already approved by DR. <b>{name}</b>.',
    deleteRole: 'Are you sure you want to delete role [<b>{name}</b>] ?',
    deleteModalityTypeName:
      'Are you sure you want to delete modality type name [<b>{name}</b>] ?',
    orderAlreadyApprovedTryAgain: 'Do you want to re-approve?',
    confirmApprove: 'Confirm approve?',
    orderLockConfirm: 'Do you want to lock this order?',
    noTemplateForOrder: 'This order does not have layout template!',
    outOfImagesNumber: 'Out of images number !',
    printReportLoading: 'Preparing report...',
    deleteOrderFile: 'Are you sure you want to delete attachment ?',
    deleteOrderFiles: 'Are you sure you want to delete these attachments ?',
    noStudyInOrder: "Study doesn't exist in order",
    createPf: 'The resulting PDF has not been generated. Are you sure you want to close?',
    notFoundPdf: 'Not found pdf',
    deleteStudy:
      'Are you sure you want to delete study with studyIUID [<b>{studyIUID}</b>], patient name : [<b>{patientName}</b>]?',
    splitStudyOrder:
      'Are you sure split study with studyIUID [<b>{studyIUID}</b>], patient name : [<b>{patientStudyName}</b>] out of Order have: [<b>{accessionNumber}</b>],patient name: [<b>{patientOrderName}</b>], requested date : [<b>{requestedDate}</b>]',
    notFoundPatient: 'Not found patient with id {pid}',
    resendRequest:
      'Are yout sure resend event type [<b>{type?:string}</b>] </br> Code [<b>{key?:string}</b>] ?',
    userNotInShift: 'User not in shift',
    getConsultationUrl: 'Get Consultation Url',
    cancelApprovedRequest: 'Cancel approved request',
    approvalConflict:
      'Trùng thời gian thực hiện với chỉ định mã <b>{accessionNumber}</b> <br/> Bệnh nhân <b>{pName}</b> <br/> <b>{procedure}</b>  <br/>Thời gian thực hiện <b>{operationTime}</b> <br/> Thời gian kết luận <b>{approveTime}</b> <br/> Bác sĩ kết luận <b>{approver}</b> <br/>',
    conflictApprover:
      'Thời gian thực hiện của bệnh nhân <b>{pName}</b> <br/> trùng với chỉ định mã <b>{accessionNumber}</b> <br/> <b>{procudure}</b> <br/> Thời gian thực hiện <b>{operationTime}</b> <br/> Thời gian kết luận <b>{approveTime}</b>  ?',
    invalidApprovalTime:
      'Thời gian thực hiện của ca chụp <b>{type}</b> cần theo điều kiện sau: <br/>  Thời gian chỉ định + <b>{periodOne}</b>p < Thời gian thực hiện <br/> Thời gian thực hiện + <b>{periodTwo}</b>p < Thời gian kết luận ',
    isOutOfCapability:
      'Máy thực hiện <b>{name}</b> mã số <b>{code}</b> <br/> vượt quá định mức bảo hiểm (<b>{insurance}</b> / <b>{capability}</b>)',
  },
  titles: {
    createResource: 'Create {resource}',
    editResource: 'Edit {resource}',
    departmentUserList: 'User list - {department}',
    splitResource: 'Split {resource}',
    orderStudyInfo: 'Study info - {patientName}',
    resultDiagnosisInfo: 'Diagnosis results',
    deleteResource: 'Delete {resource}',
    modalityList: 'Modality list - {resource}',
    contentList: 'Content list - {resource}',
    userGroupMemberList: 'Member list - {userGroup}',
    uploadNonDicom: 'Upload {resource}',
    uploadOrderFile: 'Upload attachment',
    mergeStudy: 'Merge Study',
  },
  /**
   * Pagination messages
   */
  pagination: {
    rowsPerPage: 'Rows per page',
    recordsRange: '{start}-{end}',
    totalRecords: 'total records {total}',
  },
  /**
   * Gender
   */
  gender: '{gender|{M: Male, F: Female, O: Other}}',
  no: 'No',
};

export default messages;
