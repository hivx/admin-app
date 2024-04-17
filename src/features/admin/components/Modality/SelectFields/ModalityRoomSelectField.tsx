import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { useTranslate } from '@/hooks';
import { IModalityDTO } from '@/types/dto';

import { useLazyGetListModalityRoomQuery } from '../../../api/modalityRoom';
import { IModalityFormFields } from '../ModalityEditForm';

type ModalityRoomSelectFieldProps = {
  control: Control<IModalityFormFields>;
  record?: IModalityDTO;
};
const ModalityRoomSelectField: FC<ModalityRoomSelectFieldProps> = (props) => {
  const { control, record } = props;
  const translate = useTranslate();
  const disableValue = record?.room?.name;
  const [trigger] = useLazyGetListModalityRoomQuery();

  const getListModalityRoom = async () => {
    return (await trigger({ filter: {} })).data?.list ?? [];
  };
  return (
    <MyLazyFormSelectField
      name="roomID"
      control={control}
      MySelectProps={{
        label: translate.resources.modality.room.short(),
      }}
      disableValue={disableValue ?? ''}
      onGetListRecord={getListModalityRoom}
      renderSelectField={({ listData: modalityRoomList, formSelectFieldProps }) => (
        <MyFormSelectField {...formSelectFieldProps}>
          {modalityRoomList.map((item) => (
            <MenuItem key={item.id} value={item?.id || ''}>
              {item.name}
            </MenuItem>
          ))}
        </MyFormSelectField>
      )}
    />
  );
};

export default ModalityRoomSelectField;
