import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTranslate } from '@/hooks';
import { IModalityDTO, IModalityTypeDTO } from '@/types/dto';

import { useGetListModalityQuery } from '../../../api/modality';

type UseModalityFormOptions = {
  record?: IModalityDTO;
};

type ModalityAttributesArray = { attributesArray: { name: string; value: string }[] };

/**
 * Từ list modalityTypes và modalityTypeID (của máy) => modalityType name
 */
export const getModalityTypeStringById = (
  modalityTypes?: IModalityTypeDTO[],
  modalityTypeID?: number,
) => {
  if (modalityTypeID && modalityTypes)
    return modalityTypes.find((modalityType) => modalityTypeID === modalityType.id)?.name;
};

export const useModalityForm = (props: UseModalityFormOptions) => {
  const translate = useTranslate();

  const { data: modalityListData } = useGetListModalityQuery({
    filter: {},
  });

  // const convertAttributesArrayToObject = (
  //   input?: ModalityAttributesArray['attributesArray'],
  // ): IModalityDTOBase['attributes'] => {
  //   if (!input) return {};
  //   return Object.fromEntries(
  //     input
  //       .map((item) => (item.name ? [item.name, item.value] : undefined))
  //       .filter((item) => !!item) as [string, string][], // removed undefined entries so this is safe
  //   );
  // };

  // const convertAttributesObjectToArray = (
  //   input?: IModalityDTO['attributes'],
  // ): ModalityAttributesArray['attributesArray'] | undefined => {
  //   if (!input || !Object.keys(input ?? {}).length) return undefined;
  //   return Object.entries(input).map(([key, value]) => ({ name: key, value }));
  // };

  const { control, getValues, trigger, formState } = useForm<ModalityAttributesArray>({
    mode: 'onChange',
    resolver: zodResolver(
      z.object({
        attributesArray: z.array(
          z.object({
            name: z.string().min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.modality.attributes(),
              }),
            ),
            value: z.string().min(
              1,
              translate.messages.validation.genericRequired({
                resource: translate.resources.modality.attributesValue(),
              }),
            ),
          }),
        ),
      }),
    ),
    defaultValues: {
      // attributesArray: convertAttributesObjectToArray(record?.attributes) || [
      //   { name: '', value: '' },
      // ],
    },
  });
  const { fields, ...methods } = useFieldArray({
    control,
    name: 'attributesArray',
  });

  const modalityList = modalityListData?.list;
  // const otherModalityTypes = modalityTypes.filter((item) =>
  //   (record?.otherModalityTypes || []).includes(item?.name || ''),
  // );
  return {
    // otherModalityTypes,
    modalityList,
    attributeFieldArray: {
      formState,
      fields,
      methods,
      control,
      getValues,
      // convertAttributesArrayToObject,
      trigger,
    },
  };
};
