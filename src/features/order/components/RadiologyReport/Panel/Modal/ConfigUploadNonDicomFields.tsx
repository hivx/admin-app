import { Box, MenuItem, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Control } from 'react-hook-form';

import { MyCheckbox, MyFormCheckboxField, MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { useAppDispatch, useTranslate } from '@/hooks';
import { setScreenID, toggleCustomScreen } from '@/stores/OrderRadiology';

import { ConfigFormData } from './ConfigUploadNonDicomModal';

type ConfigUploadNonDicomFieldsProps = {
  control: Control<ConfigFormData>;
  isCustomScreen?: boolean;
};

/**
 * Define screen size popular
 */
export const SCREEN_LIST = [
  { id: 1, name: '160x120', width: 160, height: 120 },
  { id: 2, name: '176x144', width: 176, height: 144 },
  { id: 3, name: '320x180', width: 320, height: 180 },
  { id: 4, name: '320x240', width: 320, height: 240 },
  { id: 5, name: '352x288', width: 352, height: 288 },
  { id: 6, name: '512x384', width: 512, height: 384 },
  { id: 7, name: '640x360', width: 640, height: 360 },
  { id: 8, name: '800x600', width: 800, height: 600 },
  { id: 9, name: '1024x768', width: 1024, height: 768 },
  { id: 10, name: '1280x720', width: 1280, height: 720 },
  { id: 11, name: '1280x960', width: 1280, height: 960 },
  { id: 12, name: '1600x1200', width: 1600, height: 1200 },
  { id: 13, name: '1920x1080', width: 1920, height: 1080 },
  { id: 14, name: '1920x1440', width: 1920, height: 1440 },
] as const;

export const ConfigUploadNonDicomFields: FC<ConfigUploadNonDicomFieldsProps> = (
  props,
) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  return (
    <Stack spacing={2} p={4}>
      {props.isCustomScreen ? (
        <>
          <MyFormTextField
            control={props.control}
            name="width"
            MyTextFieldProps={{
              label: translate.pages.orderReport.media.config.width(),
              placeholder: translate.pages.orderReport.media.config.width(),
              fullWidth: true,
              size: 'small',
              disabled: !props.isCustomScreen,
            }}
          />
          <MyFormTextField
            control={props.control}
            name="height"
            MyTextFieldProps={{
              label: translate.pages.orderReport.media.config.height(),
              placeholder: translate.pages.orderReport.media.config.height(),
              fullWidth: true,
              disabled: !props.isCustomScreen,
              size: 'small',
            }}
          />
        </>
      ) : (
        <MyFormSelectField
          name="screenID"
          control={props.control}
          MySelectProps={{
            label: translate.pages.orderReport.media.config.screen(),
          }}
        >
          <MenuItem key="null" value={''}>
            &nbsp;
          </MenuItem>
          {SCREEN_LIST &&
            SCREEN_LIST.map((screen) => (
              <MenuItem
                key={screen.id}
                value={screen.id}
                onClick={() => dispatch(setScreenID({ screenID: screen.id }))}
              >
                {screen.name}
              </MenuItem>
            ))}
        </MyFormSelectField>
      )}

      <MyFormCheckboxField
        control={props.control}
        render={({ value, onChange }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MyCheckbox
              checked={!!value}
              onChange={onChange}
              onClick={() => dispatch(toggleCustomScreen({ customScreen: !value }))}
            />
            <Typography>
              {translate.pages.orderReport.media.config.customize()}
            </Typography>
          </Box>
        )}
        name="isCustomScreen"
      />
    </Stack>
  );
};
