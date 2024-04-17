import { MyButton } from '@/components';
import { useTranslate } from '@/hooks/useTranslate';
import { useAuth } from '@/providers/AuthProvider';

import { RegistrationListLayout } from '../components';

export const RegistrationList = () => {
  const translate = useTranslate();
  const { logout } = useAuth();

  return (
    <RegistrationListLayout title={translate.pages.registrationList.title()}>
      REGISTRATION LIST
      <MyButton onClick={logout}>Click me for a surprise</MyButton>
    </RegistrationListLayout>
  );
};
