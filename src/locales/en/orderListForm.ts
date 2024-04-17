import { OrderListForm } from '../../features/order/types';
import { Translation } from '../i18n-types';
// list translations related to filter form
// Example: Tên bệnh nhân, mã bệnh nhân, mã chỉ định,...

const orderListForm: Translation['orderListForm'] = {
  [OrderListForm.START_DATE]: {
    title: 'Start date',
  },
  [OrderListForm.END_DATE]: {
    title: 'End date',
  },
  [OrderListForm.PATIENT_NAME]: {
    title: 'Name patient',
  },
  [OrderListForm.PATIENT_ID]: {
    title: 'Patient ID',
  },
  [OrderListForm.ORDER_ID]: {
    title: 'Order ID',
  },
  [OrderListForm.READING_STATUS]: {
    title: 'Reading status',
  },
  [OrderListForm.DOCTOR_READER]: {
    title: 'Doctor reader',
  },
  [OrderListForm.REFERRING_PHYSICAIN_NAME]: {
    title: 'Refferring physicain name',
  },
  [OrderListForm.REQUESTED_DEPARTMENT_NAME]: {
    title: 'Requested department name',
  },
};

export default orderListForm;
