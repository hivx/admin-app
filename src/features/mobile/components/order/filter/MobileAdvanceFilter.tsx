import { Modal } from '@mui/material';
import React, { FC } from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure } from '@/hooks';

type MobileAdvanceFilterProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export const MobileAdvanceFilter: FC<MobileAdvanceFilterProps> = (props) => {
  return (
    <Modal open={props.disclosure.isOpen} disableEnforceFocus>
      <AppModalContent
        title={'hehehe'}
        BodyComponent={<div style={{ height: '50dvh' }}>hehehehehe </div>}
        handleClose={props.disclosure.close}
        handleConfirm={props.disclosure.close}
        width="95dvw"
      />
    </Modal>
  );
};
