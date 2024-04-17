import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@mui/material';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useLazyGetListUsersQuery } from '@/api/users';
import { MyFormGroupUnstyled } from '@/components/Form';
import { MyFormAutoComplete } from '@/components/Form/MyFormAutoComplete';
import { StyledDivLeftChildren } from '@/components/Layout/StyledDiv';
import { getUserNameWithCode } from '@/dataHelper/radiologyReport/getUserNameWithCode';
import { selectSessionRadiologyConfig } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  IOrderReportKey,
  selectRadiologyReportIsEditable,
  selectRadiologyReportSubmission,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { ICloudUserDTO, USER_TYPE } from '@/types/dto';
import { userToCloudUser } from '@/utils/userToCloudUser';

type OperatorsSelectFormType = {
  operators: ICloudUserDTO[];
};

export const ConnectedOperatorAutoCompleteForm: FC<IOrderReportKey> = (props) => {
  const dispatch = useAppDispatch();
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({
      orderID: props.orderID,
      requestID: props.requestID,
    }),
  );
  const sessionRadiologyData = useAppSelector(selectSessionRadiologyConfig);
  const defaultValue =
    reportSubmission?.operators ?? sessionRadiologyData.operators ?? [];
  const key = useMemo(
    () => getOperatorsKey(sessionRadiologyData.operators, reportSubmission?.operators),
    [reportSubmission?.operators, sessionRadiologyData.operators],
  );

  useEffect(() => {
    if (
      sessionRadiologyData.operators &&
      (!reportSubmission?.operators || reportSubmission?.operators.length === 0)
    ) {
      dispatch(
        setRadiologyReportSubmissionData({
          orderID: props.orderID,
          requestID: props.requestID,
          operators: sessionRadiologyData.operators,
        }),
      );
    }
  }, [dispatch, props.orderID, props.requestID]);

  return <OperatorAutoCompleteForm key={key} {...props} defaultValue={defaultValue} />;
};
/**
 * Component chọn các kĩ thuật viên
 */
const OperatorAutoCompleteForm: FC<
  IOrderReportKey & {
    defaultValue?: ICloudUserDTO[];
  }
> = ({ orderID, requestID, defaultValue }) => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(orderID));
  const [trigger, { data, isFetching }] = useLazyGetListUsersQuery();
  const users = data?.list ?? [];
  const cloudUsers = users.map(userToCloudUser);

  const formOptions: UseFormProps<OperatorsSelectFormType> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        operators: z
          .array(z.object({ id: z.number(), username: z.string(), fullname: z.string() }))
          .optional(),
      }),
    ),
    defaultValues: {
      operators: defaultValue,
    },
  };

  const handleSubmit = useCallback(
    async (formData: OperatorsSelectFormType) => {
      dispatch(
        setRadiologyReportSubmissionData({
          orderID,
          requestID,
          operators: formData.operators,
        }),
      );
    },
    [dispatch, orderID, requestID],
  );

  return (
    <MyFormGroupUnstyled
      autoSubmit
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <>
          <MyFormAutoComplete
            name="operators"
            control={control}
            label={
              translate.resources.user.type({ type: USER_TYPE.TECHNICIAN }) +
              '/' +
              translate.resources.user.type({ type: USER_TYPE.NURSING })
            }
            placeholder={''}
            MyAutoCompleteProps={{
              options: cloudUsers,
              onOpen: () =>
                trigger({
                  filter: {
                    types: [USER_TYPE.TECHNICIAN, USER_TYPE.NURSING],
                    onDuty: true,
                  },
                }),
              isOptionEqualToValue: (option, value) => option.id === value.id,
              disabled: !isEditable,
              getOptionLabel: (option) =>
                `${(option as ICloudUserDTO)?.username} - ${
                  (option as ICloudUserDTO)?.fullname
                }`,
              fullWidth: true,
              sx: { height: '100%' },
              limitTags: 1,

              renderOption: (props, option, { selected }) => {
                return (
                  <li {...props}>
                    <StyledDivLeftChildren>
                      <Checkbox size="small" checked={selected} />
                      {getUserNameWithCode(option)}
                    </StyledDivLeftChildren>
                  </li>
                );
              },
            }}
          />
        </>
      )}
    />
  );
};

const getOperatorsKey = (
  sessionOperators?: ICloudUserDTO[],
  storeOperators?: ICloudUserDTO[],
) => {
  let key = 'default-operators';
  if (storeOperators && storeOperators.length !== 0) {
    key = 'stores-operators';
  } else if (sessionOperators && sessionOperators.length !== 0) {
    key = 'session-operators';
  }
  return key;
};

const getUserFilterTypes = (haveTranscribers: boolean) => {
  const types: `${USER_TYPE}`[] = [USER_TYPE.TECHNICIAN];
  if (haveTranscribers) types.push(USER_TYPE.NURSING);
  return types;
};
