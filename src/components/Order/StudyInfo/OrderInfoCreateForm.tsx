import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useCreateOneOrderMutation } from '@/api/order';
import { MyDivider } from '@/components/Elements';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate, useAppSelector, useAppDispatch } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterCreateOrderFunctions } from '@/providers/Order/CreateOrderFunctionsProvider';
import {
  resetOrderRequestData,
  selectOrderRequestData,
} from '@/stores/examinnation/createOrderSlice';
import { BaseEntity } from '@/types';
import { IOrderCreateDTO, IOrderUpdateDTO, ORDER_CREATION_TYPE } from '@/types/dto';
import { formatDateTime, getCurrentDateTime } from '@/utils/dateUtils';

import { ConnectedAddRequestForm } from './ModalRequestInfo/AddRequestForm';
import { OrderInfoFormFields } from './OrderInfo/OrderInfoFormFields';
import { StyledOrderInfoFormFieldsWrapper } from './StyledStudyInfo';

type OrderInfoCreateFormProps = {
  onSuccessCallback?: () => void;
};

export const OrderInfoCreateForm: FC<OrderInfoCreateFormProps> = (props) => {
  const { onSuccessCallback } = props;
  const translate = useTranslate();
  const [createOrderInfo] = useCreateOneOrderMutation();
  const register = useRegisterCreateOrderFunctions();
  const requests = useAppSelector(selectOrderRequestData);
  const dispatch = useAppDispatch();
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.createResource({
      resource: translate.resources.order.title.assign().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.resources.order.title.assign().toLowerCase(),
    }),
  );

  const handleSubmit = async (formData: IOrderUpdateDTO) => {
    const submitData: IOrderCreateDTO = {
      ...formData,
      creationType: ORDER_CREATION_TYPE.RIS,
      orderNumber: formData.accessionNumber,
    };
    if (requests.length > 0) {
      try {
        const res = await createOrderInfo(submitData);
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
          dispatch(resetOrderRequestData());
          onSuccessCallback && onSuccessCallback();
        }
      } catch (e) {
        notifyError();
      }
    } else {
      notifyError();
    }
  };

  const formOptions: UseFormProps<IOrderUpdateDTO> = {
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(
      z
        .object({
          accessionNumber: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.order.accessionNumber.long(),
              }),
            ),
          requestedDepartmentID: z.number().optional(),
          diagnosis: z.string().optional(),
          requestedTime: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.order.requestedTime.long(),
              }),
            ),
          referringPhysicianID: z.number().optional(),
          insuranceApplied: z.boolean().optional(),
          insuranceNumber: z.string().optional(),
          modalityType: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.order.modalityType.long(),
              }),
            ),
          urgent: z.boolean().optional(),
          requests: z
            .array(z.object({ id: z.number() }))
            .refine(
              () => {
                if (requests.length > 0) {
                  return true;
                }
                return false;
              },
              {
                message: translate.messages.validation.genericRequired({
                  resource: translate.resources.order.requests(),
                }),
              },
            )
            .optional(),

          priorityID: z.number().optional(),
          insuranceIssuedDate: z.string().optional(),
          insuranceExpiredDate: z.string().optional(),
          patientID: z.number().optional(),
          orderNumber: z.string().optional(),
          creationType: z.string().optional(),
          encounterNumber: z.string().optional(),
          inpatient: z.boolean().optional(),
        })
        .transform((val) => {
          return {
            ...val,
            priorityID: val.priorityID ?? undefined,
            referringPhysicianID: val.referringPhysicianID ?? undefined,
            requestedDepartmentID: val.requestedDepartmentID ?? undefined,
            requests: requests ?? [],
          };
        }),
    ),
    defaultValues: {
      accessionNumber: '',
      requestedDepartmentID: undefined,
      insuranceExpiredDate: '',
      insuranceIssuedDate: '',
      diagnosis: '',
      modalityType: '',
      requestedTime: formatDateTime(getCurrentDateTime()),
      referringPhysicianID: undefined,
      insuranceApplied: false,
      insuranceNumber: '',
      urgent: false,
      priorityID: undefined,
      requests: [],
      patientID: undefined,
      orderNumber: '',
      creationType: ORDER_CREATION_TYPE.RIS,
      encounterNumber: '',
      inpatient: false,
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('createOrderInfo', (patientID: BaseEntity['id']) => {
          formInstance.setValue('patientID', patientID);
          formInstance.submit && formInstance.submit();
        })
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <StyledOrderInfoFormFieldsWrapper>
          <OrderInfoFormFields {...controls} onSuccessCallback={onSuccessCallback} />
          <MyDivider orientation="vertical" />
          <ConnectedAddRequestForm control={controls.control} />
        </StyledOrderInfoFormFieldsWrapper>
      )}
    />
  );
};
