import { Grid, MenuItem, Stack, styled } from '@mui/material';
import { FC } from 'react';

import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';
import { ILayoutDTO, ILayoutDTOBase, IModalityTypeNameDTO } from '@/types/dto';

import { LayoutDepartmentAutoCompleteField } from './LayoutDepartmentAutoCompleteField';
import { LayoutHtmlEditor } from './LayoutHtmlEditor';
import { LayoutProcedureAutoComplete } from './LayoutProcedureAutoComplete';

type LayoutFormat = {
  id: string;
  name: string;
};

// Dinh dang tam thoi hard-code theo ben product
export const layoutFormats: LayoutFormat[] = [
  {
    name: 'HTML',
    id: 'HTML',
  },
  {
    name: 'JSON',
    id: 'JSON',
  },
  {
    name: 'EXCEL',
    id: 'EXCEL',
  },
  {
    name: 'DOC',
    id: 'DOC',
  },
];

export type ILayoutFormFields = Partial<
  Omit<ILayoutDTOBase, 'name' | 'data'> & {
    departmentIDs: BaseEntity['id'][];
    procedureIDs: BaseEntity['id'][];
  }
> & {
  name: string;
  data: string;
};

type LayoutFormFieldsProps = IFormControlInputProps<ILayoutFormFields> & {
  record?: ILayoutDTO;
  modalityTypeNames: IModalityTypeNameDTO[];
};
export const LayoutFormFields: FC<LayoutFormFieldsProps> = (props) => {
  const { control, onKeyDown, modalityTypeNames, getValues } = props;
  const translate = useTranslate();
  return (
    <StyledLayoutFormFieldsContainer>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <MyFormTextField
              name="name"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.layout.name.short(),
                placeholder: translate.resources.layout.name.short(),
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <MyFormSelectField
              name="modalityType"
              control={control}
              MySelectProps={{
                label: translate.resources.layout.modalityType(),
              }}
            >
              <MenuItem key="null" value={''}>
                &nbsp;
              </MenuItem>
              {modalityTypeNames &&
                modalityTypeNames.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.id}
                  </MenuItem>
                ))}
            </MyFormSelectField>
            <LayoutProcedureAutoComplete control={control} name="procedures" />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <MyFormSelectField
              name="format"
              control={control}
              MySelectProps={{
                label: translate.resources.layout.format(),
              }}
            >
              <MenuItem key="null" value={''}>
                &nbsp;
              </MenuItem>
              {layoutFormats &&
                layoutFormats.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
            </MyFormSelectField>
            <MyFormTextField
              name="numOfImages"
              control={control}
              MyTextFieldProps={{
                type: 'number',
                label: translate.resources.layout.numOfImages(),
                placeholder: translate.resources.layout.numOfImages(),
                fullWidth: true,
                size: 'small',
                onKeyDown,
                InputProps: {
                  inputProps: { min: 0 },
                },
              }}
            />
            <LayoutDepartmentAutoCompleteField control={control} name="departments" />
          </Stack>
        </Grid>
      </Grid>
      <LayoutHtmlEditor getValues={getValues} control={control} />
      <MyFormTextField
        name="description"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.layout.description(),
          placeholder: translate.resources.layout.description(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          multiline: true,
          rows: 4,
        }}
      />
    </StyledLayoutFormFieldsContainer>
  );
};

const StyledLayoutFormFieldsContainer = styled('div')`
  display: grid;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  row-gap: ${(props) => props.theme.spacing(2)};
`;
