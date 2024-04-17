import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { ImageDataState, OnSelectImage } from '@/hooks/useSelectDicomImage';

import ImageList from './LayoutShowImage/ImageList';
import {
  PrintDicomImageFields,
  PrintDicomImageSelectForm,
} from './PrintDicomImageFields';

import { LAYOUT_DISPLAY_NAME, printImageConfig } from '.';

export type PrintImagePanelProps = {
  setLayoutID: React.Dispatch<
    React.SetStateAction<PrintDicomImageSelectForm['layoutID']>
  >;
  onSelectImage: OnSelectImage;
  listImage: ImageDataState[];
  selectedDicomImageIDs: ImageDataState['id'][];
  layoutID: LAYOUT_DISPLAY_NAME;
};

export const PrintImagePanel = (props: PrintImagePanelProps) => {
  const { setLayoutID, layoutID, selectedDicomImageIDs, ...imageListProps } = props;
  const translate = useTranslate();

  const stringCountImages = `${selectedDicomImageIDs.length}/${printImageConfig[layoutID].numberOfImages}`;

  const formOptions: UseFormProps<PrintDicomImageSelectForm> = {
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(
      z.object({
        layoutID: z.string(),
      }),
    ),
    defaultValues: {
      layoutID: LAYOUT_DISPLAY_NAME.ONE_IMAGE_LAYOUT,
    },
  };

  const handleSubmit = (formData: PrintDicomImageSelectForm) => {
    setLayoutID(formData.layoutID);
  };

  return (
    <StyledPrintImagePanel>
      {/**
       * Component select layout
       */}
      <Stack>
        <MyFormGroupUnstyled
          autoSubmit
          formOptions={formOptions}
          submitOnEnter
          onSubmit={handleSubmit}
          renderInputs={(controls) => <PrintDicomImageFields {...controls} />}
        />
      </Stack>

      {/**
       *  Display image list
       */}
      <Box height={'100%'}>
        <Typography>
          {translate.resources.report.dicomImage.numberOfImageSelected()} :{' '}
          {stringCountImages}
        </Typography>
        <ImageList selectedDicomImageIDs={selectedDicomImageIDs} {...imageListProps} />
      </Box>
    </StyledPrintImagePanel>
  );
};

const StyledPrintImagePanel = styled('div')`
  padding: ${(props) => props.theme.spacing(2)};
  display: grid;
  grid-template-rows: 0.5fr 4fr;
`;
