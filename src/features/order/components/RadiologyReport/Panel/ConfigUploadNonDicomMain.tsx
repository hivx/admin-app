import React from 'react';

import { useDisclosure } from '@/hooks';

import ConfigUploadNonDicomButton from '../../../../../components/Order/UploadNonDicom/ConfigUploadNonDicomButton';

import { ConfigUploadNonDicomModal } from './Modal/ConfigUploadNonDicomModal';

/**
 * @default state False(close modal)
 * When user click button(ConfigUploadNonDicomButton) will change state on/off modal(ConfigUploadNonDicomModal)
 */
const ConfigUploadNonDicomMain = () => {
  const disclosure = useDisclosure();
  return (
    <>
      <ConfigUploadNonDicomButton disclosure={disclosure} />
      {disclosure.isOpen && <ConfigUploadNonDicomModal disclosure={disclosure} />}
    </>
  );
};

export default ConfigUploadNonDicomMain;
