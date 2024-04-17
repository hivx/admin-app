import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useAppSelector } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { selectContextMenuMetadata } from '@/stores/contextMenu/contextMenuSlice';
import { IOrderDTO } from '@/types/dto';

import { DeleteOrderMenuItem } from './DeleteOrderMenuItem';
import { DownloadDicomMenuItem } from './DownloadDicomMenuItem';
import { MergeStudyMenuItem } from './MergeStudyMenuItem';
import { SplitOrderMenuItem } from './SplitOrderMenuItem';
import { StudyInfoMenuItem } from './StudyInfoMenuItem';
import { ViewImageMenuItem } from './ViewImageMenuItem';

export type ExaminationRightClickMenuItemProps = {
  order: IOrderDTO;
  closeMenu: () => void;
};

export const ExaminationRightClickMenu = ({ menuID }: { menuID: string }) => {
  const metadata = useAppSelector(selectContextMenuMetadata<IOrderDTO>(menuID));
  const { close } = useContextMenu(menuID);
  return (
    metadata && (
      <ContextPopupController menuID={menuID} type="menu">
        {/**
         * Xem ảnh
         */}
        <ViewImageMenuItem order={metadata} closeMenu={close} />
        {/**
         * Thông tin ca chụp
         */}
        <StudyInfoMenuItem order={metadata} closeMenu={close} />
        {/**
         * Ghép ca chụp
         */}
        <MergeStudyMenuItem order={metadata} closeMenu={close} />
        {/**
         * Tách ca chụp
         */}
        <SplitOrderMenuItem order={metadata} closeMenu={close} />

        {/**
         * Xóa chỉ định
         */}
        <DeleteOrderMenuItem order={metadata} closeMenu={close} />
        {/**
         * Tải ảnh DICOM
         */}
        <DownloadDicomMenuItem order={metadata} closeMenu={close} />
      </ContextPopupController>
    )
  );
};
