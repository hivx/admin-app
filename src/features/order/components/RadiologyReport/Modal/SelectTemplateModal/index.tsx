import { Modal } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { forwardRef, MouseEvent } from 'react';

import {
  ICommonAppModalProps,
  AppModalContent,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IContentDTO } from '@/types/dto';

import { useSelectTemplate } from '../../../../hooks/useSelectTemplate';

import { SelectTemplateInfo } from './SelectTemplateInfo';

type SelectTemplateModalProps = ICommonAppModalProps;

export const SelectTemplateModal = forwardRef<HTMLElement, SelectTemplateModalProps>(
  (props, ref) => {
    const { closeModal, isOpen } = props;
    const translate = useTranslate();

    const { triggerSetTemplate } = useSelectTemplate();

    const onRowClick = (e: MouseEvent<HTMLTableRowElement>, row: Row<IContentDTO>) => {
      triggerSetTemplate({
        callbackSuccess: closeModal,
        contentID: row.original.id,
      });
    };

    return (
      <Modal disableEnforceFocus open={!!isOpen}>
        <AppModalContent
          ref={ref}
          confirmLabel={''}
          closeLabel={translate.buttons.close()}
          handleClose={closeModal}
          BodyComponent={
            <StyledDivCenterChildren>
              <SelectTemplateInfo onRowClick={onRowClick} />
            </StyledDivCenterChildren>
          }
          handleConfirm={() => {}}
          title={translate.resources.report.selectTemplate.title()}
          width="65%"
        />
      </Modal>
    );
  },
);

SelectTemplateModal.displayName = 'SelectTemplateModal';
