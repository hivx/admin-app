import { Modal } from '@mui/material';
import React, { FC } from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import { IOrderRequestDTO } from '@/types/dto';

import { CreateUpdateConsumableContent } from './CreateUpdateConsumableContent';

type CreateUpdateConsumableModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
  request?: IOrderRequestDTO;
};

/**
 * Popup hiển thị danh sách VTTH của dịch vụ chụp
 */
export const CreateUpdateConsumableModal: FC<CreateUpdateConsumableModalProps> = ({
  disclosure,
  request,
}) => {
  const translate = useTranslate();
  return (
    <Modal open={disclosure.isOpen}>
      <AppModalContent
        BodyComponent={request && <CreateUpdateConsumableContent request={request} />}
        title={translate.messages.titles.editResource({
          resource: translate.resources.consumable.title(),
        })}
        handleClose={disclosure.close}
        ConfirmButton={<></>}
        handleConfirm={() => {}}
        width="700px"
      />
    </Modal>
  );
};
