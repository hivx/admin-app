import React from 'react';

import { MyButton } from '@/components';
import { useDisclosure, useTranslate } from '@/hooks';

import { ModalChangePassword } from './ModalChangePassword';

export const ChangePasswordButtons = () => {
  const disclosure = useDisclosure();
  const translate = useTranslate();
  return (
    <>
      <MyButton variant="contained" onClick={disclosure.open}>
        {translate.buttons.changePassword()}
      </MyButton>
      <ModalChangePassword disclosure={disclosure} />
    </>
  );
};
