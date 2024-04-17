import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { Path, UseFormWatch } from 'react-hook-form';

import { MyCheckbox } from '@/components';
import { MyFormMultiCheckbox } from '@/components/Elements/Inputs/MyFormMultiCheckbox';
import {
  MultiCheckboxController,
  MultiCheckboxData,
} from '@/components/Elements/Inputs/MyMultiCheckboxController';
import { IFormControlInputProps } from '@/components/Form';
import { useTranslate } from '@/hooks';

import { ITicketProcedure } from '../../types/procedure';

import { TITLE_FONT_WEIGHT } from './ServiceInfomationWrapper';
import { InfomationTypes } from './TicketInfomationForm';
type ProceduresNotCheckedInCheckboxProps = {
  name: Path<InfomationTypes>;
  control: IFormControlInputProps<InfomationTypes>['control'];
  watch: UseFormWatch<InfomationTypes>;
  proceduresNotCheckedIn: ITicketProcedure[];
};

export const ProceduresNotCheckedInCheckbox: FC<ProceduresNotCheckedInCheckboxProps> = (
  props,
) => {
  const translate = useTranslate();
  const { control, name, watch, proceduresNotCheckedIn } = props;

  const servicesNotSelectedIds = watch('serviceIDs');

  const checkboxData = useMemo<MultiCheckboxData<ITicketProcedure>[]>(() => {
    const m_data: MultiCheckboxData<ITicketProcedure>[] = [];
    proceduresNotCheckedIn.map((value, index) => {
      m_data.push({
        id: value.serviceID,
        data: value,
        isSelected: servicesNotSelectedIds?.includes(value.serviceID) || false,
      });
    });
    return m_data;
  }, [proceduresNotCheckedIn, servicesNotSelectedIds]);

  return (
    <MyFormMultiCheckbox
      name={name}
      control={control}
      renderInput={(fields) => (
        <MultiCheckboxController
          value={checkboxData}
          onSelectCallback={(data) => {
            const listSelectedProcedures = data.map((item) => {
              if (item.isSelected) return item.id;
            });
            fields.onChange(listSelectedProcedures.filter((item) => item));
          }}
          renderOptionSelectAll={({ onSelectAll, isAllCheckboxSelected }) => {
            return (
              <>
                <Typography fontWeight={TITLE_FONT_WEIGHT}>Chưa xếp số</Typography>
                <Box display="flex" alignItems="center">
                  <MyCheckbox
                    value={''}
                    onChange={(e) => {
                      onSelectAll && onSelectAll(e);
                    }}
                    checked={isAllCheckboxSelected}
                  />
                  <Typography>{translate.buttons.all()}</Typography>
                </Box>
              </>
            );
          }}
          renderInput={({ onItemClick, checkboxDataState }) => {
            return (
              <>
                {checkboxDataState.map((procedureData, index) => {
                  return (
                    <>
                      <Box display="flex" alignItems="center">
                        <MyCheckbox
                          key={index}
                          value={procedureData}
                          onChange={(e) => {
                            onItemClick && onItemClick(e, procedureData);
                          }}
                          checked={procedureData.isSelected}
                        />
                        <Typography>
                          {procedureData.data && procedureData.data.procedureName}
                        </Typography>
                      </Box>
                    </>
                  );
                })}
              </>
            );
          }}
        />
      )}
    />
  );
};
