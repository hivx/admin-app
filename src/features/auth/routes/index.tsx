import { RouteObject, useRoutes } from 'react-router-dom';

import { Login } from './Login';
import { AuthPaths } from './paths';

export const AuthRoutes = () => {
  const elements = useRoutes(loginRoutes);
  return (
    <>
      {/* <Route path="login" element={<Login />} /> */}
      {elements}
    </>
  );
};

const loginRoutes: RouteObject[] = [
  {
    path: AuthPaths.Login,
    element: <Login />,
  },
];

export * from './paths';
