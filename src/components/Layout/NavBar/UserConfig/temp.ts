import { GeneralSettingKey } from '@/types/dto/setting';

export type GeneralItemDescription = {
  title: string;
  description: string;
};

export enum UserConfigTab {
  CommonConfig = 'CommonConfig',
  ShortcutConfig = 'ShortcutConfig',
  OrderTableConfig = 'OrderTableConfig',
}

export const exampleData: Record<`${GeneralSettingKey}`, GeneralItemDescription> = {
  autoLockOrder: {
    title: 'Tự động nhận ca',
    description: 'Khi mở ca, hệ thống sẽ tự động nhận ca chụp để viết kết quả',
  },
  autoOpenViewer: {
    title: 'Tự động xem ảnh',
    description: 'Khi mở ca, hệ thống sẽ tự động hiển thị màn hình viewer xem hình chụp',
  },
  showDiagnosisPanel: {
    title: 'Viết kết quả nhanh',
    description: 'Hiển thị màn hình viết kết quả trên cùng màn hình danh sách ca chụp',
  },
  autoSelectTemplate: {
    title: 'Tự động chọn mẫu kết quả',
    description: 'Khi nhận ca viết kết quả, hệ thống tự động chọn mẫu kết quả ưu tiên',
  },
  preferPersonalTemplate: {
    title: 'Ưu tiên chọn mẫu cá nhân',
    description: 'Khi nhận ca viết kết quả, hệ thống tự ưu tiên tìm mẫu kết quả cá nhân',
  },
  doubleClickToOpenViewer: {
    title: 'Mở ca khi double click vào chỉ định',
    description:
      'Khi double-click vào ca chụp, hệ thống sẽ bật tab mở ca. Mặc định bật viewer',
  },
};
