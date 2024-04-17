import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import { useUpdateOrderMutation } from '@/api/order';
import { MyDivider } from '@/components/Elements';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { useRegisterEditOrderFunctions } from '@/providers/Order/EditOrderFunctionsProvider';
import { IOrderDTO, IOrderUpdateDTO } from '@/types/dto';

import { ConnectedEditRequestForm } from './ModalRequestInfo/ConnectedEditRequestForm';
import { OrderInfoFormFields } from './OrderInfo/OrderInfoFormFields';
import { StyledOrderInfoFormFieldsWrapper } from './StyledStudyInfo';

type OrderInfoEditFormProps = {
  order: IOrderDTO;
  onSuccessCallback: () => void;
  disabled: boolean;
};

export const OrderInfoEditForm: FC<OrderInfoEditFormProps> = (props) => {
  const { order, onSuccessCallback, disabled } = props;
  const translate = useTranslate();
  const [updateOrderInfo] = useUpdateOrderMutation();
  const register = useRegisterEditOrderFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.order.title.assign().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.order.title.assign().toLowerCase(),
    }),
  );
  const handleSubmit = async (formData: IOrderUpdateDTO) => {
    const submitData = {
      ...formData,
      id: order.id,
    };
    try {
      const res = await updateOrderInfo(submitData);
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
      }
      onSuccessCallback();
    } catch (e) {
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
          requestedTime: z.string().optional(),
          referringPhysicianID: z.number().optional(),
          insuranceApplied: z.boolean().optional(),
          insuranceNumber: z.string().optional(),
          urgent: z.boolean().optional(),
          requests: z.array(z.object({ id: z.number() })).optional(),
          priorityID: z.number().optional(),
          insuranceIssuedDate: z.string().optional(),
          insuranceExpiredDate: z.string().optional(),
          modalityType: z.string({
            required_error: translate.messages.validation.genericRequired({
              resource: translate.resources.order.modalityType.long(),
            }),
          }),
          encounterNumber: z.string().optional(),
          inpatient: z.boolean().optional(),
        })
        .transform((val) => {
          return {
            ...val,
            priorityID: val.priorityID ?? null,
            referringPhysicianID: val.referringPhysicianID ?? null,
            requestedDepartmentID: val.requestedDepartmentID ?? null,
            requests: undefined, // do not submit requests because we will call update request seperately
          };
        }),
    ),
    defaultValues: {
      accessionNumber: order.accessionNumber ?? '',
      requestedDepartmentID: order.requestedDepartment?.id ?? -1,
      insuranceExpiredDate: order.insuranceExpiredDate ?? '',
      insuranceIssuedDate: order.insuranceIssuedDate ?? '',
      diagnosis: order.diagnosis ?? '',
      requestedTime: order.requestedTime ?? '',
      referringPhysicianID: order.referringPhysician?.id ?? -1,
      insuranceApplied: order.insuranceApplied ?? false,
      insuranceNumber: order.insuranceNumber ?? '',
      urgent: order.urgent ?? false,
      priorityID: order.priority?.id ?? -1,
      modalityType: order.modalityType ?? '',
      requests: [],
      encounterNumber: order.encounterNumber ?? '',
      inpatient: order.inpatient ?? false,
    },
  };
  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('editOrderInfo', () => {
          formInstance.submit && formInstance.submit();
        })
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => (
        <StyledOrderInfoFormFieldsWrapper>
          <OrderInfoFormFields
            {...controls}
            disabled={disabled}
            onSuccessCallback={onSuccessCallback}
            order={order}
          />
          <MyDivider orientation="vertical" />
          <ConnectedEditRequestForm
            accessionNumber={order.accessionNumber}
            order={order}
            procedure={null}
          />
        </StyledOrderInfoFormFieldsWrapper>
      )}
    />
  );
};
