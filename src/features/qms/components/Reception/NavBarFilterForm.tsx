import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, MenuItem, Stack, styled, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { Controller, UseFormProps } from 'react-hook-form';
import { LocalizedString } from 'typesafe-i18n';
import { z } from 'zod';

import { MyCheckbox, MyFormTextField } from '@/components';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyFormGroupUnstyled } from '@/components/Form';
import { MyFormDateRangePicker } from '@/components/Form/MyFormDateRangePicker';
import { translate, useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  getisAutoSelectModalityed,
  setAutoSelectModality,
} from '@/stores/qms/autoSelectSlice';
import { formatDate, getCurrentDate } from '@/utils/dateUtils';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { useLazyGetListMwlQuery } from '../../api/mwl';
import { usePrintMultiTicket } from '../../hooks/usePrintMultiTicket';
import {
  ReceptionContext,
  useRegisterReceptionFunctions,
} from '../../providers/ReceptionProvider';
import { IQmsModalityTypeDTO } from '../../types/qmsModalityType';

import { ModalityTypeFilterGroup } from './ModalityTypeFilterGroup';

const CHECKIN_ALL_STATUS = 'all';
const CHECKIN_FALSE = 'false';
const CHECKIN_TRUE = 'true';

const CHECKIN_CHOICES: { label?: string | LocalizedString; value: string }[] = [
  {
    label: translate?.buttons.all(),
    value: CHECKIN_ALL_STATUS,
  },
  {
    label: translate?.pages.reception.notCheckedIn(),
    value: CHECKIN_FALSE,
  },
  {
    label: translate?.pages.reception.checkedIn(),
    value: CHECKIN_TRUE,
  },
];

type NavBarFilterProps = {
  modalityTypeList?: IQmsModalityTypeDTO[] | undefined;
  siteID: number;
};
export type NavBarFilterForm = {
  modalityTypes?: IQmsModalityTypeDTO[] | undefined;
  pid?: string;
  checkInStr?: string;
  fromDate?: string;
  toDate?: string;
  checkIn?: boolean | null;
  autoSelectModality?: boolean;
};

export const NavBarFilter = (props: NavBarFilterProps) => {
  const translate = useTranslate();
  const theme = useTheme();
  const { setFilter } = useContext(ReceptionContext);
  const [trigger] = useLazyGetListMwlQuery();
  const register = useRegisterReceptionFunctions();

  const { modalityTypeList, siteID } = props;
  const dispatch = useAppDispatch();

  const { printTicket } = usePrintMultiTicket();

  const isAutoSelectModality = useAppSelector(getisAutoSelectModalityed);
  const formOptions: UseFormProps<NavBarFilterForm> = {
    mode: 'onChange',
    resolver: zodResolver(
      z
        .object({
          // checkIn: z.preprocess((str) => {
          //   let checkIn = null;
          //   if (str === CHECKIN_TRUE) checkIn = true;
          //   else if (str === CHECKIN_FALSE) checkIn = false;
          //   return checkIn;
          // }, z.boolean().optional().nullable()),
          modalityTypes: z.array(z.string()).optional(),
          pid: z.string().trim().optional().transform(mapNullOrEmptyStringToUndefined),
          autoSelectModality: z.boolean().optional(),
          fromDate: z.string().optional(),
          toDate: z.string().optional(),
          checkInStr: z.string().optional(),
        })
        .transform((val) => {
          let checkIn = null;
          if (val.checkInStr === CHECKIN_TRUE) checkIn = true;
          else if (val.checkInStr === CHECKIN_FALSE) checkIn = false;
          return {
            ...val,
            checkIn: checkIn,
            checkInStr: undefined,
            modalityTypes:
              val.modalityTypes && val.modalityTypes[0] === ''
                ? undefined
                : val.modalityTypes,
          };
        }),
    ),
    defaultValues: {
      modalityTypes: [],
      pid: '',
      fromDate: formatDate(getCurrentDate()),
      toDate: formatDate(getCurrentDate()),
      checkInStr: CHECKIN_FALSE,
      autoSelectModality: isAutoSelectModality,
    },
  };

  const handleSubmit = async (formData: NavBarFilterForm) => {
    setFilter && setFilter(formData);
    const { pid, checkIn, fromDate, toDate } = formData;
    // user khong muon truong 'PID' bao loi khong co nhap pid,nen khong check pid bang zod trong formOptions
    if (pid) {
      trigger({
        filter: { pid, checkIn, fromDate, toDate, siteID },
        header: { Headers: 'KIOSK' },
      });
      if (isAutoSelectModality) {
        printTicket({ pid, checkIn, fromDate, toDate }, siteID);
      }
    }
  };
  return (
    <StyledForm
      registerFormFunctions={(formInstance) =>
        register('clearPID', () => formInstance.setValue('pid', undefined))
      }
      formOptions={formOptions}
      onSubmit={handleSubmit}
      submitOnEnter
      autoSubmit
      sx={{ py: theme.spacing(2) }}
      renderInputs={({ control, setValue, watch }) => {
        return (
          <Grid container>
            <Grid
              item
              xs={theme.qms?.layout.qmsSidebarXS}
              alignItems="center"
              justifyItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <StyledTitle>{translate.pages.reception.title()}</StyledTitle>
              </Box>
            </Grid>
            <Grid item xs={12 - (theme.qms?.layout.qmsSidebarXS || 0)}>
              <Stack spacing={1.5}>
                <Grid container spacing={3} sx={{ width: '100%' }}>
                  <Grid item xs={5}>
                    <MyFormTextField
                      name="pid"
                      control={control}
                      MyTextFieldProps={{
                        label: translate.pages.reception.pid(),
                        placeholder: translate.pages.reception.typePatientId(),
                        fullWidth: true,
                        size: 'medium',
                        inputRef: (input) =>
                          input && register('autoFocusPID', () => input.focus()),
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <MyFormSelectField
                      name="checkInStr"
                      control={control}
                      MySelectProps={{
                        label: translate.pages.reception.status(),
                        size: 'medium',
                      }}
                    >
                      {CHECKIN_CHOICES.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </MyFormSelectField>
                  </Grid>
                  <Grid item xs={2}>
                    <MyFormDateRangePicker
                      nameStart="fromDate"
                      nameEnd="toDate"
                      label={translate.pages.reception.time()}
                      formSetValue={setValue}
                      watch={watch}
                      MyTextFieldProps={{ size: 'medium' }}
                    />
                  </Grid>
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs={9}>
                    {modalityTypeList && (
                      <ModalityTypeFilterGroup
                        name="modalityTypes"
                        control={control}
                        modalityTypeList={modalityTypeList}
                      />
                    )}
                  </Grid>

                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Controller
                        name="autoSelectModality"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <MyCheckbox
                            checked={isAutoSelectModality}
                            onChange={() => {
                              onChange(isAutoSelectModality);
                              dispatch(setAutoSelectModality());
                            }}
                          />
                        )}
                      />
                      <Typography>
                        {translate.pages.reception.autoSelectModality()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        );
      }}
    ></StyledForm>
  );
};

const StyledTitle = styled(Typography)`
  ${(props) => props.theme.typography.h3};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  color: ${(props) => props.theme.palette.primary.main};
  @media only screen and (max-width: 1800px) {
    ${(props) => props.theme.typography.h4};
    font-weight: ${(props) => props.theme.typography.fontWeightBold};
  }
`;

const StyledForm = styled(MyFormGroupUnstyled)`
  width: 100%;
  /* padding-left: 50px; */
`;
