import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal, styled, Typography } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyButton, MyIconButton } from '@/components';
import CancelButton from '@/components/Elements/Buttons/CancelButton';
import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { MyFormGroupUnstyled } from '@/components/Form';
import { ModalFooterLayout } from '@/components/Layout/ModalFooterLayout';
import { useAppDispatch, useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import {
  getScreenID,
  getVideoConstraints,
  selectToggleCustomScreen,
  setVideoConstraints,
} from '@/stores/OrderRadiology';

import { ConfigUploadNonDicomFields, SCREEN_LIST } from './ConfigUploadNonDicomFields';
import { ConfigUploadNonDicomHeaderShell } from './ConfigUploadNonDicomHeaderShell';

type ConfigUploadNonDicomModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export type ConfigFormData = {
  width: number;
  height: number;
  screenID: number;
  /**
   * False: user will see a screen list select(show select field)
   * True: User can typing value width, height(show input field & hide select field)
   * @returns boolean
   */
  isCustomScreen: boolean;
};
// Prop disclosure used to control on/off modal state
export const ConfigUploadNonDicomModal: FC<ConfigUploadNonDicomModalProps> = (props) => {
  const { disclosure } = props;
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  /**
   * Get config screen camera
   * result {width: xxx, height: xxx}
   */
  const videoConstraints = useAppSelector(getVideoConstraints);
  /**
   * Get id sreen selected in config modal
   */
  const screenID = useAppSelector(getScreenID);

  const isCustomScreen = useAppSelector(selectToggleCustomScreen);

  /**
   * Form data
   */
  const formOptions: UseFormProps<ConfigFormData> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        width: z.coerce.number(),
        height: z.coerce.number(),
        screenID: z.coerce.number(),
        isCustomScreen: z.boolean(),
      }),
    ),
    defaultValues: {
      width: videoConstraints.width,
      height: videoConstraints.height,
      screenID: screenID,
      isCustomScreen: isCustomScreen,
    },
  };

  /**
   * Submit video video contraints
   * @param formData
   */
  const handleSubmit = (formData: ConfigFormData) => {
    const {
      width: customWidth,
      height: customHeight,
      screenID: selectedScreen,
      isCustomScreen,
    } = formData;
    /**
     * Get current obj screen find by screen id selected
     */
    const currentSelectedScreen = SCREEN_LIST.find(
      (screen) => screen.id === selectedScreen,
    );

    /**
     * Set new value of video constaints
     */
    if (customWidth && customHeight && currentSelectedScreen) {
      /**
       * Create obj prepare set to store redux
       */
      const screenValue = {
        width: isCustomScreen ? customWidth : currentSelectedScreen.width,
        height: isCustomScreen ? customHeight : currentSelectedScreen.height,
      };
      /**
       * Save value screen selected to store redux
       */
      dispatch(
        setVideoConstraints({
          videoConstraints: screenValue,
        }),
      );
    }
  };

  return (
    <>
      <MyFormGroupUnstyled
        onSubmit={handleSubmit}
        formOptions={formOptions}
        submitOnEnter
        renderInputs={({ control, submit }) => (
          <Modal open={disclosure.isOpen} disableEnforceFocus>
            <StyledConfigUploadNonDicomModal
              renderTitle={() => (
                <ConfigUploadNonDicomHeaderShell
                  CloseButton={
                    <MyIconButton onClick={disclosure.close}>
                      <CloseIcon />
                    </MyIconButton>
                  }
                >
                  <Typography>
                    {translate.pages.orderReport.media.config.title().toUpperCase()}
                  </Typography>
                </ConfigUploadNonDicomHeaderShell>
              )}
              renderBody={() => (
                <ConfigUploadNonDicomFields
                  control={control}
                  isCustomScreen={isCustomScreen}
                />
              )}
              renderFooter={() => (
                <Box p={2}>
                  <ModalFooterLayout
                    ActionButton={
                      <MyButton
                        variant="contained"
                        onClick={() => {
                          submit();
                          disclosure.close();
                        }}
                      >
                        {translate.buttons.confirm()}
                      </MyButton>
                    }
                    OptionalButtons={[
                      <CancelButton key="" onClick={disclosure.close} color="primary">
                        {translate.buttons.close()}
                      </CancelButton>,
                    ]}
                  />
                </Box>
              )}
            />
          </Modal>
        )}
      />
    </>
  );
};

const StyledConfigUploadNonDicomModal = styled(ModalContent)`
  width: calc(100vw / 3);
  max-width: calc(100vw / 3);
`;
