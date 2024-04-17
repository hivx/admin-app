import { ComponentMeta, ComponentStory } from '@storybook/react';

import { OrderListForm } from '../OrderListForm';

export default {
  title: 'Forms/OrderListForm',
  component: OrderListForm,
} as ComponentMeta<typeof OrderListForm>;

type TestPayload = {
  startDate: string;
  endDate: string;
  patientName: string;
  patientId: string;
  orderId: string;
  readingStatus: string;
};

const MOCK_FORM_OPTIONS: Partial<TestPayload> = {
  startDate: '',
  endDate: '',
  patientName: undefined,
  patientId: undefined,
  orderId: undefined,
  readingStatus: undefined,
};

const OrderListFormTemplate: ComponentStory<typeof OrderListForm> = (args) => (
  <OrderListForm {...args} />
);

export const SimpleOrderListForm = OrderListFormTemplate.bind({});
SimpleOrderListForm.args = {
  defaultFormOptions: MOCK_FORM_OPTIONS,
};

export const DisabledOrderListForm = OrderListFormTemplate.bind({});
DisabledOrderListForm.args = {
  defaultFormOptions: MOCK_FORM_OPTIONS,
  disabled: true,
};
