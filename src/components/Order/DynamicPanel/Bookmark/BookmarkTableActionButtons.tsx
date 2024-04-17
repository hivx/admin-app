import { ViewImageIcon } from '@/assets/icon';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAppSelector } from '@/hooks';
import { TABLE_BOOKMARK } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IBookmarkDTO } from '@/types/dto';

import { OrderTableButtonOpen } from '../../../../features/order/components/OrderList/Table/OrderTableButtonOpen';
import { ViewImageButton } from '../../../../features/order/components/RadiologyReport/Buttons/ViewImageButton';

import EditBookmarkFolderButton from './EditBookmarkFolderButton';

type BookmarkTableActionButtonsProps = {
  refetch?: () => void;
};

export const BookmarkTableActionButtons = (props: BookmarkTableActionButtonsProps) => {
  const { refetch } = props;
  const rowSelected = useAppSelector(getCurrentSelectedRow<IBookmarkDTO>(TABLE_BOOKMARK));

  const disabledOpenOrder = !rowSelected;

  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          <ViewImageButton
            orders={rowSelected?.order ? [rowSelected.order] : []}
            IconComponent={
              <TableSVGIcon
                IconComponent={ViewImageIcon}
                IconComponentProps={{ color: 'inherit' }}
              />
            }
          />
          {/**
           * open order in newtab
           */}
          <OrderTableButtonOpen order={rowSelected?.order} disabled={disabledOpenOrder} />

          {/* 
          //TODO FEATURE
          <IconButtonWithToolTip
            title={translate.buttons.labelWithKeyBind({
              buttonName: translate.buttons.transfer(),
              key: HOTKEYS.TRANSFER.title,
            })}
            onClick={() => {
              console.log('check here');
            }}
            disabled
          >
            <TableSVGIcon
              IconComponent={ItechTransferIcon}
              IconComponentProps={{ color: 'disabled' }}
            />
          </IconButtonWithToolTip> */}
          {/* <OrderTableButtonMenu disabled /> */}
          {/* 
          //TODO FEATURE
          <IconButtonWithToolTip
            title={translate.buttons.labelWithKeyBind({
              buttonName: translate.buttons.takePicture(),
              key: HOTKEYS.TAKE_IMAGE_DICOM.title,
            })}
            onClick={() => console.log('tuỳ chỉnh')}
            disabled
          >
            <TableSVGIcon
              IconComponent={ItechConfigIcon}
              IconComponentProps={{ color: 'inherit', fontSize: 'small' }}
            />
          </IconButtonWithToolTip> */}
          <EditBookmarkFolderButton />
          {refetch && <TableRefetchButton refetch={refetch} />}
        </>
      }
    />
  );
};
