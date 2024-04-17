import { Checkbox, Grid, Skeleton, Stack, styled } from '@mui/material';
import { FC } from 'react';

import { MyFormTextField, MyTextField } from '@/components';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { BaseEntity } from '@/types';
import { IGroupDTO, IModalityDTO, IRoleDTO } from '@/types/dto';
import { IModuleDTO } from '@/types/dto/module';
import { IStatisticalReportDTO } from '@/types/dto/statisticalReport';

export type IUserGroupFormFields = Partial<Omit<IGroupDTO, 'name'>> & {
  name: string;
  modalityIDs?: BaseEntity[];
  moduleIDs?: BaseEntity[];
  reportIDs?: BaseEntity[];
  roleIDs?: BaseEntity[];
};

type UserGroupFormFieldsProps = IFormControlInputProps<IUserGroupFormFields> & {
  record?: IGroupDTO;
  listModality?: IModalityDTO[];
  listRole?: IRoleDTO[];
  listModule?: IModuleDTO[];
  listReport?: IStatisticalReportDTO[];
};
export const UserGroupFormFields: FC<UserGroupFormFieldsProps> = (props) => {
  const { record, control, onKeyDown, listModality, listRole, listModule, listReport } =
    props;
  const translate = useTranslate();

  return (
    <Stack spacing={1}>
      {record && (
        <MyTextField value={record.id} label={'ID'} disabled fullWidth size="small" />
      )}
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.group.name.short(),
          placeholder: translate.resources.group.name.short(),
          fullWidth: true,
          required: true,
          size: 'small',
          onKeyDown,
        }}
      />
      {listModule ? (
        <MyFormAutoComplete
          name={'modules'}
          control={control}
          placeholder={translate.resources.group.module.long()}
          enableSelectAll
          MyAutoCompleteProps={{
            size: 'small',
            fullWidth: true,
            options: listModule,
            isOptionEqualToValue: (option, value) => option?.id === value?.id,
            getOptionLabel: (option) => (option as IModuleDTO)?.name || '',
            renderOption: (props, option, state) => {
              return (
                <li {...props}>
                  <StyledDivLeftChildren>
                    <Checkbox size="small" checked={state.selected} />
                    {option?.name}
                  </StyledDivLeftChildren>
                </li>
              );
            },
          }}
        />
      ) : (
        <Skeleton />
      )}
      {listModality ? (
        <MyFormAutoComplete
          name={'modalities'}
          control={control}
          placeholder={translate.resources.group.modality()}
          enableSelectAll
          MyAutoCompleteProps={{
            size: 'small',
            fullWidth: true,
            options: listModality,
            isOptionEqualToValue: (option, value) => option?.id === value?.id,
            getOptionLabel: (option) => {
              if (typeof option !== 'string') {
                return `${option.modalityType} - ${option?.name}`;
              }
              return option;
            },
            renderOption: (props, option, state) => {
              return (
                <li {...props}>
                  <StyledDivLeftChildren>
                    <Checkbox size="small" checked={state.selected} />
                    {option?.modalityType}-{option?.name}
                  </StyledDivLeftChildren>
                </li>
              );
            },
          }}
        />
      ) : (
        <Skeleton />
      )}

      {listRole ? (
        <MyFormAutoComplete
          name={'roles'}
          control={control}
          placeholder={translate.resources.group.role()}
          enableSelectAll
          MyAutoCompleteProps={{
            size: 'small',
            fullWidth: true,
            options: listRole,
            isOptionEqualToValue: (option, value) => option?.id === value?.id,
            getOptionLabel: (option) => (option as IRoleDTO)?.name || '',
            renderOption: (props, option, state) => {
              return (
                <li {...props}>
                  <StyledDivLeftChildren>
                    <Checkbox size="small" checked={state.selected} />
                    {option?.name}
                  </StyledDivLeftChildren>
                </li>
              );
            },
          }}
        />
      ) : (
        <Skeleton />
      )}
      {listReport ? (
        <MyFormAutoComplete
          name={'reports'}
          control={control}
          placeholder={translate.resources.group.report()}
          enableSelectAll
          MyAutoCompleteProps={{
            size: 'small',
            fullWidth: true,
            options: listReport,
            isOptionEqualToValue: (option, value) => option?.id === value?.id,
            getOptionLabel: (option) => (option as IStatisticalReportDTO)?.name || '',
            renderOption: (props, option, state) => {
              return (
                <li {...props}>
                  <StyledDivLeftChildren>
                    <Checkbox size="small" checked={state.selected} />
                    {option?.name}
                  </StyledDivLeftChildren>
                </li>
              );
            },
          }}
        />
      ) : (
        <Skeleton />
      )}
      <MyFormTextField
        name="description"
        control={control}
        MyTextFieldProps={{
          label: translate.resources.group.description(),
          placeholder: translate.resources.group.description(),
          fullWidth: true,
          size: 'small',
          onKeyDown,
          rows: 3,
          multiline: true,
        }}
      />
    </Stack>
  );
};
