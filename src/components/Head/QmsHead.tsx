import { useTheme } from '@mui/material';
import React from 'react';

import { Head } from '@/components';
import { HOSPITAL_NAME } from '@/config';

type QmsHeadProps = {
  customTitle?: string;
};
const QmsHead = (props: QmsHeadProps) => {
  const theme = useTheme();

  const qmsTitle = props.customTitle
    ? `${props.customTitle} | ${HOSPITAL_NAME} QMS`
    : ` ${HOSPITAL_NAME} QMS`;

  const qmsIcon = theme.qms?.images.favicon;

  return <Head title={qmsTitle} srcIcon={qmsIcon} />;
};

export default QmsHead;
