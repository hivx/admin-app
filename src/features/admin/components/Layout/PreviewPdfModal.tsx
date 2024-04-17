import { Box, Modal, styled } from '@mui/material';
import { UseFormGetValues } from 'react-hook-form';

import { MyButton } from '@/components';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useDisclosure, useTranslate } from '@/hooks';

import { ILayoutFormFields } from './LayoutFormFields';
import { LayoutIframePreview } from './LayoutIframePreview';

type PreviewPdfButtonProps = {
  getValues: UseFormGetValues<ILayoutFormFields>;
  disclosure: ReturnType<typeof useDisclosure>;
};

export const PreviewPdfModal = (props: PreviewPdfButtonProps) => {
  const { getValues, disclosure } = props;
  const translate = useTranslate();

  const html = getValues('data');

  return (
    <>
      {disclosure.isOpen && (
        <Modal open={disclosure.isOpen}>
          <StyledAppModalContent
            width="55%"
            height="80%"
            renderBody={() => {
              return html ? <LayoutIframePreview html={html} /> : <></>;
            }}
            renderFooter={() => (
              <Box padding={2}>
                <ModalFooterLayout
                  ActionButton={<></>}
                  OptionalButtons={[
                    <MyButton key="close" variant="outlined" onClick={disclosure.close}>
                      {translate.buttons.close()}
                    </MyButton>,
                  ]}
                />
              </Box>
            )}
          />
        </Modal>
      )}
    </>
  );
};

const StyledAppModalContent = styled(ModalContent)`
  max-height: 100%;
`;
