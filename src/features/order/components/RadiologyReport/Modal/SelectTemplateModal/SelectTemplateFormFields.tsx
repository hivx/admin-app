import { Box, Grid, MenuItem, styled, Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

import { MyCheckbox, MyFormCheckboxField, MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useTranslate } from '@/hooks';
import { IContentGroupDTO, IProcedureDTO, ISearchContentFilter } from '@/types/dto';
import { filterTransientProps } from '@/utils/filterTransientProps';

export type ISelectTemplateFormFields = Partial<ISearchContentFilter> & {
  filterProcedureID?: boolean;
  filterUserID?: boolean;
};

type SelectTemplateFormFieldsProps = IFormControlInputProps<ISelectTemplateFormFields> & {
  listContentGroup?: IContentGroupDTO[];
  procedure?: IProcedureDTO | null;
};
export const SelectTemplateFormFields: FC<SelectTemplateFormFieldsProps> = (props) => {
  const { control, onKeyDown, listContentGroup, procedure } = props;
  const translate = useTranslate();
  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      <Grid item xs={6}>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.report.selectTemplate.service()}
            >
              {translate.resources.report.selectTemplate.service()}
            </OrderInfoTypography>
          }
          containerSpacing={1}
          FieldValue={<Typography>{procedure?.name || ''}</Typography>}
        />
      </Grid>

      <Grid item xs={6}>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.report.selectTemplate.modalityType()}
            >
              {translate.resources.report.selectTemplate.modalityType()}
            </OrderInfoTypography>
          }
          labelXS={3}
          containerSpacing={1}
          FieldValue={
            <OrderInfoTypography>{procedure?.modalityType}</OrderInfoTypography>
          }
        />
      </Grid>
      <Grid item xs={6}>
        <MyFormCheckboxField
          control={control}
          render={({ value, onChange }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MyCheckbox checked={!!value} onChange={onChange} compact />
              <StyledTypography>
                {translate.resources.report.selectTemplate.selectByService()}
              </StyledTypography>
            </Box>
          )}
          name="filterProcedureID"
        />
      </Grid>
      <Grid item xs={6}>
        <MyFormCheckboxField
          control={control}
          render={({ value, onChange }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <MyCheckbox checked={!!value} onChange={onChange} compact />
              <StyledTypography>
                {translate.resources.report.selectTemplate.selectByPersonal()}
              </StyledTypography>
            </Box>
          )}
          name="filterUserID"
        />
      </Grid>
      <Grid item xs={6}>
        <MyFormSelectField
          name="groupID"
          control={control}
          MySelectProps={{
            label: translate.resources.report.selectTemplate.templateGroup.short(),
          }}
        >
          <MenuItem key="null" value={''}>
            &nbsp;
          </MenuItem>
          {(listContentGroup || []).map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      </Grid>

      <Grid item xs={6}>
        <MyFormTextField
          name="name"
          control={control}
          MyTextFieldProps={{
            label: translate.resources.report.selectTemplate.templateName.short(),
            placeholder: translate.resources.report.selectTemplate.templateName.short(),
            fullWidth: true,
            size: 'small',
            onKeyDown,
          }}
        />
      </Grid>
    </Grid>
  );
};
const StyledTypography = styled(Typography, filterTransientProps)<TypographyProps>`
  margin-left: 10px;
`;
