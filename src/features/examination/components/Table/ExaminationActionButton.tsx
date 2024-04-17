import { ButtonViewImageWithOrder } from '@/components/Order/Buttons/ButtonViewImageWithOrder';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { HOTKEYS } from '@/config';
import { useAppSelector, useKeybinds, useTranslate } from '@/hooks';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import { TABLE_EXAMINATION } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { CreateOrderActionButton } from './CreateOrderActionButton';
import { ExaminationDefaultConfigActionButton } from './ExaminationDefaultConfigActionButton';
import { MergeStudyActionButton } from './MergeStudyActionButton';
import { TransferActionButton } from './TransferActionButton';

type OrderTableActionButtonsProps = {
  refetch?: () => void;
};

export const ExaminationActionButton = (props: OrderTableActionButtonsProps) => {
  const { refetch } = props;
  const rowSelected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_EXAMINATION));
  const translate = useTranslate();
  const { onClick: openImageInNewTab } = useButtonImage({ order: rowSelected });

  /**
   * HOTKEYS
   */
  useKeybinds(
    HOTKEYS.VIEW_IMAGE.key,
    () => {
      openImageInNewTab();
    },
    { disabled: !rowSelected },
  );

  // REFRESH
  useKeybinds(HOTKEYS.REFRESH.key, () => {
    refetch && refetch();
  });

  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          <ButtonViewImageWithOrder order={rowSelected} />
          {/**
           * Chuyển ca
           * tính năng chưa hoạt động
           */}
          <TransferActionButton order={rowSelected} />

          {/**
           * Ghép ca chụp
           */}
          <MergeStudyActionButton order={rowSelected} />

          {/**
           * Tạo chỉ định
           */}
          <CreateOrderActionButton />
          <ExaminationDefaultConfigActionButton />
          {refetch && <TableRefetchButton refetch={refetch} enableKeybind />}
        </>
      }
    />
  );
};
