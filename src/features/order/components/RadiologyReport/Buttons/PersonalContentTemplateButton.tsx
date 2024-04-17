import { Box } from '@mui/material';
import React, { FC } from 'react';

import { MyCheckbox } from '@/components';
import { MyTooltip } from '@/components/Elements/Tooltip/MyTooltip';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { useOrderLockState } from '@/hooks/lockOrder/useOrderLockState';
import {
  selectRadiologyReportPersonalContentTemplateButtonState,
  toggleRadiologyReportPersonalContentTemplateButtonState,
} from '@/stores/OrderRadiology';
import { IOrderDTO } from '@/types/dto';

type PersonalContentTemplateButtonProps = {
  orderID: IOrderDTO['id'];
};
const PersonalContentTemplateButton: FC<PersonalContentTemplateButtonProps> = (props) => {
  const { orderID } = props;
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const selectPersonalContentTemplateState = useAppSelector(
    selectRadiologyReportPersonalContentTemplateButtonState(orderID),
  );
  const isLock = useOrderLockState({ orderID });
  const onTogglePersonalContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleRadiologyReportPersonalContentTemplateButtonState({ orderID }));
  };

  return (
    <MyTooltip title={translate.buttons.personalContentTemplate()}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <MyCheckbox
          checked={selectPersonalContentTemplateState}
          onChange={onTogglePersonalContent}
          disabled={!isLock}
        />
      </Box>
    </MyTooltip>
  );
};

export default PersonalContentTemplateButton;
