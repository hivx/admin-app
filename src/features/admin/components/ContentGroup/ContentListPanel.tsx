import { FC } from 'react';

import { CloseableCollapsiblePanel } from '@/components/Elements/Surfaces/CollapsiblePanel';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IContentGroupDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ContentListTable } from './ContentListTable';

export const ContentListPanel: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IContentGroupDTO>(RESOURCES.CONTENT_GROUP),
  );
  const { isOpen: initialExpanded, open, close } = useDisclosure(true);
  const contentGroupID = record?.id;
  const contentGroupName = record?.name;
  const translate = useTranslate();

  if (!contentGroupID) return <></>;
  return (
    <CloseableCollapsiblePanel
      key={contentGroupID}
      initialExpanded={initialExpanded}
      onExpand={open}
      onCollapse={close}
      onClose={close}
      title={translate.messages.titles.contentList({
        resource: contentGroupName || '',
      })}
    >
      <ContentListTable contentGroupID={contentGroupID} />
    </CloseableCollapsiblePanel>
  );
};
