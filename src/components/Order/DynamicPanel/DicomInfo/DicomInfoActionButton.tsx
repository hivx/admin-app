import { FC } from 'react';

import { ItechDownloadIcon } from '@/assets/icon';
import ItechTransferIcon from '@/assets/icon/TransferIcon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useDownloadDicomImage } from '@/hooks/order/useDownloadDicomImage';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { DeleteStudyButton } from './DeleteStudyButton';
import { SplitOrderButton } from './SplitOrderButton';

type DicomInfoActionButtonProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
};

export const DicomInfoActionButton: FC<DicomInfoActionButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const { buttonIsActive, handleClickOpenNewTab } = useDownloadDicomImage(order);

  return (
    <>
      {/**
       * Download ảnh DICOM
       */}
      <DynamicPanelHeaderButton
        IconComponent={ItechDownloadIcon}
        title={translate.resources.study.downloadStudy()}
        disabled={!buttonIsActive}
        onClick={handleClickOpenNewTab}
      />
      {/**
       * Chuyển ca
       */}
      <DynamicPanelHeaderButton
        IconComponent={ItechTransferIcon}
        title={translate.buttons.labelWithKeyBind({
          buttonName: translate.buttons.transfer(),
          key: HOTKEYS.TRANSFER.title,
        })}
        disabled
        onClick={() => {}}
      />
      {/**
       * Tách ca chụp
       */}
      <SplitOrderButton order={order} />
      {/**
       * Xoá ảnh DICOM
       */}
      <DeleteStudyButton order={order} />
    </>
  );
};
