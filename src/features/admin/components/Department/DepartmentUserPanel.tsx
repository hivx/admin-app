import { FC } from 'react';

import { CloseableCollapsiblePanel } from '@/components/Elements/Surfaces/CollapsiblePanel';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IDepartmentDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { DepartmentUserTable } from './DepartmentUserTable';

export const DepartmentUserPanel: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IDepartmentDTO>(RESOURCES.DEPARTMENT),
  );
  const { isOpen: initialExpanded, open, close } = useDisclosure(true);
  const departmentID = record?.id;
  const departmentName = record?.name;
  const translate = useTranslate();

  if (!departmentID) return <></>;
  return (
    <CloseableCollapsiblePanel
      key={departmentID}
      initialExpanded={initialExpanded}
      onExpand={open}
      onCollapse={close}
      onClose={close}
      title={translate.messages.titles.departmentUserList({
        department: departmentName || '',
      })}
    >
      <DepartmentUserTable departmentID={departmentID} />
    </CloseableCollapsiblePanel>
  );
};
