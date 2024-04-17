import { MenuItem, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';

import { LAYOUT_DISPLAY_NAME, printImageConfig } from '.';

export type PrintDicomImageSelectForm = { layoutID: LAYOUT_DISPLAY_NAME };

export type PrintDicomImageFieldsProps =
  IFormControlInputProps<PrintDicomImageSelectForm>;

/**
 *
 * @returns Component select layout print image
 */
export const PrintDicomImageFields: FC<PrintDicomImageFieldsProps> = (props) => {
  const { watch, control } = props;
  const translate = useTranslate();
  return (
    <Stack spacing={1}>
      <Typography>{translate.resources.report.dicomImage.layoutPrintImage()}</Typography>
      <MyFormSelectField name="layoutID" control={control}>
        {Object.entries(printImageConfig).map(([keys, values]) => (
          <MenuItem key={keys} value={keys}>
            {values.displayName}
          </MenuItem>
        ))}
      </MyFormSelectField>
    </Stack>
  );
};
