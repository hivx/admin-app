import { Divider, Typography, styled, lighten } from '@mui/material';

import { ItechPrintPortalIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ContextPopupController } from '@/components/Menu/ContextPopupController';
import { useAppSelector, useTranslate } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import { selectContextMenuMetadata } from '@/stores/contextMenu/contextMenuSlice';
import { IOrderDTO } from '@/types/dto';

import { CompareStudyMenuItem } from './CompareStudyMenuItem';
import { DeleteLockOrderMenu } from './DeleteLockOrderMenu';
import { DeleteOrderMenuItem } from './DeleteOrderMenuItem';
import { DownloadDicomImage } from './DowloadDicomImage';
import { OpenOrderMenuItem } from './LockOrderMenu';
import MergeStudyMenuItem from './MergeStudyMenuItem';
import { PrintImageDicomMenuItem } from './PrintImageDicomMenuItem';
// import { QuickReportMenuItem } from './QuickReportMenuItem';
import { SaveBookmarkMenuItem } from './SaveBookmarkMenuItem';
import { StudyInfoMenuItem } from './StudyInfoMenuItem';
import { ViewImageMenuItem } from './ViewImageMenuItem';

export const RightClickMenu = (props: { menuID?: string }) => {
  const { menuID } = props;
  // const selected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const metadata = useAppSelector(selectContextMenuMetadata<IOrderDTO>(menuID));
  const { close } = useContextMenu(menuID);

  const translate = useTranslate();

  return (
    metadata && (
      <ContextPopupController menuID={menuID} type="menu">
        {/* View image */}
        <ViewImageMenuItem order={metadata} />
        {/**
         *  Deep view image
         */}
        {/* <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechCompareIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">
              {translate.buttons.depthViewImage()}
            </Typography>
          }
          hotkeyString="Alt + 8"
        /> */}
        {/**
         * Compare order
         */}
        <CompareStudyMenuItem metadata={metadata} closeMenu={close} />
        {/**
         * Open order in new tab
         */}
        <OpenOrderMenuItem metadata={metadata} closeMenu={close} />
        {/**
         * Quick lock order
         */}
        {/* <QuickReportMenuItem orderID={metadata.id} closeMenu={close} /> */}
        {/**
         * Delete lock order
         */}
        <DeleteLockOrderMenu metadata={metadata} closeMenu={close} />
        <StyledDivider />
        {/**
         *  Study info
         */}
        <StudyInfoMenuItem orderID={metadata.id} closeMenu={close} />

        {/**
         * Delete order
         */}
        <DeleteOrderMenuItem order={metadata} closeMenu={close} />
        {/**
         * Transfer button
         */}
        {/* <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechTransferIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">{translate.buttons.transfer()}</Typography>
          }
          hotkeyString="Alt + R"
        /> */}
        {/* Section 2 */}
        {/**
         * Merge Study button
         */}
        <MergeStudyMenuItem order={metadata} closeMenu={close} />
        <StyledDivider />
        {/*Print image dicom */}
        <PrintImageDicomMenuItem order={metadata} closeMenu={close} />
        {/**
         * Dowload Dicom
         */}
        <DownloadDicomImage order={metadata} closeMenu={close} />
        {/** Print portal button */}
        <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechPrintPortalIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">
              {translate.buttons.printPortal()}
            </Typography>
          }
        />
        <StyledDivider />
        {/**
         * Add/delete bookmark button group
         * Chua co chuc nang tam thoi disable
         */}
        <SaveBookmarkMenuItem order={metadata} closeMenu={close} />
        {/**
         * Delete bookmark button
         */}
        {/* <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechRemoveBookmarkIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">
              {translate.buttons.removeBookmark()}
            </Typography>
          }
        /> */}
        {/* // Print exel button
        <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechPrintExcelIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">
              {translate.buttons.printExcel()}
            </Typography>
          }
        />
        // Print pdf button
        <ContextMenuItemShell
          MenuItemProps={{ disabled: true }}
          IconComponent={<ItechPrintPdfIcon fontSize="small" color="disabled" />}
          MainComponent={
            <Typography color="text.disabled">{translate.buttons.printPdf()}</Typography>
          } */}
      </ContextPopupController>
    )
  );
};

const StyledDivider = styled(Divider)`
  border-color: ${(props) => lighten(props.theme.palette.text.primary, 0.6)};
`;
