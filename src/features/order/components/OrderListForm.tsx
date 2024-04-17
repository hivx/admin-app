import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Controller, FieldPath, UseFormProps } from 'react-hook-form';

import { DynamicSelectField, MyTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useDynamicFields, useTranslate } from '@/hooks';

import { OrderListCredentialsSchema } from '../schema';
import { OrderListForm as OrderListFormKeys, IDataOrderListFormFields } from '../types';

import {
  StyledFormControlLabel,
  StyledLoadingButton,
  StyledSubmitButton,
} from './OrderListForm.styles';

type IOrderListForm = {
  /**
   * Config default fields for oder list form
   * @required
   */
  defaultFormOptions: IDataOrderListFormFields;
  /**
   * Disabled when loading data or read only
   */
  disabled?: boolean;
  /**
   * Custom onSubmit function with IDataOrderListFormFields
   * Will run on form submit
   * @required
   */
  onSubmit: (values: IDataOrderListFormFields) => void;
};

export const OrderListForm: FC<IOrderListForm> = (props: {
  defaultFormOptions: IDataOrderListFormFields;
  disabled?: boolean;
  onSubmit: (values: IDataOrderListFormFields) => void;
}) => {
  const { defaultFormOptions, disabled, onSubmit } = props;
  const translate = useTranslate();
  const excludedFields: FieldPath<IDataOrderListFormFields>[] = [
    OrderListFormKeys.START_DATE,
    OrderListFormKeys.END_DATE,
  ];

  /**
   * Get all keys to array in default form options
   */
  const fieldNames = Object.keys(
    defaultFormOptions,
  ) as FieldPath<IDataOrderListFormFields>[];

  /**
   * Filter field names with excluded fields
   */
  const fieldFilterExcluded = fieldNames.filter((name) => !excludedFields.includes(name));

  /**
   * Config dynamic fields props from useDynamicFields
   */
  const dynamicFieldsProps = useDynamicFields<IDataOrderListFormFields>({
    fieldNames: fieldFilterExcluded,
    numFilters: 2, // A number of filter
  });

  const mapDynamicFieldsProps = dynamicFieldsProps.map((dynamicFieldsProp) => ({
    ...dynamicFieldsProp,
    menuItems: dynamicFieldsProp.menuItems
      ?.map((menuItem) => ({
        value: menuItem.value,
        text: translate.orderListForm[menuItem.value].title(),
      }))
      .sort((a, b) => a.text.localeCompare(b.text)),
  }));

  const formOptions: UseFormProps<IDataOrderListFormFields> = {
    mode: 'onChange',
    resolver: zodResolver(OrderListCredentialsSchema(translate)),
    defaultValues: {
      startDate: defaultFormOptions.startDate,
      endDate: defaultFormOptions.endDate,
      patientName: defaultFormOptions.patientName,
      patientId: defaultFormOptions.patientId,
      orderId: defaultFormOptions.orderId,
      readingStatus: defaultFormOptions.readingStatus,
      doctorReader: defaultFormOptions.doctorReader,
      referringPhysicianName: defaultFormOptions.referringPhysicianName,
      requestedDepartmentName: defaultFormOptions.requestedDepartmentName,
    },
  };

  return (
    <MyFormGroupUnstyled<IDataOrderListFormFields>
      formOptions={formOptions}
      submitOnEnter
      onSubmit={(values) => onSubmit(values)}
      renderInputs={({
        control,
        setValue,
        getValues,
        resetField,
        formState: { errors },
      }) => (
        <Grid
          direction="row"
          container
          sx={{ paddingTop: '15px' }}
          spacing={2}
          alignItems="flex-start"
        >
          <Grid item xs={3}>
            <Controller
              name="startDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <StyledFormControlLabel
                  disabled={disabled}
                  labelPlacement="top"
                  control={<MyTextField fullWidth value={value} onChange={onChange} />}
                  label={
                    <Typography sx={{ width: '100%', textAlign: 'left' }}>
                      {translate.orderListForm.startDate.title()}
                    </Typography>
                  }
                />
              )}
            />
          </Grid>
          {mapDynamicFieldsProps.length > 0 &&
            mapDynamicFieldsProps.map((dynamicFieldsProp) => (
              <Grid key={dynamicFieldsProp.defaultName} item xs={3}>
                <DynamicSelectField<IDataOrderListFormFields>
                  {...dynamicFieldsProp}
                  setValue={setValue}
                  getValues={getValues}
                  disabled={disabled}
                  control={control}
                  errors={errors}
                  resetField={resetField}
                />
              </Grid>
            ))}
          <Grid item xs={2}>
            {disabled ? (
              <StyledLoadingButton
                fullWidth
                loading
                loadingPosition="start"
                variant="contained"
              >
                {translate.buttons.search()}
              </StyledLoadingButton>
            ) : (
              <StyledSubmitButton
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
              >
                {translate.buttons.search()}
              </StyledSubmitButton>
            )}
          </Grid>
        </Grid>
      )}
    />
  );
};
