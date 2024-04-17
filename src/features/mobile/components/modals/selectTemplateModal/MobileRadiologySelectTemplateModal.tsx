import { Modal } from '@mui/material';
import { Row } from '@tanstack/react-table';
import { forwardRef, MouseEvent } from 'react';

import { ICommonAppModalProps } from '@/components/Elements/Modal/AppModalContent';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { useTranslate } from '@/hooks';
import { IContentDTO, IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { useSelectTemplate } from '../../../../order/hooks/useSelectTemplate';
import { MobileLayout } from '../../layout/MobileLayout';
import { LayoutWithTopbarWrapper } from '../../topbar/LayoutWithTopbarWrapper';

import { MobileRadiologySelectTemplateInfo } from './MobileRadiologySelectTemplateInfo';
import MobileRadiologySelectTemplateModalContentShell from './MobileRadiologySelectTemplateModalContentShell';

type MobileRadiologySelectTemplateModalProps = ICommonAppModalProps & {
  order: IOrderDTO;
  request?: IOrderRequestDTO;
  modalityType?: IOrderDTO['modalityType'];
};

export const MobileRadiologySelectTemplateModal = forwardRef<
  HTMLElement,
  MobileRadiologySelectTemplateModalProps
>((props, ref) => {
  const { closeModal, isOpen, order, request, modalityType } = props;
  const translate = useTranslate();

  const { triggerSetTemplate } = useSelectTemplate();

  const onRowClick = (e: MouseEvent<HTMLTableRowElement>, row: Row<IContentDTO>) => {
    triggerSetTemplate({
      callbackSuccess: closeModal,
      contentID: row.original.id,
    });
  };

  return isOpen ? (
    <Modal disableEnforceFocus open={isOpen}>
      <ModalContent
        renderBody={() => (
          <MobileLayout title={translate.pages.orderReport.orderInfo()}>
            <LayoutWithTopbarWrapper
              onBackward={closeModal}
              title={translate.resources.report.selectTemplate.title()}
              MainComponent={
                <MobileRadiologySelectTemplateModalContentShell
                  ContentComponent={
                    <MobileRadiologySelectTemplateInfo
                      order={order}
                      request={request}
                      modalityType={modalityType}
                      onRowClick={onRowClick}
                    />
                  }
                />
              }
            />
          </MobileLayout>
        )}
      />
    </Modal>
  ) : (
    <></>
  );
});

MobileRadiologySelectTemplateModal.displayName = 'MobileRadiologySelectTemplateModal';
