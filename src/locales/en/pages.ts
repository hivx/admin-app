// list translations related to layout titles
// Example: Danh sách ca chụp, (Popup) Chọn dịch vụ chụp

import { Translation } from '../i18n-types';

const pages: Translation['pages'] = {
  notModules: {
    title: 'User not have modules to the system',
  },
  login: {
    title: 'Login',
  },
  orderList: {
    title: 'Order list',
    sidebarHeader: 'Order list',
    selectAllOrder: 'Select all orders',
    contextMenu: {
      openInNewTab: 'Open order',
    },
    orderPanelTitle: 'Radiology report - {patientName} ({patientAge}) - {pid}',
  },
  registrationList: { title: 'Registration list' },
  admin: {
    title: 'Administration',
    userAdmin: 'User management',
    roomAdmin: 'Room management',
    diagnosisAdmin: 'Diagnosis management',
    storageAdmin: 'Storage management',
    orderAdmin: 'Order management',
    systemAdmin: 'System management',
    historyAdmin: 'History management',
    procedureAdmin: 'Procedure management',
  },
  result: {
    title: 'Result list',
  },
  examinationList: {
    title: 'Examination List',
    sidebarHeader: 'Modality type list',
  },
  statisticalReport: {
    title: 'Statistical report',
    sidebarHeader: 'Report list',
  },
  summary: {
    title: 'Summary',
  },
  timeTable: {
    title: 'Lịch làm việc',
  },
  template: {
    title: 'User template',
    sidebarTitle: 'Content groups',
  },
  orderReport: {
    orderInfo: 'Order Info',
    actions: {
      approve: 'Approve',
      reApprove: 'Re-approve',
      saveDraft: 'Save draft',
      approveWithTime: 'Approve - set time',
      signReport: 'Create and sign',
      lock: 'Lock',
      deleteLock: 'Unlock',
      deleteLockAndClose: 'Unlock & Close',
      writeReport: 'Write report',
      cancelApprove: 'Cancel approve',
    },
    createReportPdf: 'Create report pdf',
    media: {
      copyToReport: 'Copy to radiology report',
      imageList: 'Image list',
      saveImage: 'Save Image',
      uploadImage: 'Upload Image',
      uploadVideo: 'Upload Video',
      takePicture: 'Shooting (Space)',
      config: {
        title: 'Configuration',
        screen: 'Screen',
        customize: 'Customize',
        width: 'Width',
        height: 'Height',
      },
      attachedImages: 'Attached images',
      autoSaveImage: 'Auto save image',
      createNewSeries: 'Create new series',
      startShooting: 'Start shooting',
    },
    includeSignature: 'Include signature',
    requestProcedure: 'Request procedure',
  },
  reception: {
    title: 'Tiếp đón hình ảnh',
    status: 'Status',
    time: 'Time',
    autoSelectModality: 'Auto select modality',
    autoPrintTicket: 'Auto print ticket',
    printTicket: 'Print ticket',
    receptionInfomation: 'Reception infomation',
    patientInfomation: 'Patient infomation',
    servicesInfomation: 'Procedure infomation',
    pid: 'Patient ID',
    ticket: 'Ticket',
    typePatientId: 'Type PID...',
    currentNumber: 'Current ordinal',
    patientHistory: 'Patient History',
    PID: 'PID',
    optional: 'Optional',
    fullname: 'fullname',
    birthYear: 'birthYear',
    address: 'address',
    gender: 'Gender',
    checkedIn: 'Checked In',
    notCheckedIn: 'Not Checked In',
    female: 'Female',
    male: 'Male',
    confirmAutoPrint: 'Confirm auto print',
    cancel: 'Cancel',
    roomName: 'Room',
  },
  statistic: {
    header: 'Statistic',
    title: 'Synthetic monitor screen',
  },
};

export default pages;
