import { FC } from 'react';

import { CloseableCollapsiblePanel } from '@/components/Elements/Surfaces/CollapsiblePanel';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IUserGroupDTO } from '@/types/dto/userGroup';
import { RESOURCES } from '@/types/resources';

import { UserGroupMemberTable } from './UserGroupMemberTable';

export const UserGroupMemberPanel: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IUserGroupDTO>(RESOURCES.USER_GROUP),
  );
  const { isOpen: initialExpanded, open, close } = useDisclosure(true);
  const userGroupId = record?.id;
  const userGroupName = record?.name;
  const translate = useTranslate();

  if (!userGroupId) return <></>;
  return (
    <CloseableCollapsiblePanel
      key={userGroupId}
      initialExpanded={initialExpanded}
      onExpand={open}
      onCollapse={close}
      onClose={close}
      title={translate.messages.titles.userGroupMemberList({
        userGroup: userGroupName || '',
      })}
    >
      <UserGroupMemberTable userGroupId={userGroupId} />
    </CloseableCollapsiblePanel>
  );
};
