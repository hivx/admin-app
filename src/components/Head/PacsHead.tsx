import React from 'react';

import { Head } from '@/components';
import { HOSPITAL_NAME } from '@/config';
import { useGetHospitalLogo } from '@/hooks/useGetHospitalLogo';

type PacsHeadProps = {
  customTitle?: string;
};
const PacsHead = (props: PacsHeadProps) => {
  const { pacsIcon } = useGetHospitalLogo();
  const pacsTitle = props.customTitle
    ? `${props.customTitle} | ${HOSPITAL_NAME} PACS`
    : ` ${HOSPITAL_NAME} PACS`;

  return <Head title={pacsTitle} srcIcon={pacsIcon} />;
};

export default PacsHead;
