import { Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { RESOURCES } from '@/types/resources';

import { useGetOneEventLogQuery } from '../../api/eventLog';
import { useResendLogButtonState } from '../../hooks/useResendLogButtonState';
import { IEventLogDTO } from '../../types';

import { EventLogInfomationForm } from './EventLogInfomationForm';

type EventLogInfoModalProps = ICommonAppModalProps & { record?: IEventLogDTO };

/**
 * Popup Thông tin bản tin
 */
export const ConnectedEventLogInfoModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const record = useAppSelector(getCurrentSelectedRow<IEventLogDTO>(RESOURCES.EVENT_LOG));
  const { data } = useGetOneEventLogQuery({ id: record?.id ?? 0 }, { skip: !record?.id });
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  return (
    <Modal open={isOpen}>
      <EventLogInfoModal closeModal={close} record={data} />
    </Modal>
  );
};

export const EventLogInfoModal = forwardRef<HTMLElement, EventLogInfoModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const { handleClickButton } = useResendLogButtonState(closeModal);

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.resources.eventLog.resend()}
        handleClose={closeModal}
        BodyComponent={
          record ? <EventLogInfomationForm record={record} /> : <FullPageSpinner />
        }
        handleConfirm={() => handleClickButton()}
        title={translate.resources.eventLog.logInfomation()}
      />
    );
  },
);

EventLogInfoModal.displayName = 'EventLogInfoModal';
