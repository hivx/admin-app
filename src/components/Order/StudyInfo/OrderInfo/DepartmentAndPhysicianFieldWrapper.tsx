import React, { FC, useState } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { IOrderDTO, IOrderUpdateDTO } from '@/types/dto';

import { ReferringPhysicianDynamicEditableField } from './ReferringPhysicianDynamicEditableField';
import { RequestDepartmentDynamicEditableField } from './RequestDepartmentDynamicEditableField';

type RequestDepartmentDynamicEditableFieldProps = {
  order?: IOrderDTO;
  readonly?: boolean;
  control: Control<IOrderUpdateDTO>;
  watch: UseFormWatch<IOrderUpdateDTO>;
  setValue: UseFormSetValue<IOrderUpdateDTO>;
};

/**
 * Gói 2 trường Khoa chỉ định + Bác sĩ chỉ định,
 * để xử lý giá trị hiển thị của trường BSCD theo giá trị Khoa phòng đang select
 */
export const DepartmentAndPhysicianFieldWrapper: FC<
  RequestDepartmentDynamicEditableFieldProps
> = ({ control, watch, order, readonly, setValue }) => {
  const [physicianDisableValue, setPhysicianDisableValue] = useState<string | undefined>(
    order?.referringPhysician?.fullname ?? '',
  );
  return (
    <>
      <RequestDepartmentDynamicEditableField
        order={order}
        readonly={readonly}
        control={control}
        watch={watch}
        setPhysicianDisableValue={setPhysicianDisableValue}
        setValue={setValue}
      />
      <ReferringPhysicianDynamicEditableField
        order={order}
        readonly={readonly}
        control={control}
        watch={watch}
        disabledValue={physicianDisableValue ?? ''}
        setPhysicianDisableValue={setPhysicianDisableValue}
      />
    </>
  );
};
