import { Icon } from '@mui/material';
import { ComponentProps } from 'react';
import urlJoin from 'url-join';

import { useGetOneDicomMutation } from '@/api/study';
import { BASE_URL, HOTKEYS } from '@/config';
import { ROUTE_DOWNLOAD } from '@/features/dowloadDicom';
import { IOrderDTO } from '@/types/dto';
import { downloadFileFromBlob } from '@/utils/fileUtils';
import { uuidv4 } from '@/utils/uuidv4';

import { useKeybinds } from '../useKeybinds';

/**
 * Hook to download dicom image button
 */
export const useDownloadDicomImage = (order?: IOrderDTO, onCloseMenu?: () => void) => {
  const [triggerGetOneDicom, { isLoading }] = useGetOneDicomMutation();
  const url = urlJoin(
    BASE_URL,
    ROUTE_DOWNLOAD,
    String(order?.study?.id),
    `?fileName=${order?.study?.studyInstanceUID}`,
  );
  const handleDownloadDicomImage = async () => {
    onCloseMenu && onCloseMenu();
    try {
      const data = await triggerGetOneDicom({
        studyID: order?.study?.id ?? 0,
        // contentType: 'application/zip',
      }).unwrap();
      if (data && !isLoading) {
        downloadFileFromBlob(data, `${order?.study?.studyInstanceUID ?? uuidv4()}.zip`);
      }
    } catch (e) {
      return undefined;
    }
  };

  const handleClickOpenNewTab = () => {
    order?.study?.id && window.open(url, '_blank');
  };
  const buttonIsActive = order?.study?.id;
  const iconColor: ComponentProps<typeof Icon>['color'] = buttonIsActive
    ? 'action'
    : 'disabled';
  useKeybinds(HOTKEYS.DOWNLOAD_DICOM_IMAGE.key, () => handleDownloadDicomImage(), {
    disabled: !buttonIsActive,
  });
  return { buttonIsActive, iconColor, handleDownloadDicomImage, handleClickOpenNewTab };
};
