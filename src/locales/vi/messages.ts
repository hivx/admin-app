const messages = {
  technicalSupport: 'Hỗ trợ kỹ thuật: {phone:string}',
  status: {
    long: 'Trạng thái',
    short: 'TT',
  },
  action: 'Thao tác',
  stt: 'STT',
  /**
   * Messages that show up during field validations
   */
  validation: {
    genericRequired: '{resource:string} là bắt buộc.',
    genericMinLength: '{resource:string} tối thiểu {length: number} ký tự.',
    genericDuplicated: '{name:string} đã tồn tại!',
    genericRequiredType:
      '{resource: string} phải là {type|{number: kiểu số, string: kiểu chữ, jsonObject: dạng JSON Object}}.',
    patientNameRequired:
      'Tên bệnh nhân có ít nhất 3 kí tự, chỉ bao gồm chữ cái, không chứa kí tự đặc biệt',
    patientIdRequired:
      'Mã bệnh nhân có ít nhất 3 kí tự, bao gồm chữ cái, chữ số và kí tự đặc biệt',
    orderIdRequired:
      'Mã chỉ định chụp có ít nhất 3 kí tự, chỉ bao gồm chữ cái, không chứa kí tự đặc biệt',
    approvedTimeLessThanRequire:
      'Thời gian duyệt không được nhỏ hơn thời gian yêu cầu ({time: string})',
    exceedMaxFileSize: 'Dung lượng 1 file vượt quá {maxSize: number} MB',
    passwordDontMatch: 'Chưa khớp mật khẩu mới',
    genericInvalid: '{name:string} không hợp lệ',
    operationTime:
      'Thời gian thực hiện phải lớn hơn thời gian chỉ định, và nhỏ hơn thời gian duyệt',
    approveTime:
      'Thời gian duyệt phải lớn hơn thời gian chỉ định, và lớn hơn thời thực hiện',
  },
  /**
   * Messages that describe the result of an operation
   */
  result: {
    genericUnsuccess: '{subject:string} không thành công.',
    genericSuccess: '{subject:string} thành công.',
    noData: 'Không có dữ liệu',
  },
  loading: 'Đang tải...',
  /**
   * Messages that show up in pop ups, notifications
   */
  notification: {
    info: 'Thông báo',
    error: 'Lỗi',
    warning: 'Cảnh báo',
    success: 'Thành công',
    failure: 'Thất bại',
    unauthorized: 'Người dùng không có quyền thực hiện chức năng này!',
    sessionExpired: 'Phiên đăng nhập đã hết, vui lòng đăng nhập lại!',
    sessionWillExpire: 'Phiên đăng nhập sắp hết hạn!',
    create: 'Bạn có chắc chắn muốn thêm [<b>{name:string}</b>] ?',
    delete: 'Bạn có chắc chắn muốn xoá [<b>{name:string}</b>] ?',
    createRequest: 'Bạn có chắc chắn muốn thêm yêu cầu chụp [<b>{name:string}</b>] ?',
    deleteRequest: 'Bạn có chắc chắn muốn xoá yêu cầu chụp [<b>{name:string}</b>] ?',
    deleteOrder: 'Bạn có chắc chắn muốn xoá ca chụp [<b>{name:string}</b>] ?',
    cancelApproved:
      'Yêu cầu hủy duyệt chỉ định mã <b>{code:string}</b> <br/> Của bệnh nhân <b>{patient:string}</b> <br/> <b>{procudure:string}</b> <br/> Thời gian thực hiện <b>{operationTime:string}</b> <br/> Thời gian kết luận <b>{approveTime:string}</b>  ?',
    deleteBookmark: 'Bạn có chắc chắn muốn xoá ghi nhớ ca chụp [<b>{name:string}</b>] ?',
    deleteRole: 'Bạn có chắc chắn muốn xoá quyền [<b>{name:string}</b>] ?',
    deleteModalityTypeName:
      'Bạn có chắc chắn muốn xoá ký hiệu loại máy [<b>{name:string}</b>] ?',
    orderAlreadyLocked: 'Bác sĩ {name:string} đang nhận ca này.',
    orderAlreadyApproved: 'Bác sĩ {name:string} đã duyệt ca này.',
    orderRequestApprovedByUser:
      'Không thể nhận ca, Bác sĩ {name:string} đã duyệt ca này.',
    orderAlreadyApprovedTryAgain: 'Bạn có muốn duyệt lại không?',
    confirmApprove: 'Bạn có muốn duyệt ca chụp không?',
    orderLockedTryAgain: 'Vui lòng liên hệ Bác sĩ {name:string} hoặc thử lại sau.',
    orderLockConfirm: 'Bạn có muốn nhận ca này không?',
    noTemplateForOrder: 'Chỉ định này chưa có mẫu in!',
    outOfImagesNumber: 'Quá số lượng ảnh cho phép!',
    printReportLoading: 'Đang chuẩn bị kết quả...',
    deleteOrderFile: 'Bạn có chắc chắn muốn xoá tài liệu đính kèm này?',
    deleteOrderFiles: 'Bạn có chắc chắn muốn xoá nhiều tài liệu đính kèm ?',
    noStudyInOrder: 'Ca chụp này chưa có ảnh',
    createPf: 'Kết quả PDF chưa được tạo. Bạn có chắc chắn muốn đóng?',
    notFoundPdf:
      'Không tìm thấy dữ liệu kết quả dạng PDF. Mời thực hiện chức năng In và tạo lại kết quả',
    deleteStudy:
      'Bạn có chắc chắn xóa study có studyIUID [<b>{studyIUID:string}</b>], tên bệnh nhân : [<b>{patientName:string}</b>] không?',
    splitStudyOrder:
      'Bạn có chắc chắn Tách study có studyIUID [<b>{studyIUID:string}</b>], Tên bệnh nhân : [<b>{patientStudyName:string}</b>] <br/> ra khỏi  Chỉ định có mã: [<b>{accessionNumber:string}</b>], Tên bệnh nhân: [<b>{patientOrderName:string}</b>],  Ngày chỉ định : [<b>{requestedDate:string}</b>]',
    notFoundPatient: 'Không tìm thấy bệnh nhân có mã {pid?:string}',
    resendRequest:
      'Bạn có chắc chắn muốn gửi lại bản tin loại [<b>{type?:string}</b>] </br> Có mã [<b>{key?:string}</b>] ?',
    userNotInShift: 'Người dùng không trong lịch làm việc',
    getConsultationUrl: 'Lấy đường dẫn hội chẩn',
    cancelApprovedRequest: 'Hủy duyệt',
    approvalConflict:
      'Trùng thời gian thực hiện với chỉ định mã <b>{accessionNumber:string}</b> <br/> Bệnh nhân <b>{pName:string}</b> <br/> <b>{procedure:string}</b>  <br/>Thời gian thực hiện <b>{operationTime:string}</b> <br/> Thời gian kết luận <b>{approveTime:string}</b> <br/> Bác sĩ kết luận <b>{approver:string}</b> <br/>',
    conflictApprover:
      'Thời gian thực hiện của bác sĩ <b>{pName:string}</b> <br/> trùng với chỉ định mã <b>{accessionNumber:string}</b> <br/> <b>{procudure:string}</b> <br/> Thời gian thực hiện <b>{operationTime:string}</b> <br/> Thời gian kết luận <b>{approveTime:string}</b>  ?',
    invalidApprovalTime:
      'Thời gian thực hiện của ca chụp <b>{type:string}</b> cần theo điều kiện sau: <br/> Thời gian chỉ định + <b>{periodOne:string}</b>p < Thời gian thực hiện <br/> Thời gian thực hiện + <b>{periodTwo:string}</b>p < Thời gian kết luận ',
    isOutOfCapability:
      'Máy thực hiện <b>{name:string}</b> mã số <b>{code:string}</b> <br/> vượt quá định mức bảo hiểm (<b>{insurance:string}</b> / <b>{capability:string}</b>)',
  },
  /**
   * Titles
   */
  titles: {
    createResource: 'Tạo mới {resource:string}',
    editResource: 'Cập nhật {resource:string}',
    deleteResource: 'Xoá {resource:string}',
    splitResource: 'Tách {resource:string}',
    departmentUserList: 'Danh sách người dùng - {department:string}',
    orderStudyInfo: 'Thông tin ca chụp - {patientName:string}',
    resultDiagnosisInfo: 'Kết quả đọc ca',
    modalityList: 'Danh sách máy chụp - {resource:string}',
    contentList: 'Danh sách mẫu chẩn đoán - {resource:string}',
    userGroupMemberList: 'Danh sách người dùng - {userGroup}',
    uploadNonDicom: 'Tải lên',
    uploadOrderFile: 'Tải tệp',
    mergeStudy: 'Ghép ca chụp',
  },
  /**
   * Pagination messages
   */
  pagination: {
    rowsPerPage: 'Số hàng',
    recordsRange: '{start:number}-{end:number}',
    totalRecords: 'tổng số {total: number}',
  },
  /**
   * Gender
   */
  gender: '{gender|{M: Nam, F: Nữ, O: Khác}}',
  no: 'Không',
};

export default messages;
