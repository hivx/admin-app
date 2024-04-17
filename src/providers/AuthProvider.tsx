import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_LOGIN } from '@/features/auth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getUserModules } from '@/lib/dataHelper/getUserModules';
import {
  getUserPermissisons,
  initialUserPermission,
  IUserPermissions,
} from '@/lib/dataHelper/getUserPermissisons';
import { clearCredentials, selectCurrentUser } from '@/stores/auth';
import { persistor } from '@/stores/redux';
import { IUserDTO } from '@/types/dto';
import { IModuleDTOBase } from '@/types/dto/module';

const AuthContext = createContext<AuthProviderValues>({
  user: null,
  logout: () => {},
  userPermissions: initialUserPermission,
  userModules: [],
});

export type AuthProviderValues = {
  user: IUserDTO | null;
  logout: () => void;
  userPermissions: IUserPermissions;
  userModules: IModuleDTOBase['name'][];
};

function AuthProvider(props: { children: ReactNode }) {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    // clear the token and the user data in both redux store and redux-persist
    dispatch(clearCredentials());
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });

    navigate(ROUTE_LOGIN);
  }, [dispatch, navigate]);

  const providerValue = useMemo(
    () => ({
      user,
      logout,
      userPermissions: getUserPermissisons({ user }),
      userModules: getUserModules({ user })?.userModules ?? [],
    }),
    [logout, user],
  );

  return <AuthContext.Provider value={providerValue} {...props} />;
}

const useAuth = () => useContext(AuthContext);

const useUserPermission = () => {
  const useAuthProvider = useAuth();
  return useAuthProvider.userPermissions;
};

export { AuthProvider, useAuth, useUserPermission };

// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)
