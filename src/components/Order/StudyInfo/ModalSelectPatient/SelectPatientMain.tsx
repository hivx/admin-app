import { Modal, Typography, styled } from '@mui/material';
import React, { FC } from 'react';
import { UseFormReset } from 'react-hook-form';

import { MyButton } from '@/components/Elements';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useAppDispatch, useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import { useCreateOrderContext } from '@/providers/Order/CreateOrderFunctionsProvider';
import { TABLE_PICK_PATIENT } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { setTableQuery } from '@/stores/table/tableSlice';
import { BaseEntity } from '@/types';
import { IPatientDTO } from '@/types/dto';

import { StyledPrimaryButton } from '../../Bookmark/ConnectedBookmarkModal';
import { PatientInfoFormFieldsType } from '../PatientInfo/PatientInfoFields';

import { PatientFormFilter } from './PatientFormFilter';
import { PatientTable } from './PatientTable';
import { SelectPatientWrapper } from './SelectPatientWrapper';

type SearchPatientMainButtonProps = {
  reset: UseFormReset<PatientInfoFormFieldsType>;
  createFormCallBack?: () => void;
  editFormCallback?: (pid: BaseEntity['id']) => void;
};

/**
 * Popup tìm kiếm bệnh nhân,
 * Dùng ở trong form Tạo/Sửa chỉ định
 */
export const SearchPatientMainButton: FC<SearchPatientMainButtonProps> = ({
  reset,
  createFormCallBack,
  editFormCallback,
}) => {
  const disclosure = useDisclosure();
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const { setCurrentPatient } = useCreateOrderContext();

  const record = useAppSelector(getCurrentSelectedRow<IPatientDTO>(TABLE_PICK_PATIENT));

  const setNullPatientTableFilter = () => {
    dispatch(setTableQuery({ tableId: TABLE_PICK_PATIENT, query: { filter: {} } }));
  };

  /**
   * func when click button "Xác Nhận"
   */
  const onConfirmSelectPatient = () => {
    if (record) {
      reset(record);
      setCurrentPatient && setCurrentPatient(record);
      createFormCallBack && createFormCallBack();
      editFormCallback && editFormCallback(record.id);
      disclosure.close();
      setNullPatientTableFilter();
    }
  };

  const onCLoseModalSelect = () => {
    setNullPatientTableFilter();
    disclosure.close();
  };
  return (
    <>
      <MyButton variant="contained" onClick={disclosure.open}>
        {translate.buttons.select()}
      </MyButton>
      {disclosure.isOpen && (
        <Modal open={disclosure.isOpen}>
          <StyledStudyInfoModal
            renderBody={() => (
              <StyledStudyInfoBody>
                <SelectPatientWrapper
                  FilterComponent={<PatientFormFilter />}
                  TableComponent={<PatientTable />}
                />
              </StyledStudyInfoBody>
            )}
            renderTitle={() => (
              <StyledStudyInfoHeaderTitle>
                <Typography textTransform="uppercase">
                  {translate.resources.order.patient.select()}
                </Typography>
              </StyledStudyInfoHeaderTitle>
            )}
            renderFooter={() => (
              <StyledStudyInfoFooter>
                <ModalFooterLayout
                  ActionButton={
                    <StyledPrimaryButton
                      variant="contained"
                      onClick={() => {
                        onConfirmSelectPatient();
                      }}
                    >
                      {translate.buttons.confirm()}
                    </StyledPrimaryButton>
                  }
                  OptionalButtons={[
                    <MyButton
                      key={translate.buttons.close()}
                      variant="outlined"
                      onClick={onCLoseModalSelect}
                    >
                      {translate.buttons.close()}
                    </MyButton>,
                  ]}
                />
              </StyledStudyInfoFooter>
            )}
          />
        </Modal>
      )}
    </>
  );
};

const StyledStudyInfoModal = styled(ModalContent)`
  width: 50vw;
  max-width: 50vw;
`;

const StyledStudyInfoHeaderTitle = styled(Typography)`
  text-align: center;
  background-color: ${(props) => props.theme.pacs?.customColors.tableHeaderBackground};
  padding: ${(props) => props.theme.spacing(0.5)} 0;
`;

const StyledStudyInfoBody = styled('div')`
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing(2)};
`;
const StyledStudyInfoFooter = styled('div')`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
`;
