import { Modal } from '@mui/material';
import React from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import { uuidv4 } from '@/utils/uuidv4';

import { useUpdateTimeTableFormData } from '../../hook/useUpdateTimeTableFormData';
import {
  useRegisterTimetableFunctions,
  useTimetableFunctions,
} from '../../providers/TimeTableProvider';

import { UpdateTimetableForm } from './UpdateTimetableForm';

export const ModalUpdateTimetable = () => {
  const register = useRegisterTimetableFunctions();
  const { close, isOpen, open, toggle } = useDisclosure();
  register('openModalUpdateTimetable', open);

  const userPermissions = useUserPermission();
  const translate = useTranslate();
  const timetableFuntions = useTimetableFunctions();
  const selectedRowData = useUpdateTimeTableFormData();

  return (
    <Modal open={isOpen}>
      <AppModalContent
        confirmLabel={translate.buttons.update()}
        handleClose={close}
        BodyComponent={
          <UpdateTimetableForm
            key={uuidv4()}
            onSuccessCallback={close}
            record={selectedRowData}
          />
        }
        handleConfirm={() => timetableFuntions.submitUpdateTimetable()}
        ConfirmButton={!userPermissions?.userCanUpdateTimeTable && <></>}
        title={translate.messages.titles.editResource({
          resource: translate.pages.timeTable.title().toLowerCase(),
        })}
        width="500px"
      />
    </Modal>
  );
};
