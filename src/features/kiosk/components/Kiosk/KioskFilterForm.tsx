import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, styled, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { UseFormProps } from 'react-hook-form';
import { LocalizedString } from 'typesafe-i18n';
import { z } from 'zod';

import { MyFormTextField } from '@/components';
import { MyFormGroupUnstyled } from '@/components/Form';
import { translate, useTranslate } from '@/hooks';
import { formatDate, getCurrentDate } from '@/utils/dateUtils';
import { mapNullOrEmptyStringToUndefined } from '@/utils/format';

import { usePrintMultiTicket } from '../../hooks/usePrintMultiTicket';
import { useRegisterKioskFunctions } from '../../providers/KioskProvider';
import { IKioskModalityTypeDTO } from '../../types/kioskModalityType';

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

type KioskFilterFormProps = {
  modalityTypeList?: IKioskModalityTypeDTO[] | undefined;
  siteID: number;
};
export type KioskFilterFormForm = {
  modalityTypes?: IKioskModalityTypeDTO[] | undefined;
  pid?: string;
  checkInStr?: string;
  fromDate?: string;
  toDate?: string;
  checkIn?: boolean | null;
  autoSelectModality?: boolean;
};

const NOTIFY_TIME = 5000;

export const KioskFilterForm = (props: KioskFilterFormProps) => {
  const translate = useTranslate();
  const theme = useTheme();
  const register = useRegisterKioskFunctions();
  const { siteID } = props;
  const { printTicket } = usePrintMultiTicket();
  // if (isOpen) {
  //   setTimeout(close, NOTIFY_TIME);
  // }
  const formOptions: UseFormProps<KioskFilterFormForm> = {
    mode: 'onChange',
    resolver: zodResolver(
      z
        .object({
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
      autoSelectModality: true,
    },
  };

  const handleSubmit = async (formData: KioskFilterFormForm) => {
    // setFilter && setFilter(formData);
    const { pid, checkIn, fromDate, toDate } = formData;
    // user khong muon truong 'PID' bao loi khong co nhap pid,nen khong check pid bang zod trong formOptions
    if (pid) {
      await printTicket({ pid, checkIn, fromDate, toDate }, siteID);
    }
  };

  useEffect(() => {
    /**
     * Always focus pid input
     */
    const input = document.getElementById('pid');
    const handleFocus = () => {
      input && input.focus();
    };
    if (input) {
      input.addEventListener('focusout', handleFocus);
      input.addEventListener('keydown', (e) => {
        const keyCode = e.keyCode || e.which;
        if (keyCode == 9) {
          input.focus();
        }
      });
      window.addEventListener('focusin', handleFocus);
      return () => {
        window.removeEventListener('focusin', handleFocus);
        input.removeEventListener('focusout', handleFocus);
        input.removeEventListener('keydown', handleFocus);
      };
    }
  }, []);

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
      renderInputs={({ control }) => {
        return (
          <>
            <MyFormTextField
              name="pid"
              control={control}
              MyTextFieldProps={{
                id: 'pid',
                autoFocus: true,
                placeholder: translate.pages.reception.typePatientId(),
                fullWidth: true,
                autoComplete: 'off',
                size: 'medium',
                inputRef: (input) =>
                  input && register('autoFocusPID', () => input.focus()),
              }}
            />
            <StyledErrorMessage>
              Bệnh nhân không lấy được số thứ tự, vui lòng qua quầy tiếp đón để được hỗ
              trợ.
            </StyledErrorMessage>
            {/* {isOpen ? (
              <StyledErrorMessage>
                Bệnh nhân không lấy được số thứ tự, vui lòng qua quầy tiếp đón để được hỗ trợ
              </StyledErrorMessage>
            ) : (
              <div></div>
            )} */}
          </>
        );
      }}
    ></StyledForm>
  );
};

const StyledForm = styled(MyFormGroupUnstyled)`
  width: 100%;
  /* padding-left: 50px; */
`;

const StyledErrorMessage = styled(Typography)`
  text-align: center;
  font-size: 1.5vw;
  color: #f3c103;
  /* color: #f35f03; */
  padding: ${(props) => props.theme.spacing(1)} 0;
`;
