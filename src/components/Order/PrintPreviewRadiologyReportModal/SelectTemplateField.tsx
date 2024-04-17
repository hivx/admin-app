import { MenuItem } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Control, Path } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useAppSelector, useTranslate } from '@/hooks';
import { InformationPrintFormData } from '@/hooks/printRadiologyReport/usePrintReportButton';
import { getOrderLayouts } from '@/stores/OrderRadiology/orderLayoutSlice';

type SelectTemplateFieldProps = {
  name: Path<InformationPrintFormData>;
  control: Control<InformationPrintFormData>;
};
/**
 * Trường chọn mẫu in kết quả,
 * Dùng ở modal Xem trước kết quả
 */
const SelectTemplateField: FC<SelectTemplateFieldProps> = (props) => {
  const { name, control } = props;
  const templates = useAppSelector(getOrderLayouts());

  const translate = useTranslate();

  return templates ? (
    <MyFormSelectField
      name={name}
      control={control}
      MySelectProps={{
        label: translate.resources.layout.title.long(),
      }}
    >
      {templates.map((template) => (
        <MenuItem key={template.id} value={template.id}>
          {template.name}
        </MenuItem>
      ))}
    </MyFormSelectField>
  ) : (
    <></>
  );
};

export default SelectTemplateField;
