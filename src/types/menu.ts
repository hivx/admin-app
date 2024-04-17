export enum Menu {
  /**
   * danh sach ca chup
   */
  ORDER_LIST = 'orderList',
  /**
   * le tan
   */
  REGISTRATION_LIST = 'registrationList',
  /**
   * Quan tri
   */
  ADMIN = 'admin',
  /**
   * Tra ket qua
   */
  RESULT = 'result',
  /**
   * Phong chup
   */
  EXAMINATION = 'examinationList',
  /**
   * Báo cáo thống kê
   */
  STATISTICAL_REPORT = 'statisticalReport',
  /**
   * Tổng hợp
   */
  SUMMARY = 'summary',
  /**
   * Lịch làm việc
   */
  TIMETABLE = 'timeTable',
  /**
   * Mẫu kết quả
   */
  TEMPLATE = 'template',
}

export type MenuItem = {
  name: `${Menu}`;
  route: string;
};
