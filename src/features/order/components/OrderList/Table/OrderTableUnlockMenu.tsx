import { ContextMenuContentShell } from '@/components/Menu/ContextMenuContentShell';
import { useAppSelector } from '@/hooks';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { QuickReportMenuItem } from '../RightClickMenu/QuickReportMenuItem';

/**
 * Define the list of menu items for OrderTable
 */
export const OrderTableUnlockMenu = () => {
  const selectedRow = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  return (
    <ContextMenuContentShell>
      {selectedRow && <QuickReportMenuItem orderID={selectedRow.id} />}
    </ContextMenuContentShell>
  );
};
