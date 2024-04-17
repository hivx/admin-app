import { CardContent, Typography } from '@mui/material';

import { LockIcon } from '@/assets/icon';
import { useTranslate } from '@/hooks';

import { IQmsModalityDTO } from '../../types';

type ModalityCardContentProps = {
  modality: IQmsModalityDTO;
};
export const ModalityCardContent = (props: ModalityCardContentProps) => {
  const translate = useTranslate();
  return (
    <>
      <CardContent sx={{ height: '100%' }}>
        <Typography variant="h5" component="div" sx={{ mb: 1.5, fontWeight: 700 }}>
          {props?.modality.name}
        </Typography>
        <Typography>
          {translate.pages.reception.currentNumber()}: {props?.modality.currentNumber}
        </Typography>
        <Typography>{translate.pages.reception.patientHistory()}:</Typography>
        <Typography>
          {props?.modality.totalCompletedPatients}/{props?.modality.totalPatients}
        </Typography>
        {!props.modality.enabled && <LockIcon fontSize="small" color="primary" />}
      </CardContent>
    </>
  );
};

// lighten(props.theme.palette.primary.main, 0.7)
