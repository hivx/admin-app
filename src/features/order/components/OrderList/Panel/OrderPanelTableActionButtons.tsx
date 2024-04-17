import ItechScaleIcon from '@/assets/icon/ScaleIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';

import OrderPanelCompareStudyButton from './OrderPanelCompareStudyButton';

type OrderPanelTableActionButtonsProps = {
  rowSelected: boolean;
  refetch?: () => void;
};

export const OrderPanelTableActionButtons = (
  props: OrderPanelTableActionButtonsProps,
) => {
  const { refetch, rowSelected } = props;
  const translate = useTranslate();
  return (
    <TableActionButtonsShell
      ActionsButton={
        <>
          <OrderPanelCompareStudyButton />
          <IconButtonWithToolTip
            title={translate.buttons.compare()}
            onClick={() => {}}
            disabled={true}
          >
            <TableSVGIcon
              IconComponent={ItechScaleIcon}
              IconComponentProps={{ color: 'disabled' }}
            />
          </IconButtonWithToolTip>
          {refetch && <TableRefetchButton refetch={refetch} />}
        </>
      }
    />
  );
};
