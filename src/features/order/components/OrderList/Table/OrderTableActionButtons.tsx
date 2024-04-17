import { QuickReadInPanelIcon, ViewImageIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useAppSelector, useKeybinds } from '@/hooks';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO, ORDER_CREATION_TYPE } from '@/types/dto';

import { ViewImageButton } from '../../RadiologyReport/Buttons/ViewImageButton';

import { ConfigTableButton } from './ConfigTableButton';
import { OrderPanelQuickRadiologyButton } from './OrderPanelQuickRadiologyButton';
import { OrderTableButtonOpen } from './OrderTableButtonOpen';

type OrderTableActionButtonsProps = {
  refetch?: () => void;
};

export const OrderTableActionButtons = (props: OrderTableActionButtonsProps) => {
  const { refetch } = props;

  const rowSelected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const orderListFunctions = useOrderListFunctions();
  const { onClick: openImageInNewTab } = useButtonImage({ order: rowSelected });

  const disabledOpenOrder = !rowSelected;
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

  // STUDY INFO
  useKeybinds(
    HOTKEYS.STUDY_INFO.key,
    () => {
      orderListFunctions.openStudyInfoModal(rowSelected?.id);
    },
    { disabled: !rowSelected },
  );

  // MERGE STUDY
  useKeybinds(
    HOTKEYS.MERGE_STUDY.key,
    () => {
      orderListFunctions.openMergeStudyModal(rowSelected?.id);
    },
    { disabled: rowSelected?.creationType !== ORDER_CREATION_TYPE.TAG },
  );

  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          <ViewImageButton
            orders={rowSelected && [rowSelected]}
            IconComponent={<TableSVGIcon IconComponent={ViewImageIcon} />}
            enableKeybind
          />
          {/**
           * Quick lock order
           */}
          <OrderPanelQuickRadiologyButton
            order={rowSelected}
            renderButton={(props) => (
              <IconButtonWithToolTip {...props}>
                <TableSVGIcon
                  IconComponent={QuickReadInPanelIcon}
                  IconComponentProps={{ color: props.disabled ? 'disabled' : 'action' }}
                />
              </IconButtonWithToolTip>
            )}
          />
          {/* <OrderTableButtonQuickLock
            order={rowSelected}
            renderButton={(props) => (
              <IconButtonWithToolTip {...props}>
                <TableSVGIcon
                  IconComponent={ItechQuickReadIcon}
                  IconComponentProps={{ color: props.disabled ? 'disabled' : 'action' }}
                />
              </IconButtonWithToolTip>
            )}
          /> */}

          {/**
           * open order in newtab
           */}
          <OrderTableButtonOpen
            order={rowSelected}
            disabled={disabledOpenOrder}
            enableKeybind
          />

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
          <ConfigTableButton />
          {refetch && <TableRefetchButton refetch={refetch} enableKeybind />}
        </>
      }
    />
  );
};
