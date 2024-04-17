import { MenuItem } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Control, Path } from 'react-hook-form';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';
import { IOrderRequestDTOCreate } from '@/types/dto';

type EditRequestProcedureSelectFieldProps = {
  name: Path<IOrderRequestDTOCreate>;
  control: Control<IOrderRequestDTOCreate>;
  modalityType?: string;
  disabled?: boolean;
};

export const EditRequestProcedureSelectField = (
  props: EditRequestProcedureSelectFieldProps,
) => {
  const { control, name, modalityType, disabled } = props;
  const translate = useTranslate();
  const { data: procedureData } = useGetListProcedureQuery(
    modalityType
      ? {
          filter: { modalityTypes: [modalityType] },
        }
      : skipToken,
  );
  return (
    <MyFormSelectField
      name={name}
      control={control}
      required
      MySelectProps={{
        label: translate.resources.procedure.title(),
        disabled,
      }}
    >
      <MenuItem key="null" value={-1}>
        &nbsp;
      </MenuItem>
      {procedureData?.list.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </MyFormSelectField>
  );
};
