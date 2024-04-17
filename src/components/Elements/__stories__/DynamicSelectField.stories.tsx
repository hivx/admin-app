import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

import { DynamicSelectField } from '../Inputs';

export default {
  title: 'inputs/DynamicSelectField',
  component: DynamicSelectField,
} as ComponentMeta<typeof DynamicSelectField>;

type TestPayload = {
  testOne?: string;
  testTwo?: string;
  testThree?: string;
} & FieldValues;

const formOptions: UseFormProps<TestPayload> = {
  defaultValues: {
    testOne: undefined,
    testTwo: undefined,
    testThree: undefined,
  },
};

const DynamicSelectFieldTemplate: ComponentStory<typeof DynamicSelectField> = (args) => {
  const { control, getValues, setValue, resetField } = useForm({
    mode: 'onSubmit',
    defaultValues: formOptions.defaultValues,
  });

  return (
    <Box sx={{ width: 300 }}>
      <DynamicSelectField<TestPayload>
        {...args}
        getValues={getValues}
        setValue={setValue}
        control={control}
        resetField={resetField}
      />
    </Box>
  );
};

export const SimpleDynamicSelectField = DynamicSelectFieldTemplate.bind({});
SimpleDynamicSelectField.args = {
  defaultName: 'testOne',
  menuItems: [
    { value: 'testOne', text: 'Test One' },
    { value: 'testTwo', text: 'Test Two' },
    { value: 'testThree', text: 'Test Three' },
  ],
};
