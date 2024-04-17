import { ButtonViewImageWithOrder } from '@/components/Order/Buttons/ButtonViewImageWithOrder';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { HOTKEYS } from '@/config';
import { useAppSelector, useKeybinds, useTranslate } from '@/hooks';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import { TABLE_RESULT } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

type ResultActionButtonsProps = {
  refetch?: () => void;
};

export const ResultActionButtons = (props: ResultActionButtonsProps) => {
  const { refetch } = props;
  const rowSelected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_RESULT));
  const { onClick: openImageInNewTab } = useButtonImage({ order: rowSelected });

  // bind for result table
  useKeybinds(
    HOTKEYS.VIEW_IMAGE.key,
    () => {
      openImageInNewTab();
    },
    { disabled: !rowSelected },
  );

  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          <ButtonViewImageWithOrder order={rowSelected} />
          {refetch && <TableRefetchButton refetch={refetch} enableKeybind />}
        </>
      }
    />
  );
};
