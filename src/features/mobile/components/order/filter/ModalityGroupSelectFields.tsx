import { MenuItem } from '@mui/material';
import { Control, FieldValues, Path } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';
import {
  MODALITY_GROUP_PREFIX,
  ModalitiesByGroupType,
} from '@/lib/dataHelper/modalityHelper';

import { MobileOrderListFilter } from './MobileOrderListFilter';

type ModalityGroupSelectFieldsProps<T extends FieldValues> = {
  modalitiesByGroupData: ModalitiesByGroupType;
  name: Path<T>;
  control: Control<T>;
};

export const ModalityGroupSelectFields = <T extends FieldValues>({
  modalitiesByGroupData,
  name,
  control,
}: ModalityGroupSelectFieldsProps<T>) => {
  /**
   * get list modality group name with prefix in modalitiesByGroupData
   */
  const modalitiesGroupName: MobileOrderListFilter['groupModalities'][] = [
    ...modalitiesByGroupData.keys(),
  ];
  const translate = useTranslate();
  return (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.modality.group.short(),
      }}
    >
      <MenuItem key="null" value={''}>
        &nbsp;
      </MenuItem>
      {modalitiesGroupName.map((item) => {
        return (
          <MenuItem key={item} value={item}>
            {item.replace(MODALITY_GROUP_PREFIX, '')}
          </MenuItem>
        );
      })}
    </MyFormSelectField>
  );
};
