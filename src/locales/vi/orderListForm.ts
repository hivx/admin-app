// list translations related to filter form
// Example: Tên bệnh nhân, mã bệnh nhân, mã chỉ định,...

import { OrderListForm } from '../../features/order/types';

const orderListForm = {
  [OrderListForm.START_DATE]: {
    title: 'Ngày bắt đầu',
  },
  [OrderListForm.END_DATE]: {
    title: 'Ngày kết thúc',
  },
  [OrderListForm.PATIENT_NAME]: {
    title: 'Tên bệnh nhân',
  },
  [OrderListForm.PATIENT_ID]: {
    title: 'Mã bệnh nhân',
  },
  [OrderListForm.ORDER_ID]: {
    title: 'Mã chỉ định',
  },
  [OrderListForm.READING_STATUS]: {
    title: 'Trạng thái đọc',
  },
  [OrderListForm.DOCTOR_READER]: {
    title: 'Bác sĩ đọc',
  },
  [OrderListForm.REFERRING_PHYSICAIN_NAME]: {
    title: 'Bác sĩ chỉ định',
  },
  [OrderListForm.REQUESTED_DEPARTMENT_NAME]: {
    title: 'Khoa chỉ định',
  },
};

export default orderListForm;
