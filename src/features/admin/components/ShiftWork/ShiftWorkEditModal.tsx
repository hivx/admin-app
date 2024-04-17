import { CircularProgress, Modal } from '@mui/material';

// import { useGetOneTimetableQuery } from '@/api/timeTable';
import { useGetOneTimetablePeriodQuery } from '@/api/timetablePeriod';
import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { ITimeTablePeriodDTO } from '@/types/dto/timeTablePeriod';
import { RESOURCES } from '@/types/resources';

import { ShiftWorkEditForm } from './ShiftWorkEditForm';

export type ShiftWorkEditModalProps = {
  closeModal: () => void;
  record: ITimeTablePeriodDTO;
};

export const ConnectedShiftWorkEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  const record = useAppSelector(
    getCurrentSelectedRow<ITimeTablePeriodDTO>(RESOURCES.SHIFT_WORK),
  );
  register('openEditModal', open);

  return record ? (
    <Modal open={isOpen}>
      <ShiftWorkEditModal closeModal={close} record={record} />
    </Modal>
  ) : (
    <></>
  );
};

export const ShiftWorkEditModal = (props: ShiftWorkEditModalProps) => {
  const { closeModal, record } = props;
  const translate = useTranslate();

  const { data: timeTablePeriod } = useGetOneTimetablePeriodQuery({ id: record.id });
  const adminFunctions = useAdminFunctions();
  return (
    <AppModalContent
      confirmLabel={translate.buttons.update()}
      handleClose={closeModal}
      BodyComponent={
        timeTablePeriod ? (
          <ShiftWorkEditForm record={timeTablePeriod} onSuccessCallback={closeModal} />
        ) : (
          <StyledDivCenterChildren>
            <CircularProgress />
          </StyledDivCenterChildren>
        )
      }
      handleConfirm={() => adminFunctions.submitEditForm()}
      title={translate.messages.titles.editResource({
        resource: translate.resources.user.name().toLowerCase(),
      })}
      width="40%"
    />
  );
};
