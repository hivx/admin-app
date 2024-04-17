import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IPatientDTO } from '@/types/dto';

import OrderInfoTypography from './OrderInfoTypography';

type OrderPanelGenderFieldProps = {
  gender?: IPatientDTO['gender'];
};

const OrderPanelGenderField: FC<OrderPanelGenderFieldProps> = (props) => {
  const { gender } = props;
  const translate = useTranslate();

  return (
    <OrderInfoTypography
      title={
        gender
          ? translate.messages.gender({
              gender,
            })
          : ''
      }
    >
      {gender
        ? translate.messages.gender({
            gender,
          })
        : ''}
    </OrderInfoTypography>
  );
};

export default OrderPanelGenderField;
