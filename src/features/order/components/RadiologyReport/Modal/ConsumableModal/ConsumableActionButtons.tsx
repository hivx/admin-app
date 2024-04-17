import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { PenIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { CreateUpdateConsumableModal } from '@/components/Order/Consumable/CreateUpdateConsumableModal';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { TableRefetchButton } from '@/components/Table/TableRefetchButton';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';

import { useCurrentOrderID } from '../../../../providers';

export const ConsumableActionButtons = ({ refetch }: { refetch: () => void }) => {
  const translate = useTranslate();
  const disclosure = useDisclosure();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data: request } = useGetOneOrderRequestQuery({ orderID, requestID });
  return (
    <>
      <TableActionButtonsShell
        ActionsButton={
          <>
            <TableRefetchButton refetch={refetch} />
            {/**
             * Nút cập nhật,mở popup cập nhật VTTH
             */}
            <IconButtonWithToolTip
              title={translate.buttons.update()}
              onClick={disclosure.open}
            >
              <TableSVGIcon
                IconComponent={PenIcon}
                IconComponentProps={{ color: 'inherit' }}
              />
            </IconButtonWithToolTip>
          </>
        }
      />
      <CreateUpdateConsumableModal disclosure={disclosure} request={request} />
    </>
  );
};
