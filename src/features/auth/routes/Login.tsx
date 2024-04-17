import { useNavigate } from 'react-router-dom';

import { ROUTE_REDIRECT_PAGE } from '@/features/redirect';
import { useTranslate } from '@/hooks/useTranslate';

import { AuthLayout } from '../components/AuthLayout';
import { LoginBlock } from '../components/LoginBlock';

export const Login = () => {
  const navigate = useNavigate();
  const translate = useTranslate();

  return (
    <AuthLayout title={translate.pages.login.title()}>
      <LoginBlock onSuccess={() => navigate(ROUTE_REDIRECT_PAGE)} />
    </AuthLayout>
  );
};
