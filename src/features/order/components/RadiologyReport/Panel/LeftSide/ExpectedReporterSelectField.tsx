import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem } from '@mui/material';
import React, { FC, useCallback, useEffect } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useGetOneUserQuery, useLazyGetListUsersQuery } from '@/api/users';
import { MyFormSelectField } from '@/components/Elements/Inputs/MyFormSelectField';
import { MyLazyFormSelectField } from '@/components/Elements/Inputs/MyLazyFormSelectField';
import { MyFormGroupUnstyled } from '@/components/Form';
import { selectSessionRadiologyConfig } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { selectCurrentUser } from '@/stores/auth';
import {
  selectRadiologyReportIsEditable,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
type ExpectedReporterSelectField = {
  request?: IOrderRequestDTO;
  order?: IOrderDTO;
};

type ExpectedReporterFormType = {
  expectedReporterID: number;
};

/**
 * Trường bác sĩ đọc,
 * Ưu tiên hiển thị theo expectedReporterID trong request, reporterID trong session, người dùng hiện tại
 */
export const ExpectedReporterSelectField: FC<ExpectedReporterSelectField> = ({
  order,
  request,
}) => {
  const translate = useTranslate();
  const [trigger] = useLazyGetListUsersQuery();
  const dispatch = useAppDispatch();
  const sessionRadiologyData = useAppSelector(selectSessionRadiologyConfig);
  const currentUser = useAppSelector(selectCurrentUser);
  const isEditable = useAppSelector(selectRadiologyReportIsEditable(order?.id ?? 0));

  const { data: user } = useGetOneUserQuery(
    { id: sessionRadiologyData.reporterID ?? 0 },
    { skip: !sessionRadiologyData.reporterID },
  );
  const disabledReporterValue =
    request?.expectedReporter?.fullname ??
    user?.fullname ??
    currentUser?.fullname ??
    undefined;
  /**
   * func get list modality by modality type
   */
  const getListReporter = async () => {
    return (
      (
        await trigger(
          {
            filter: { types: ['IMAGING_DOCTOR'] },
          },
          true,
        )
      ).data?.list ?? []
    );
  };

  const formOptions: UseFormProps<ExpectedReporterFormType> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z.object({
        expectedReporterID: z.number(),
      }),
    ),
    defaultValues: {
      expectedReporterID:
        request?.expectedReporter?.id ??
        sessionRadiologyData.reporterID ??
        currentUser?.id ??
        undefined,
    },
  };

  /**
   * update modalityID for request
   */
  const handleSubmit = useCallback(
    (formData: ExpectedReporterFormType) => {
      if (order?.id && request?.id) {
        dispatch(
          setRadiologyReportSubmissionData({
            orderID: order?.id,
            requestID: request?.id,
            reporterID: formData.expectedReporterID,
          }),
        );
      }
    },
    [dispatch, order?.id, request?.id],
  );

  useEffect(() => {
    let reporterID: number = 0;

    if (request?.expectedReporter?.id) {
      reporterID = request?.expectedReporter?.id;
    } else if (sessionRadiologyData.reporterID) {
      reporterID = sessionRadiologyData.reporterID;
    } else if (currentUser?.id) {
      reporterID = currentUser.id;
    }
    if (reporterID) {
      handleSubmit({ expectedReporterID: reporterID });
    }
  }, [
    currentUser?.id,
    handleSubmit,
    request?.expectedReporter?.id,
    sessionRadiologyData.reporterID,
  ]);

  return (
    <MyFormGroupUnstyled
      autoSubmit
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <>
          <MyLazyFormSelectField
            name="expectedReporterID"
            control={control}
            required
            MySelectProps={{
              label: translate.resources.order.reporter.short(),
              disabled: !isEditable,
              fullWidth: true,
            }}
            disableValue={disabledReporterValue}
            onGetListRecord={getListReporter}
            renderSelectField={({ listData: userList, formSelectFieldProps }) => (
              <MyFormSelectField {...formSelectFieldProps}>
                {userList.map((item) => (
                  <MenuItem key={item.id} value={item?.id || 0}>
                    {item.fullname}
                  </MenuItem>
                ))}
              </MyFormSelectField>
            )}
          />
        </>
      )}
    />
  );
};
