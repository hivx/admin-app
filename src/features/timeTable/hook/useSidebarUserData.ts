import { useCallback, useMemo } from 'react';

import { useGetListUsersQuery } from '@/api/users';
import { MultiCheckboxData } from '@/components/Elements/Inputs/MyMultiCheckboxController';
import { useAppSelector } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { IUserDTO } from '@/types/dto';

import { SideBarTimetableFilter } from '../components/SidebarCalendar';

/**
 * Trả ra danh sách user dùng cho component multi checkbox
 */
export const useSidebarUserData = () => {
  const { data } = useGetListUsersQuery({ filter: {} });
  const query = useAppSelector(
    getCurrentTableQuery<SideBarTimetableFilter>(TABLE_SCHEDULE),
  );
  const currentUser = useAppSelector(selectCurrentUser);

  const listUserActive = data?.list.filter((user) => user.enabled);

  /**
   * đổi tên người dùng hiện tại -> lịch của tôi, để hiển thị ra label
   */
  const changeFullNameCurrentUser = useCallback(
    (listUserActive: IUserDTO[]) => {
      const newListUser = [...listUserActive].map((user, index) => {
        if (user.id === currentUser?.id) {
          return { ...user, fullname: 'Lịch của tôi' };
        }
        return user;
      });

      /**
       * sắp xếp user hiện tại lên đầu
       */
      return newListUser.sort((x) => (x.id === currentUser?.id ? -1 : 0));
    },
    [currentUser?.id],
  );

  const checkboxData = useMemo<MultiCheckboxData<IUserDTO>[]>(() => {
    const m_data: MultiCheckboxData<IUserDTO>[] = [];
    listUserActive &&
      changeFullNameCurrentUser(listUserActive).map((user) => {
        m_data.push({
          id: user.id,
          data: user,
          isSelected: query?.filter.userIDs
            ? query?.filter.userIDs.includes(user.id)
            : false,
        });
      });
    return m_data;
  }, [changeFullNameCurrentUser, listUserActive, query?.filter.userIDs]);

  return checkboxData;
};
