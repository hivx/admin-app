import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth';

import { ROUTE_LOGIN } from '../routes';

export const LoginGuard = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) return <Navigate to={ROUTE_LOGIN} />;

  return <>{children}</>;
};
