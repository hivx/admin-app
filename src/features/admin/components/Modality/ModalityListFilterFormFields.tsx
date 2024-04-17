import { Checkbox, MenuItem } from '@mui/material';
import React, { FC } from 'react';

import { useGetListModalityGroupQuery } from '@/api/modalityGroup';
import { useGetListModalityTypeNameQuery } from '@/api/modalityTypeName';
import { MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { useTranslate } from '@/hooks';
import { IModalityTypeNameDTO } from '@/types/dto';
import { uuidv4 } from '@/utils/uuidv4';

import { useGetListModalityRoomQuery } from '../../api/modalityRoom';

import { ModalityFilterForm } from './ModalityListFilterForm';

type ModalityListFilterFormFieldsProps = {
  formControlProps: IFormControlInputProps<ModalityFilterForm>;
};
const ModalityListFilterFormFields: FC<ModalityListFilterFormFieldsProps> = (props) => {
  const { formControlProps } = props;
  const translate = useTranslate();
  const { data: modalityNameData } = useGetListModalityTypeNameQuery({
    filter: {},
  });
  const { data: modalityRoomData } = useGetListModalityRoomQuery({
    filter: {},
  });
  const { data: modalityGroupData } = useGetListModalityGroupQuery({
    filter: {},
  });

  const listModalityName = modalityNameData?.list;
  const listModalityRoom = modalityRoomData?.list;
  const listModalityGroup = modalityGroupData?.list;

  return (
    <>
      <MyFormTextField
        name="code"
        control={formControlProps.control}
        MyTextFieldProps={{
          label: translate.resources.modality.code.long(),
          placeholder: translate.resources.modality.code.long(),
          fullWidth: true,
          onKeyDown: formControlProps.onKeyDown,
        }}
      />

      {listModalityName && (
        <MyFormAutoComplete
          key={uuidv4()}
          name="modalityTypeData"
          control={formControlProps.control}
          placeholder={translate.resources.modality.modalityType.long()}
          enableSelectAll
          MyAutoCompleteProps={{
            size: 'small',
            disablePortal: true,
            options: listModalityName,
            isOptionEqualToValue: (option, value) => option.id === value.id,
            getOptionLabel: (option) => (option as IModalityTypeNameDTO)?.id,
            renderOption: (props, option, state) => {
              return (
                <li {...props}>
                  <StyledDivLeftChildren>
                    <Checkbox size="small" checked={state.selected} />
                    {option?.id}
                  </StyledDivLeftChildren>
                </li>
              );
            },
          }}
        />
      )}
      {/* <MyFormSelectField
    name="modalityType"
    control={control}
    error={formState.errors.modalityType}
    MySelectProps={{
      label: translate.resources.modality.modalityType.long(),
    }}
  >
    <MenuItem key="null" value={''}>
      &nbsp;
    </MenuItem>
    {listModalityName &&
      listModalityName.map((item) => (
        <MenuItem key={item.id} value={item.id || ''}>
          {item.id}
        </MenuItem>
      ))}
  </MyFormSelectField> */}
      <MyFormSelectField
        name="roomIdString"
        control={formControlProps.control}
        MySelectProps={{
          label: translate.resources.modality.room.long(),
          placeholder: translate.resources.modality.room.long(),
        }}
      >
        <MenuItem key="null" value={''}>
          &nbsp;
        </MenuItem>
        {listModalityRoom &&
          listModalityRoom.map((item) => (
            <MenuItem key={item.id} value={item.id.toString() || ''}>
              {item.code}
            </MenuItem>
          ))}
      </MyFormSelectField>
      <MyFormSelectField
        name="groupIdString"
        control={formControlProps.control}
        MySelectProps={{
          label: translate.resources.modality.group.long(),
          placeholder: translate.resources.modality.group.long(),
        }}
      >
        <MenuItem key="null" value={''}>
          &nbsp;
        </MenuItem>
        {listModalityGroup &&
          listModalityGroup.map((item) => (
            <MenuItem key={item.id} value={item.id.toString() || ''}>
              {item.code}
            </MenuItem>
          ))}
      </MyFormSelectField>
    </>
  );
};

export default ModalityListFilterFormFields;
