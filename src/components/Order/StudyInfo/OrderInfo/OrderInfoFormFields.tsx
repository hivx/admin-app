import { Box, Divider, Typography } from '@mui/material';
import { FC } from 'react';

import { MyFormTextField, MyCheckbox, MyFormCheckboxField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormDateTimePicker } from '@/components/Form/MyFormDateTimePicker';
import { useTranslate } from '@/hooks';
import { IOrderDTO, IOrderUpdateDTO } from '@/types/dto';

import {
  StyledInfoFieldTwoColumn,
  StyledInfoFieldTwoOfChildrenColumn,
  StyledInfoFormFieldsMain,
  StyledOrderInfoFormFieldsWrapper,
} from '../StyledStudyInfo';

import { DepartmentAndPhysicianFieldWrapper } from './DepartmentAndPhysicianFieldWrapper';
import ModalityTypeSelectField from './ModalityTypeSelectField';
import { OrderInfoRequestAutoCompleteField } from './OrderInfoRequestAutoCompleteField';
import { PriorityDynamicEditableField } from './PriorityDynamicEditableField';
export type IOrderInfoFormFields = IOrderUpdateDTO;

type OrderInfoFormFieldsProps = IFormControlInputProps<IOrderInfoFormFields> & {
  onSuccessCallback?: () => void;
  disabled?: boolean;
  order?: IOrderDTO;
};

export const OrderInfoFormFields: FC<OrderInfoFormFieldsProps> = (props) => {
  const { control, watch, disabled, order, trigger, setValue } = props;
  const translate = useTranslate();
  return (
    <StyledInfoFormFieldsMain>
      {/**
       * Mã chỉ định, Ngày chỉ định
       */}
      <StyledInfoFieldTwoOfChildrenColumn>
        <MyFormTextField
          name="accessionNumber"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.order.accessionNumber.long(),
            placeholder: translate.resources.order.accessionNumber.long(),
            fullWidth: true,
            size: 'extrasmall',
            disabled: disabled,
            required: true,
          }}
        />
        <MyFormDateTimePicker
          name="requestedTime"
          type="dateTime"
          disabled={disabled}
          TextFieldProps={{ required: true }}
          watch={watch}
          control={control}
          label={translate.resources.order.requestedTime.long()}
          customSize="extrasmall"
        />
      </StyledInfoFieldTwoOfChildrenColumn>

      {/**
       * Nơi chỉ định, Bác sĩ chỉ định
       */}
      <StyledInfoFieldTwoOfChildrenColumn>
        <DepartmentAndPhysicianFieldWrapper
          order={order}
          readonly={disabled}
          control={control}
          watch={watch}
          setValue={setValue}
        />
      </StyledInfoFieldTwoOfChildrenColumn>

      <StyledInfoFieldTwoOfChildrenColumn>
        <MyFormTextField
          name="encounterNumber"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.order.encounterNumber(),
            placeholder: translate.resources.order.encounterNumber(),
            fullWidth: true,
            size: 'extrasmall',
            disabled: disabled,
          }}
        />
        <MyFormCheckboxField
          name="inpatient"
          control={control}
          render={({ value, onChange }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MyCheckbox checked={!!value} onChange={onChange} disabled={disabled} />
              <Typography>{translate.resources.order.patient.inpatient()}</Typography>
            </Box>
          )}
        />
      </StyledInfoFieldTwoOfChildrenColumn>

      {/**
       * Loại ca chụp, Chụp cấp cứu
       */}
      <StyledInfoFieldTwoColumn>
        <ModalityTypeSelectField order={order} control={control} readonly={disabled} />
        <MyFormCheckboxField
          name="urgent"
          control={control}
          render={({ value, onChange }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MyCheckbox checked={!!value} onChange={onChange} disabled={disabled} />
              <Typography>{translate.resources.order.urgent.long()}</Typography>
            </Box>
          )}
        />
      </StyledInfoFieldTwoColumn>

      {/* <MyFormCheckboxField
            control={control}
            render={({ value, onChange }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MyCheckbox checked={!!value} onChange={onChange} disabled={disabled} />
                <Typography>{translate.resources.order.insuranceApplied()}</Typography>
              </Box>
            )}
            name="insuranceApplied"
          /> */}

      {/**
       * Loại ưu tiên, Số thẻ BHYT
       */}
      <StyledInfoFieldTwoColumn>
        <PriorityDynamicEditableField
          order={order}
          readonly={disabled}
          control={control}
          watch={watch}
        />
        <MyFormTextField
          name="insuranceNumber"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.order.insuranceNumber.long(),
            placeholder: translate.resources.order.insuranceNumber.long(),
            fullWidth: true,
            size: 'extrasmall',
            disabled: disabled,
          }}
        />
      </StyledInfoFieldTwoColumn>

      {/**
       * Ngày hiệu lực BHYT, Ngày hết hạn BHYT
       */}
      <StyledInfoFieldTwoColumn>
        <MyFormDateTimePicker
          name="insuranceIssuedDate"
          type="date"
          disabled={disabled}
          watch={watch}
          control={control}
          label={translate.resources.order.insuranceIssuedDate()}
          customSize="extrasmall"
        />
        <MyFormDateTimePicker
          name="insuranceExpiredDate"
          type="date"
          disabled={disabled}
          watch={watch}
          control={control}
          label={translate.resources.order.insuranceExpiredDate()}
          customSize="extrasmall"
        />
      </StyledInfoFieldTwoColumn>

      {/**
       *  Lâm sàng
       */}
      <MyFormTextField
        name="diagnosis"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.order.diagnosis.short(),
          placeholder: translate.resources.order.diagnosis.short(),
          fullWidth: true,
          size: 'extrasmall',
          disabled: disabled,
        }}
      />

      <OrderInfoRequestAutoCompleteField
        name="requests"
        control={control}
        order={order}
        readonly={disabled}
        watch={watch}
        validateTrigger={trigger}
      />
    </StyledInfoFormFieldsMain>
  );
};
