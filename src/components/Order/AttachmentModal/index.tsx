import { Modal } from '@mui/material';
import { isEmpty } from 'lodash';
import { forwardRef } from 'react';

import { MyButton } from '@/components';
import {
  ICommonAppModalProps,
  AppModalContent,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useAppSelector, useTranslate } from '@/hooks';
import { useDeleteOrderFile, useUploadOrderFile } from '@/hooks/order/useOrderFile';
import { useUploadButton } from '@/hooks/order/useUploadButton';
import { TABLE_ATTACHMENT } from '@/stores/table/tableInitialState';
import { selectCurrentSelectedRows } from '@/stores/table/tableSelectors';
import { IOrderDTO, IOrderFileDTO } from '@/types/dto';

import { AttachmentTable } from './AttachmentTable';

type AttachmentModalProps = ICommonAppModalProps & {
  orderID: IOrderDTO['id'];
  isReadOnlyModal?: boolean;
};

export const AttachmentModal = forwardRef<HTMLElement, AttachmentModalProps>(
  (props, ref) => {
    const { closeModal, isOpen, orderID, isReadOnlyModal = false } = props;
    const translate = useTranslate();
    const rowsSelected = useAppSelector(
      selectCurrentSelectedRows<IOrderFileDTO[]>(TABLE_ATTACHMENT),
    );

    const { handleUploadFile, isLoading: isLoadingUpload } = useUploadOrderFile(orderID);
    const { handleDeleteFiles, isLoading: isLoadingDelete } = useDeleteOrderFile(orderID);
    const { inputRef, handleClickUpload } = useUploadButton();

    return (
      <Modal disableEnforceFocus open={!!isOpen}>
        <AppModalContent
          ref={ref}
          closeLabel={translate.buttons.close()}
          handleClose={closeModal}
          isLoading={isLoadingUpload || isLoadingDelete}
          BoxBodyProps={{ width: '100%', height: '100%' }}
          ConfirmButton={
            <>
              {!isReadOnlyModal && (
                <>
                  <MyButton variant="contained" onClick={handleClickUpload}>
                    {translate.resources.report.attachment.upload()}
                  </MyButton>
                  <input
                    hidden
                    multiple
                    type="file"
                    onChange={handleUploadFile}
                    ref={inputRef}
                  />
                </>
              )}
            </>
          }
          BodyComponent={
            <StyledDivCenterChildren>
              <AttachmentTable orderID={orderID} />
            </StyledDivCenterChildren>
          }
          deleteLabel={!isEmpty(rowsSelected) ? translate.buttons.delete() : ''} // only show button delete when have row selected
          handleDelete={!isReadOnlyModal ? handleDeleteFiles : undefined}
          handleConfirm={() => {}}
          title={translate.resources.report.attachment.title()}
          width="65%"
        />
      </Modal>
    );
  },
);

AttachmentModal.displayName = 'AttachmentModal';
