import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { z } from 'zod';

import {
  useGetListModalityTypeQuery,
  useUpdateModalityTypeMutation,
} from '@/api/modalityType';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useTranslate } from '@/hooks';
import { getBooleanValueOfAttribute } from '@/lib/dataHelper/modalityTypeAttributesHelper';
import { useRegisterAdminFunctions } from '@/providers/Admin/AdminProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IModalityTypeUpdateDTO, IModalityTypeDTO } from '@/types/dto';
import { MODALITY_TYPE_ATTRIBUTE_DEFAULT } from '@/types/dto/modalityTypeAttribute';
import { checkUpdateField } from '@/utils/checkUpdateFields';
import { isJsonObject } from '@/utils/validateJSON';

import {
  IModalityTypeFormFields,
  ModalityTypeFormFields,
} from './ModalityTypeFormFields';

type ModalityTypeEditFormProps = {
  onSuccessCallback: () => void;
  record: IModalityTypeDTO;
};

export const ModalityTypeEditForm: FC<ModalityTypeEditFormProps> = (props) => {
  const { onSuccessCallback, record } = props;
  const [updateModalityType] = useUpdateModalityTypeMutation();

  const { data } = useGetListModalityTypeQuery({
    filter: {},
  });
  const listModalityTypeFiltedred = data?.list.filter((item) => item.id !== record.id);

  const translate = useTranslate();
  const register = useRegisterAdminFunctions();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityType.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.editResource({
      resource: translate.resources.modalityType.title().toLowerCase(),
    }),
  );

  const formOptions: UseFormProps<IModalityTypeFormFields> = {
    mode: 'onChange',
    criteriaMode: 'all',
    // form validation and pre-processing
    resolver: zodResolver(
      z
        .object({
          name: z
            .string()
            .trim()
            .min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.modalityType.name(),
              }),
            )
            .refine(
              // check if there is any modalityType name exist in the list
              (value) => {
                if (
                  listModalityTypeFiltedred &&
                  listModalityTypeFiltedred.some((item) => item.name === value)
                ) {
                  return false;
                }
                return true;
              },
              {
                message: translate.messages.validation.genericDuplicated({
                  name: translate.resources.modalityType.name(),
                }),
              },
            ),
          otherNames: z.string().optional(),
          preferredModalityID: z.number().optional(),
          preferredProcedureID: z.number().optional(),
          config: z
            .string()
            .refine(
              (value) => {
                if (value.length) return isJsonObject(value);
                return true;
              },
              translate.messages.validation.genericRequiredType({
                resource: translate.resources.certificate.config(),
                type: 'jsonObject',
              }),
            )
            .optional(),
          scheduleOrders: z.boolean().optional(),
          haveOperators: z.boolean().optional(),
          requireConsumable: z.boolean().optional(),
          requireDicom: z.boolean().optional(),
          haveTranscribers: z.boolean().optional(),
          otherNamesObjectList: z.array(z.object({ id: z.string() })).optional(),
        })
        .transform((val) => {
          const otherNames =
            val.otherNamesObjectList && val.otherNamesObjectList.map((item) => item.id);
          return {
            ...val,
            otherNames,
            otherNamesObjectList: undefined,
          };
        }),
    ),

    defaultValues: {
      name: record.name ?? '',
      otherNamesObjectList: record?.otherNames?.map((item) => {
        return { id: item };
      }),
      config: record.config ?? '',
      haveOperators: getBooleanValueOfAttribute(
        record.attributes,
        MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TECHNICIAN,
      ),
      requireDicom: record.requireDicom ?? null,
      haveTranscribers: getBooleanValueOfAttribute(
        record.attributes,
        MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TRANSCRIBER,
      ),
      requireConsumable: getBooleanValueOfAttribute(
        record.attributes,
        MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRE_CONSUMABLE,
      ),
      scheduleOrders: undefined,
      preferredModalityID: record.preferredModality?.id ?? undefined,
      preferredProcedureID:
        record?.attributes &&
        record.attributes[MODALITY_TYPE_ATTRIBUTE_DEFAULT.PREFERRED_PROCEDURE]
          ? parseInt(
              record.attributes[MODALITY_TYPE_ATTRIBUTE_DEFAULT.PREFERRED_PROCEDURE],
            )
          : undefined,
    },
  };

  const handleSubmit = async (formData: IModalityTypeFormFields) => {
    const attributes: IModalityTypeUpdateDTO['attributes'] = {
      requires_transcriber: formData.haveTranscribers?.toString(),
      requires_technician: formData.haveOperators?.toString(),
      preferred_procedure: formData.preferredProcedureID?.toString(),
      require_consumable: formData.requireConsumable?.toString(),
    };
    const submitData: IModalityTypeUpdateDTO = {
      id: record.id,
      name: formData.name,
      config: formData.config,
      preferredModalityID: formData.preferredModalityID,
      otherNames: formData.otherNames,
      requireDicom: formData.requireDicom,
      attributes,
    };

    try {
      const res = await updateModalityType(submitData);
      if ('error' in res) {
        notifyError();
      } else {
        notifySuccess();
        onSuccessCallback();
      }
    } catch (e) {
      notifyError();
    }
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register('submitEditForm', () => formInstance.submit && formInstance.submit())
      }
      onSubmit={handleSubmit}
      submitOnEnter
      formOptions={formOptions}
      renderInputs={(controls) => {
        return <ModalityTypeFormFields record={record} {...controls} />;
      }}
    />
  );
};
