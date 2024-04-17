import { ButtonViewImageWithOrder } from '@/components/Order/Buttons/ButtonViewImageWithOrder';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { useAppSelector } from '@/hooks';
import { TABLE_ORDER_MOBILE } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { OpenOrderActionButton } from './OpenOrderActionButton';

type MobileOrderActionActionButtonsProps = {
  refetch?: () => void;
};

/**
 *
 * @returns Button ViewImage & Button Refresh for table
 */
export const MobileOrderActionButton = (props: MobileOrderActionActionButtonsProps) => {
  const { refetch } = props;
  const rowSelected = useAppSelector(
    getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER_MOBILE),
  );

  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          {/**
           * Nút xem ảnh
           */}
          <ButtonViewImageWithOrder order={rowSelected} />
          {/**
           * Nút mở ca -> vào màn thông tin ca chụp
           */}
          <OpenOrderActionButton order={rowSelected} />
          {refetch && <TableRefetchButton refetch={refetch} />}
        </>
      }
    />
  );
};
