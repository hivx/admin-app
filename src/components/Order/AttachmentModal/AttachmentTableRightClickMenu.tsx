import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useAppSelector } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { selectContextMenuMetadata } from '@/stores/contextMenu/contextMenuSlice';
import { IOrderDTO, IOrderFileDTO } from '@/types/dto';

import { DeleteAttachmentMenuItem } from './DeleteAttachmentMenuItem';
import { DownloadAttachmentMenuItem } from './DownloadAttachmentMenuItem';
import { UploadAttachmentMenuItem } from './UploadAttachmentMenuItem';

export const AttachmentTableRightClickMenu = (props: {
  menuID?: string;
  orderID: IOrderDTO['id'];
}) => {
  const { menuID, orderID } = props;
  const metadata = useAppSelector(selectContextMenuMetadata<IOrderFileDTO>(menuID));

  const { close } = useContextMenu(menuID);

  return (
    metadata && (
      <ContextPopupController menuID={menuID} type="menu">
        {/**
         * Upload attachment button
         */}
        <UploadAttachmentMenuItem orderID={orderID} closeMenu={close} />
        {/**
         * Download attachment button
         */}
        <DownloadAttachmentMenuItem closeMenu={close} metaData={metadata} />
        {/**
         * Delete attachment button
         */}
        <DeleteAttachmentMenuItem
          orderID={orderID}
          closeMenu={close}
          metaData={metadata}
        />
      </ContextPopupController>
    )
  );
};
