import { RootState } from '@/stores/redux';

export const selectCurrentUser = (state: RootState) => state.auth.user;
