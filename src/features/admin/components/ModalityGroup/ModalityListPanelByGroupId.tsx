import { FC } from 'react';

import { CloseableCollapsiblePanel } from '@/components/Elements/Surfaces/CollapsiblePanel';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IModalityGroupDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ModalityListTablebyGroupId } from './ModalityListTablebyGroupId';

export const ModalityListPanelByGroupId: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IModalityGroupDTO>(RESOURCES.MODALITY_GROUP),
  );
  const modalityGroupID = record?.id;
  const modalityGroupName = record?.code;
  const { isOpen: initialExpanded, open, close } = useDisclosure(true);
  const translate = useTranslate();

  if (!modalityGroupID) return <></>;
  return (
    <CloseableCollapsiblePanel
      key={modalityGroupID}
      initialExpanded={initialExpanded}
      onExpand={open}
      onCollapse={close}
      onClose={close}
      title={translate.messages.titles.modalityList({
        resource: modalityGroupName || '',
      })}
    >
      <ModalityListTablebyGroupId modalityGroupID={modalityGroupID} />
    </CloseableCollapsiblePanel>
  );
};
