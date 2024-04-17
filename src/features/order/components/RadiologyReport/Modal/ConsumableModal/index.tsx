import { Modal } from '@mui/material';
import { useMemo, useState } from 'react';

import { useGetListConsumableQuery } from '@/api/consumable';
import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { useRadiologyApproveReportButton } from '@/hooks/radiology/useRadiologyApproveReportButton';
import { selectCurrentRequestID } from '@/stores/OrderRadiology';

import { useCurrentOrderID, useRegisterRadiologyFunctions } from '../../../../providers';

import { ConsumableContent } from './ConsumableContent';

/**
 * Popup hiển thị danh sách VTTH của dịch vụ chụp
 */
export const ConsumableModal = () => {
  const register = useRegisterRadiologyFunctions();
  const translate = useTranslate();
  const disclosure = useDisclosure();
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data } = useGetListConsumableQuery(
    {
      filter: { requestID },
    },
    { skip: !disclosure.isOpen },
  );
  const { onClick } = useRadiologyApproveReportButton();
  const [isClickedApproveButton, setIsClickApproveButton] = useState(false);
  const hasConsumable = useMemo(() => data?.list.length !== 0, [data?.list.length]);
  const hideConfirmButton = isClickedApproveButton ? !hasConsumable : true;
  const openModalMedicalEquipment = (clickedFromApproveButton?: boolean) => {
    setIsClickApproveButton(clickedFromApproveButton ?? false);
    disclosure.open();
  };
  register('openModalMedicalEquipment', openModalMedicalEquipment);

  return disclosure.isOpen ? (
    <Modal open={disclosure.isOpen}>
      <AppModalContent
        BodyComponent={<ConsumableContent />}
        title={translate.resources.consumable.title()}
        handleClose={disclosure.close}
        handleConfirm={(e) => {
          disclosure.close();
          onClick(e);
        }}
        ConfirmButton={hideConfirmButton && <></>}
        confirmLabel={translate.buttons.approve()}
        width="700px"
      />
    </Modal>
  ) : (
    <></>
  );
};
