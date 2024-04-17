import { Box, Stack, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import { Path, UseFormWatch } from 'react-hook-form';

import { MyCheckbox } from '@/components';
import { MyFormMultiCheckbox } from '@/components/Elements/Inputs/MyFormMultiCheckbox';
import {
  MultiCheckboxController,
  MultiCheckboxData,
} from '@/components/Elements/Inputs/MyMultiCheckboxController';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { InformationPrintFormData } from '@/hooks/printRadiologyReport/usePrintReportButton';
import { Gender } from '@/types/dto';

type StudyInfoGenderCheckboxProps = {
  name: Path<InformationPrintFormData>;
  control: IFormControlInputProps<InformationPrintFormData>['control'];
  disabled?: boolean;
  watch: UseFormWatch<InformationPrintFormData>;
};

/**
 * Danh sách checkbox,hiển thị,lựa chọn giới tính cho bệnh nhân
 * Dùng ở modal Xem trước kết quả
 */
export const GenderCheckbox: FC<StudyInfoGenderCheckboxProps> = (props) => {
  const { control, name, disabled, watch } = props;
  const translate = useTranslate();
  /**
   * gender in form value
   */
  const gender = watch(name);
  const checkboxData = useMemo<MultiCheckboxData<{ gender: `${Gender}` }>[]>(() => {
    const m_data: MultiCheckboxData<{ gender: `${Gender}` }>[] = [];
    Object.entries(Gender).map(([_, value]) => {
      m_data.push({
        id: value,
        data: {
          gender: value,
        },
        isSelected: gender === value,
      });
    });
    return m_data;
  }, [gender]);

  return (
    <MyFormMultiCheckbox
      control={control}
      name={name}
      renderInput={(fields) => (
        <MultiCheckboxController
          isSingleSelect={true}
          value={checkboxData}
          onSelectCallback={(data) => {
            const gendersSelected = data.map((item) => {
              if (item.isSelected) return item.id;
            });
            fields.onChange(gendersSelected.filter((item) => item)[0]);
          }}
          renderInput={({ onItemClick, checkboxDataState }) => {
            return (
              <Stack display="flex" alignItems="center" direction="row">
                {checkboxDataState
                  .filter((item) => item.data?.gender !== 'O')
                  .map((item, index) => {
                    return (
                      <Box key={index} display="flex" alignItems="center">
                        <MyCheckbox
                          key={index}
                          value={item}
                          onChange={(e) => {
                            onItemClick && onItemClick(e, item);
                          }}
                          checked={item.isSelected}
                          disabled={disabled}
                        />
                        <Typography>
                          {item.data?.gender &&
                            translate.messages.gender({ gender: item.data?.gender })}
                        </Typography>
                      </Box>
                    );
                  })}
              </Stack>
            );
          }}
        />
      )}
    />
  );
};
