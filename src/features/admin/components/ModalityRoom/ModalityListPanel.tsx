import { FC } from 'react';

import { CloseableCollapsiblePanel } from '@/components/Elements/Surfaces/CollapsiblePanel';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { TABLE_MODALITY_ROOM } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IModalityRoomDTO } from '@/types/dto';

import { ModalityListTableByRoom } from './ModalityListTableByRoom';

export const ModalityListPanel: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IModalityRoomDTO>(TABLE_MODALITY_ROOM),
  );
  const modalityRoomID = record?.id;
  const modalityRoomName = record?.name;
  const { isOpen: initialExpanded, open, close } = useDisclosure(true);
  const translate = useTranslate();

  if (!modalityRoomID) return <></>;
  return (
    <CloseableCollapsiblePanel
      key={modalityRoomID}
      initialExpanded={initialExpanded}
      onExpand={open}
      onCollapse={close}
      onClose={close}
      title={translate.messages.titles.modalityList({
        resource: modalityRoomName || '',
      })}
    >
      <ModalityListTableByRoom modalityRoomID={modalityRoomID} />
    </CloseableCollapsiblePanel>
  );
};
