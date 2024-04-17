import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Typography, styled } from '@mui/material';
import React, { FC, useRef } from 'react';

import { useDeleteOrderRequestMutation } from '@/api/order';
import DeleteIcon from '@/assets/icon/DeleteIcon';
import ItechEditIcon from '@/assets/icon/EditIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { ActionComponentWithMenu } from '@/components/Table/ActionComponentWithMenu';
import { useAppDispatch, useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { deleteOrderRequestData } from '@/stores/examinnation/createOrderSlice';
import { IOrderDTO, IOrderRequestDTO, IProcedureDTO } from '@/types/dto';

type RequestItemMenuProps = {
  readonly: boolean;
  order?: IOrderDTO;
  accessionNumber: IOrderDTO['accessionNumber'];
  proceduresDisplay: (IProcedureDTO | null)[];
  requests?: IOrderRequestDTO[];
  setLocalProcedures: React.Dispatch<React.SetStateAction<(IProcedureDTO | null)[]>>;
  localProcedures: (IProcedureDTO | null)[];
  procedure: IProcedureDTO | null;
};

/**
 * Component with menu edit/delete request
 * User in OrderInfoRequestAutoCompleteField
 */
export const RequestMenuWrapper: FC<RequestItemMenuProps> = ({
  readonly,
  order,
  accessionNumber,
  proceduresDisplay,
  requests,
  localProcedures,
  setLocalProcedures,
  procedure,
}) => {
  const ref = useRef<HTMLElement>(null);
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const userPermission = useUserPermission();
  const orderListFunctions = useOrderListFunctions();
  const [deleteOrderRequest] = useDeleteOrderRequestMutation();
  const notifyModal = useNotifyModal();
  const notifyDeleteSuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.order.requests().toLowerCase(),
    }),
  );

  const request = requests?.find((request) => request.procedure?.id === procedure?.id);

  const orderFromHIS = order?.creationType === 'HIS';

  /**
   * Nếu order từ HIS, logic disabled phụ thuộc vào quyền của user
   * Nếu order không từ HIS,Logic disabled theo biến readonly của form
   */
  const disabledMenu = orderFromHIS ? !userPermission?.userCanEditOrder : readonly;

  /**
   * Nếu có request từ order ,
   * canDeleteRequest phụ thuộc thêm điều kiện finalApprovedTime của request
   */
  const canDeleteRequestRIS = request
    ? userPermission?.userCanDeleteOrder && !request.finalApprovedTime
    : userPermission?.userCanDeleteOrder;

  const canDeleteRequest = orderFromHIS ? false : canDeleteRequestRIS;

  /**
   * Control modify selected procedure
   * @param procedure
   */
  const handleEditRequest = (procedure: IProcedureDTO | null) => {
    orderListFunctions.openEditRequestModal(procedure, order, accessionNumber);
  };

  /**
   * Delete selected procedure with procedure id
   * @param id
   */
  const handleDeleteRequest = (id: IProcedureDTO['id']) => {
    const procedure = proceduresDisplay.find((option) => option?.id === id);
    const requestID = requests?.find(
      (request) => request.procedure?.id === procedure?.id,
    )?.id;
    notifyModal({
      message: `${translate.messages.notification.deleteRequest({
        name: `${procedure?.name}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: async () => {
          if (order && requestID) {
            const res = await deleteOrderRequest({
              orderID: order.id,
              requestID: requestID,
            });
            if ('error' in res) {
              notifyDeleteError();
            } else {
              notifyDeleteSuccess();
            }
          } else {
            setLocalProcedures(
              localProcedures.filter((item) => item?.id !== procedure?.id),
            );
            dispatch(deleteOrderRequestData(procedure?.id));
            notifyDeleteSuccess();
          }
        },
      },
    });
  };

  /**
   * Check condition show/hide edit button
   * @param procedureID
   * @returns boolean
   */
  const showEditButton = (procedureID: IProcedureDTO['id']) => {
    const currentRequest = requests?.find(
      (request) => request.procedure?.id === procedureID,
    );
    if (currentRequest?.finalReportID) {
      return false;
    }
    return true;
  };
  const notifyDeleteError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.order.requests().toLowerCase(),
    }),
  );

  return (
    <ActionComponentWithMenu
      anchorRef={ref}
      MyMenuProps={{
        transformOrigin: { horizontal: 'left', vertical: 'top' },
        anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
      }}
      ListMenu={
        <>
          <ContextMenuItemShell
            MenuItemProps={{
              disabled: !showEditButton(procedure?.id ?? 0),
              onClick: () => {
                handleEditRequest(procedure);
              },
            }}
            MainComponent={
              <StyledMenuItem>
                <ItechEditIcon />
                <Typography>{translate.studyInfo.editRequest.short()}</Typography>
              </StyledMenuItem>
            }
            isDisplayIcon={false}
          />
          <ContextMenuItemShell
            MenuItemProps={{
              disabled: !canDeleteRequest,
              onClick: () => {
                handleDeleteRequest(procedure?.id ?? 0);
              },
            }}
            MainComponent={
              <StyledMenuItem>
                <DeleteIcon />
                <Typography>{translate.studyInfo.deleteRequest()}</Typography>
              </StyledMenuItem>
            }
            isDisplayIcon={false}
          />
        </>
      }
      ActionComponent={
        <IconButtonWithToolTip size="small">
          {!disabledMenu && <MoreHorizIcon />}
        </IconButtonWithToolTip>
      }
    />
  );
};

const StyledMenuItem = styled('div')`
  display: flex;
  direction: 'row';
  gap: ${(props) => props.theme.spacing(1)};
  .MuiSvgIcon-root {
    color: ${(props) => props.theme.pacs?.customColors.iconDefaultColor};
  }
`;
