import { Checkbox, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ComponentMeta, Story } from '@storybook/react';

import { MyButton, MyFormTextField, MyFormCheckboxField } from '@/components/Elements';

import { MyFormGroupUnstyled, MyFormGroupUnstyledProps } from '../MyFormGroupUnstyled';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Forms/MyFormGroupUnstyled',
  component: MyFormGroupUnstyled,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MyFormGroupUnstyled>;

type TestFormPayload = {
  username: string;
  password: string;
  remember: boolean;
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const UnstyledTemplate: Story<MyFormGroupUnstyledProps<TestFormPayload>> = (args) => {
  return (
    <>
      <MyFormGroupUnstyled {...args} />
    </>
  );
};

const formOptions = {
  defaultValues: {
    username: 'default username',
    password: 'default password',
    remember: true,
  },
};

export const Minimal = UnstyledTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Minimal.args = {
  formOptions,
  renderInputs: ({ onKeyDown, register }) => (
    <>
      <div>
        <label htmlFor="username">Username</label>
        <input {...register('username')} onKeyDown={onKeyDown} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input {...register('password')} onKeyDown={onKeyDown} />
      </div>
      <div>
        <label htmlFor="remember">Remember session?</label>
        <input {...register('remember')} type="checkbox" onKeyDown={onKeyDown} />
      </div>
    </>
  ),
  renderSubmit: () => <input type="submit"></input>,
};

export const WithCustomFields = UnstyledTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithCustomFields.args = {
  formOptions,
  renderInputs: ({ control }) => (
    <>
      <div>
        <MyFormTextField control={control} name="username" />
      </div>
      <div>
        <MyFormTextField control={control} name="password" />
      </div>
      <div>
        <span>Remember session?</span>
        <MyFormCheckboxField
          control={control}
          MyCheckboxProps={{ size: 'medium' }}
          name="remember"
        />
      </div>
    </>
  ),
  renderSubmit: () => <input type="submit"></input>,
};

const StyledForm = styled(MyFormGroupUnstyled)`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  & > div {
    margin: ${(props) => props.theme.spacing(1)};
  }
` as typeof MyFormGroupUnstyled; // preserve Generic Type <SubmitPayload> of MyFormGroupUnstyled

const StyledSubmit = styled(MyButton)`
  margin: auto;
  min-width: 120px;
  min-height: 30px;
`;

const StyledTemplate: Story<MyFormGroupUnstyledProps<TestFormPayload>> = (args) => {
  return (
    <>
      <StyledForm {...args} />
    </>
  );
};

export const Styled = StyledTemplate.bind({});

Styled.args = {
  formOptions,
  renderInputs: ({ onKeyDown, control }) => (
    <>
      <MyFormTextField
        name="username"
        control={control}
        MyTextFieldProps={{
          label: 'Username',
          fullWidth: true,
          placeholder: 'Username',
          required: true,
          size: 'medium',
          onKeyDown,
        }}
      />
      <MyFormTextField
        name="password"
        control={control}
        MyTextFieldProps={{
          label: 'Password',
          fullWidth: true,
          placeholder: 'Password',
          required: true,
          size: 'medium',
          onKeyDown,
        }}
      />

      <MyFormCheckboxField
        control={control}
        render={({ value, onChange }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <Typography fontWeight={600}>Remember session?</Typography>
            <Checkbox checked={!!value} onChange={onChange} />
          </Box>
        )}
        name="remember"
      />
    </>
  ),
  renderSubmit: ({ submit }) => (
    <StyledSubmit onClick={submit} variant="outlined" size="small">
      Submit
    </StyledSubmit>
  ),
};
