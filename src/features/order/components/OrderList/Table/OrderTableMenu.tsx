import { Divider } from '@mui/material';

import { EditPatientIcon } from '@/assets/icon';
import ItechEditStudyInfoIcon from '@/assets/icon/EditStudyInfoIcon';
import ItechPrintExcelIcon from '@/assets/icon/PrintExcelIcon';
import ItechPrintPdfIcon from '@/assets/icon/PrintPdfIcon';
import ItechPrintPortalIcon from '@/assets/icon/PrintPortalIcon';
import ItechRemoveBookmarkIcon from '@/assets/icon/RemoveBookmarkIcon';
import ItechSaveBookmarkIcon from '@/assets/icon/SaveBookmarkIcon';
import ItechStudyCombineIcon from '@/assets/icon/StudyCombineIcon';
import { ContextMenuContentShell } from '@/components/Menu/ContextMenuContentShell';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { QuickReportMenuItem } from '../RightClickMenu/QuickReportMenuItem';

/**
 * Define the list of menu items for OrderTable
 */
export const OrderTableMenu = () => {
  const selectedRow = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const translate = useTranslate();
  return (
    <ContextMenuContentShell>
      {/* {selectedRow && <QuickReportMenuItem orderID={selectedRow.id} />} */}
      <ContextMenuItemShell
        IconComponent={<EditPatientIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.editPatientInfo()}
      />
      <ContextMenuItemShell
        IconComponent={<ItechEditStudyInfoIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.editStudyInfo()}
      />
      <ContextMenuItemShell
        IconComponent={<ItechStudyCombineIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.studyCombine()}
      />
      <Divider />
      <ContextMenuItemShell
        IconComponent={<ItechSaveBookmarkIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.saveBookmark()}
      />
      <ContextMenuItemShell
        IconComponent={<ItechRemoveBookmarkIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.removeBookmark()}
      />
      <Divider />
      <ContextMenuItemShell
        IconComponent={<ItechPrintPortalIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.printPortal()}
      />
      <ContextMenuItemShell
        IconComponent={<ItechPrintExcelIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.printExcel()}
      />
      <ContextMenuItemShell
        IconComponent={<ItechPrintPdfIcon fontSize="small" color="inherit" />}
        MainComponent={translate.buttons.printPdf()}
      />
    </ContextMenuContentShell>
  );
};
