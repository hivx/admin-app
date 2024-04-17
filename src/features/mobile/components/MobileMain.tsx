import { Navigate } from 'react-router-dom';

import { DEFAULT_REDIRECT_MOBILE } from '../routes/paths';

export const MobileMain = () => {
  return <Navigate to={DEFAULT_REDIRECT_MOBILE} />;
};
