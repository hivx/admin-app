import { MenuItem, lighten, styled } from '@mui/material';
import React from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';

import { MyToggleButton } from '@/components';
import { useTranslate } from '@/hooks';

import { IQmsModalityTypeDTO } from '../../types/qmsModalityType';

import { ModalityTypesSelect } from './ModalityTypesSelect';

type ModalityTypeFilterGroupProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  modalityTypeList: IQmsModalityTypeDTO[];
};

export const ModalityTypeFilterGroup = <T extends FieldValues>(
  props: ModalityTypeFilterGroupProps<T>,
) => {
  const translate = useTranslate();
  const modalityTypeList = props.modalityTypeList.slice();
  const modalityTypeButtons = modalityTypeList.splice(0, 5);
  return (
    <div>
      <ModalityTypesSelect
        name={props.name}
        control={props.control}
        ModalityButtons={modalityTypeButtons.map((item, index) => {
          return (
            <StyledMyToggleButton color="primary" fullWidth key={index} value={item}>
              {item}
            </StyledMyToggleButton>
          );
        })}
        renderSelectFields={[
          <MenuItem key="null" value={''}>
            {translate.buttons.all()}
          </MenuItem>,
          modalityTypeList.map((item, index) => (
            <MenuItem key={index} value={item || ''}>
              {item}
            </MenuItem>
          )),
        ]}
      />
    </div>
  );
};

const StyledMyToggleButton = styled(MyToggleButton)`
  /* background-color: ${(props) => props.theme.palette.background.paper}; */
  color: ${(props) => props.theme.palette.text.primary};
  border: 1px solid ${(props) => lighten(props.theme.palette.primary.main, 0.5)};
  border-radius: 0px;
`;
