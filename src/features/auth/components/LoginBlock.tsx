import { zodResolver } from '@hookform/resolvers/zod';
import { CircularProgress, Typography, Zoom, useTheme } from '@mui/material';
import { useState } from 'react';
import { UseFormProps } from 'react-hook-form';

import { MyButton, MyFormTextField } from '@/components';
import MyPasswordForm from '@/components/Form/MyPasswordForm';
import { DEFAULT_PASSWORD, DEFAULT_USERNAME, TECHNICAL_SUPPORT_NUMBER } from '@/config';
import { useAppDispatch } from '@/hooks';
import { useDetectMobile } from '@/hooks/useDetectMobile';
import { useGetHospitalLogo } from '@/hooks/useGetHospitalLogo';
import { useLanguageToggle, useTranslate } from '@/hooks/useTranslate';
import { setCredentials } from '@/stores/auth';
import { initializePersistor } from '@/stores/redux';

import { useLazyGetCurrentUserQuery, useLazyLoginQuery } from '../api/login';
import { LoginCredentialsSchema } from '../schema';
import { LoginCredentialsDTO } from '../types';

import {
  StyledLoginButton,
  StyledLoginContainer,
  StyledLoginForm,
  StyledLoginLogo,
  StyledMessage,
} from './LoginBlock.styles';

type LoginBlockProps = {
  /**
   * Calls after login success
   */
  onSuccess: () => void;
};

export const LoginBlock = ({ onSuccess }: LoginBlockProps) => {
  const [login, { isFetching: isTokenFetching }] = useLazyLoginQuery();
  const [getUserInfo, { isFetching: isUserFetching }] = useLazyGetCurrentUserQuery();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const translate = useTranslate();
  const toggle = useLanguageToggle();
  const isMobileSize = useDetectMobile();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isFetching = isTokenFetching || isUserFetching;
  const { loginLogo } = useGetHospitalLogo();
  const formOptions: UseFormProps<LoginCredentialsDTO> = {
    mode: 'onChange',
    resolver: zodResolver(LoginCredentialsSchema(translate)),
    defaultValues: {
      username: DEFAULT_USERNAME ? DEFAULT_USERNAME : '',
      password: DEFAULT_PASSWORD ? DEFAULT_PASSWORD : '',
    },
  };

  const onSubmit = async (data: LoginCredentialsDTO) => {
    try {
      const token = await login(data, false).unwrap();
      const user = await getUserInfo(token, false).unwrap();
      dispatch(
        setCredentials({
          token,
          user,
        }),
      );
      initializePersistor();
      onSuccess();
    } catch (error) {
      const errorMessage = translate.messages.result.genericUnsuccess({
        subject: translate.buttons.login(),
      });
      setErrorMessage(errorMessage);
    }
  };

  return (
    <StyledLoginContainer>
      <StyledLoginLogo>
        <img src={loginLogo} width="100%" height="100%" alt="logo" />
      </StyledLoginLogo>
      <StyledMessage>
        <Zoom in={!!errorMessage}>
          <Typography color={theme.palette.error.light}>{errorMessage}</Typography>
        </Zoom>
      </StyledMessage>
      <StyledLoginForm<LoginCredentialsDTO>
        formOptions={formOptions}
        submitOnEnter
        onSubmit={onSubmit}
        renderInputs={({ onKeyDown, control }) => (
          <>
            <MyFormTextField
              name="username"
              control={control}
              MyTextFieldProps={{
                label: isMobileSize ? '' : translate.resources.user.username(),
                placeholder: translate.resources.user.username(),
                fullWidth: true,
                required: true,
                size: 'medium',
                onKeyDown,
              }}
            />
            <MyPasswordForm
              name="password"
              control={control}
              MyTextFieldProps={{
                label: isMobileSize ? '' : translate.resources.user.password(),
                onKeyDown,
              }}
            />
          </>
        )}
        renderSubmit={({ submit }) => (
          <StyledLoginButton
            onClick={submit}
            variant="contained"
            size="small"
            disabled={isFetching}
          >
            {isFetching ? <CircularProgress size={20} /> : translate.buttons.login()}
          </StyledLoginButton>
        )}
      />

      <MyButton onClick={toggle}>{translate.buttons.switchLanguage()}</MyButton>
      <Typography>
        {translate.messages.technicalSupport({ phone: TECHNICAL_SUPPORT_NUMBER })}
      </Typography>
    </StyledLoginContainer>
  );
};
