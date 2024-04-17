import { MenuItem } from '@mui/material';
import { FC } from 'react';

import { useGetOneModalityQuery, useLazyGetListModalityQuery } from '@/api/modality';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';

import { SessionConfigFormField } from './DefaultInfoRadiolgyForm';

export type SessionModalityFieldProps = IFormControlInputProps<SessionConfigFormField>;

export const SessionModalityField: FC<SessionModalityFieldProps> = ({
  control,
  formState,
}) => {
  const translate = useTranslate();

  const [trigger] = useLazyGetListModalityQuery();
  const value = formState.defaultValues?.modalityID;
  const { data: modality } = useGetOneModalityQuery({ id: value ?? 0 }, { skip: !value });
  /**
   * func get list modality by modality type
   */
  const getModalityListByType = async () => {
    return (
      (
        await trigger(
          {
            filter: {},
          },
          true,
        )
      ).data?.list ?? []
    );
  };

  return (
    <MyLazyFormSelectField
      name="modalityID"
      control={control}
      MySelectProps={{
        label: translate.resources.order.actionModality(),
        fullWidth: true,
      }}
      disableValue={modality?.name ?? ''}
      onGetListRecord={getModalityListByType}
      renderSelectField={({ listData: modalityList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          <MenuItem key="null" value={0}>
            &nbsp;
          </MenuItem>
          {modalityList.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};
