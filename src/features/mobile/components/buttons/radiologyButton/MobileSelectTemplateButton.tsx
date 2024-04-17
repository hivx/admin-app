import React from 'react';

import { ItechContentTemplateIcon } from '@/assets/icon';
import { useAppDispatch, useAppSelector, useDisclosure } from '@/hooks';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';
import { TABLE_SELECT_TEMPLATE } from '@/stores/table/tableInitialState';
import { setTableFilter } from '@/stores/table/tableSlice';

import { MobileRadiologySelectTemplateModal } from '../../modals/selectTemplateModal/MobileRadiologySelectTemplateModal';
import { MobileIconButton } from '../MobileIconButton';

import { MobileRadiologyButtonProps } from './RadiologyButton.styles';

/**
 * Nút Chọn mẫu KQ
 * Màn viết KQ
 */
export const MobileSelectTemplateButton = ({ order }: MobileRadiologyButtonProps) => {
  const dispatch = useAppDispatch();
  const currentRequestID = useAppSelector(selectCurrentRequestID(order.id));
  const {
    isOpen: isOpenModalSelect,
    open: openModalSelect,
    close: closeModalSelect,
  } = useDisclosure(false);

  const requestFromRequestID = order?.requests?.find(
    (request) => request.id === currentRequestID,
  );

  const modalityType = order?.modalityType;
  //Set filter 1st for table select & open modal
  const handleClickOpenSelectModal = async () => {
    dispatch(
      setTableFilter({
        tableId: TABLE_SELECT_TEMPLATE,
        filter: {
          name: '',
          procedureID: requestFromRequestID?.procedure?.id,
          modalityTypes: modalityType ? [modalityType] : [],
        },
        merge: true,
      }),
    );

    openModalSelect();
  };

  return (
    <>
      <MobileIconButton
        IconComponent={<ItechContentTemplateIcon />}
        onClick={handleClickOpenSelectModal}
      />
      {isOpenModalSelect && (
        <MobileRadiologySelectTemplateModal
          order={order}
          closeModal={closeModalSelect}
          isOpen={isOpenModalSelect}
          request={requestFromRequestID}
          modalityType={modalityType}
        />
      )}
    </>
  );
};
