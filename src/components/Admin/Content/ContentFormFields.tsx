import { Grid, Stack, styled } from '@mui/material';
import { FC } from 'react';

import { MyFormTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormHtmlEditor } from '@/components/Form/MyFormHtmlEditor';
import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';
import { IContentDTO, IContentGroupDTO, IProcedureDTO } from '@/types/dto';

import { ContentGroupAutocomplete } from './ContentGroupAutocomplete';
import { ContentProcedureAutocomplete } from './ContentProcedureAutocomplete';

export type IContentFormFields = Partial<Omit<IContentDTO, 'name'>> & {
  name: string;
  procedureIDs: BaseEntity['id'][];
  groupIDs: BaseEntity['id'][];
  procedures?: IProcedureDTO[];
  groups?: IContentGroupDTO[];
};

type ContentFormFieldsProps = IFormControlInputProps<IContentFormFields> & {
  record?: IContentDTO;
};
export const ContentFormFields: FC<ContentFormFieldsProps> = (props) => {
  const { control, onKeyDown } = props;
  const translate = useTranslate();
  return (
    <StyledContentFormFieldsContainer>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <MyFormTextField
              name="name"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.content.name.short(),
                placeholder: translate.resources.content.name.long(),
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <ContentProcedureAutocomplete control={control} name="procedures" />
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={2}>
            <MyFormTextField
              name="description"
              control={control}
              MyTextFieldProps={{
                label: translate.resources.content.description(),
                placeholder: translate.resources.content.description(),
                fullWidth: true,
                size: 'small',
                onKeyDown,
              }}
            />
            <ContentGroupAutocomplete control={control} name="groups" />
          </Stack>
        </Grid>
      </Grid>

      <MyFormHtmlEditor
        name="findings"
        control={control}
        required
        label={translate.resources.content.findings()}
        placeholder={translate.resources.content.findings()}
        MyHtmlEditorProp={{ height: '400px' }}
      />

      <MyFormTextField
        name="impression"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.content.impression(),
          placeholder: translate.resources.content.impression(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          multiline: true,
          minRows: 3,
        }}
      />
    </StyledContentFormFieldsContainer>
  );
};

const StyledContentFormFieldsContainer = styled('div')`
  display: grid;
  grid-template-rows: auto 4fr 1fr;
  row-gap: ${(props) => props.theme.spacing(2)};
`;
