import { Box, MenuItem, styled, Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

import { MyCheckbox, MyFormCheckboxField, MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import OrderInfoField from '@/components/Order/Panel/OrderInfoField';
import OrderInfoTypography from '@/components/Order/Panel/OrderInfoTypography';
import { useTranslate } from '@/hooks';
import { IContentGroupDTO, IProcedureDTO, ISearchContentFilter } from '@/types/dto';
import { filterTransientProps } from '@/utils/filterTransientProps';

export type IMobileRadiologySelectTemplateFormFields = Partial<ISearchContentFilter> & {
  filterProcedureID?: boolean;
  filterUserID?: boolean;
};

type MobileRadiologySelectTemplateFormFieldsProps =
  IFormControlInputProps<IMobileRadiologySelectTemplateFormFields> & {
    listContentGroup?: IContentGroupDTO[];
    procedure?: IProcedureDTO | null;
  };
export const MobileRadiologySelectTemplateFormFields: FC<
  MobileRadiologySelectTemplateFormFieldsProps
> = (props) => {
  const { control, onKeyDown, listContentGroup, procedure } = props;
  const translate = useTranslate();
  return (
    <StyledMobileRadiologySelectTemplateFormFieldsContainer>
      {/**
       * Thông tin ca chụp tên dịch vụ chụp và loại máy
       */}
      <StyledOrderInfoField>
        <OrderInfoField
          Label={
            <OrderInfoTypography
              title={translate.resources.report.selectTemplate.service()}
            >
              {translate.resources.report.selectTemplate.service()}
            </OrderInfoTypography>
          }
          labelXS={3}
          containerSpacing={1}
          FieldValue={<Typography variant="body2">{procedure?.name}</Typography>}
        />
      </StyledOrderInfoField>
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
        FieldValue={<OrderInfoTypography>{procedure?.modalityType}</OrderInfoTypography>}
      />
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
    </StyledMobileRadiologySelectTemplateFormFieldsContainer>
  );
};
const StyledTypography = styled(Typography, filterTransientProps)<TypographyProps>`
  ${(props) => props.theme.typography.body2}
  margin-left: 10px;
`;

const StyledMobileRadiologySelectTemplateFormFieldsContainer = styled('div')`
  padding: ${(props) => props.theme.spacing(2)};
  padding-bottom: 0;
  width: 100%;
  display: grid;
  row-gap: ${(props) => props.theme.spacing(1)};
`;

const StyledOrderInfoField = styled('div')`
  > div {
    align-items: baseline;
    white-space: unset;
  }
`;
