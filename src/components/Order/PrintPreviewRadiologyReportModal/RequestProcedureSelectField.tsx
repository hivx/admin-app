import { MenuItem } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Control, Path } from 'react-hook-form';

import { useGetListProcedureQuery } from '@/api/procedure';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useTranslate } from '@/hooks';
import { InformationPrintFormData } from '@/hooks/printRadiologyReport/usePrintReportButton';

type RequestProcedureSelectFieldProps = {
  name: Path<InformationPrintFormData>;
  control: Control<InformationPrintFormData>;
  modalityType?: string;
  disabled?: boolean;
};

export const RequestProcedureSelectField = (props: RequestProcedureSelectFieldProps) => {
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
        label: translate.pages.orderReport.requestProcedure(),
        disabled,
      }}
    >
      {procedureData?.list.map((item) => (
        <MenuItem key={item.id} value={item.name ?? ''}>
          {item.name}
        </MenuItem>
      ))}
    </MyFormSelectField>
  );
};
