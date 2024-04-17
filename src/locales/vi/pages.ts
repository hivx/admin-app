// list translations related to layout titles
// Example: Danh sách ca chụp, (Popup) Chọn dịch vụ chụp

import { Menu } from '../../types';

const pages = {
  notModules: {
    title: 'Người dùng không có quyền truy cập vào hệ thống',
  },
  login: {
    title: 'Đăng nhập',
  },
  [Menu.ORDER_LIST]: {
    title: 'Đọc ảnh',
    sidebarHeader: 'Danh sách ca chụp',
    selectAllOrder: 'Tất cả ca chụp',
    contextMenu: {
      openInNewTab: 'Nhận ca',
    },
    orderPanelTitle: '{patientName:string} ({patientAge:string}) - {pid:string}',
  },
  [Menu.REGISTRATION_LIST]: {
    title: 'Tiếp đón',
  },
  [Menu.ADMIN]: {
    title: 'Quản trị hệ thống',
    userAdmin: 'Quản lý người dùng',
    roomAdmin: 'Quản lý phòng chụp',
    diagnosisAdmin: 'Quản lý chẩn đoán',
    storageAdmin: 'Quản lý lưu trữ',
    orderAdmin: 'Quản lý ca chụp',
    systemAdmin: 'Quản lý hệ thống',
    historyAdmin: 'Quản lý nhật ký',
    procedureAdmin: 'Quản lý chụp',
  },
  [Menu.RESULT]: {
    title: 'Trả kết quả',
  },
  [Menu.STATISTICAL_REPORT]: {
    title: 'Báo cáo thống kê',
    sidebarHeader: 'Danh sách báo cáo',
  },
  [Menu.EXAMINATION]: {
    title: 'Phòng chụp',
    sidebarHeader: 'Danh sách loại ca',
  },
  [Menu.SUMMARY]: {
    title: 'Tổng hợp',
  },
  [Menu.TIMETABLE]: {
    title: 'Lịch làm việc',
  },
  [Menu.TEMPLATE]: {
    title: 'Mẫu cá nhân',
    sidebarTitle: 'Danh sách nhóm mẫu',
  },
  orderReport: {
    orderInfo: 'Thông tin ca chụp',
    actions: {
      approve: 'Duyệt',
      reApprove: 'Duyệt lại',
      saveDraft: 'Lưu nháp',
      approveWithTime: 'Duyệt - Chọn ngày',
      signReport: 'Tạo và ký',
      lock: 'Nhận ca',
      deleteLock: 'Bỏ nhận ca',
      deleteLockAndClose: 'Bỏ nhận ca & Đóng',
      writeReport: 'Viết kết quả',
      cancelApprove: 'Hủy duyệt',
    },
    createReportPdf: 'Tạo kết quả',
    media: {
      copyToReport: 'Copy ra kết quả',
      imageList: 'Danh sách ảnh đã chụp',
      saveImage: 'Lưu ảnh',
      uploadImage: 'Tải ảnh',
      uploadVideo: 'Tải ảnh / video',
      takePicture: 'Chụp ảnh',
      config: {
        title: 'Cấu hình khung chụp',
        screen: 'Màn hình',
        customize: 'Tuỳ chỉnh',
        width: 'Chiều rộng',
        height: 'Chiều cao',
      },
      attachedImages: 'Đính kèm ảnh',
      autoSaveImage: 'Tự động lưu ảnh',
      createNewSeries: 'Tạo series mới',
      startShooting: 'Bắt đầu chụp',
    },
    requestProcedure: 'Yêu cầu dịch vụ',
    includeSignature: 'Thêm ảnh chữ ký bác sĩ',
  },
  reception: {
    title: 'Tiếp đón hình ảnh',
    status: 'Trạng thái',
    time: 'Thời gian',
    autoSelectModality: 'Tự động chọn máy',
    autoPrintTicket: 'Tự động in phiếu',
    printTicket: 'In phiếu',
    receptionInfomation: 'Thông tin tiếp đón',
    patientInfomation: 'Thông tin bệnh nhân',
    servicesInfomation: 'Thông tin dịch vụ chụp',
    pid: 'Mã bệnh nhân',
    ticket: 'Phiếu in',
    typePatientId: 'Nhập mã bệnh nhân...',
    currentNumber: 'STT hiện tại',
    patientHistory: 'BN đã thực hiện',
    PID: 'PID',
    optional: 'Tùy chọn',
    fullname: 'Họ tên',
    birthYear: 'Năm sinh',
    address: 'Địa chỉ',
    gender: 'Giới tính',
    checkedIn: 'Đã xếp số',
    notCheckedIn: 'Chưa xếp số',
    female: 'Nữ',
    male: 'Nam',
    confirmAutoPrint: 'Xác nhận in tự động',
    cancel: 'Hủy',
    roomName: 'Phòng',
  },
  statistic: {
    header: 'Thống kê',
    title: 'Màn hình theo dõi tổng hợp',
  },
};

export default pages;
