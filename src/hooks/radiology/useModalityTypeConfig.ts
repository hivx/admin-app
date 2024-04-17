import { useGetListModalityTypeQuery } from '@/api/modalityType';
import { getBooleanValueOfAttribute } from '@/lib/dataHelper/modalityTypeAttributesHelper';
import { IModalityTypeDTO } from '@/types/dto';
import { MODALITY_TYPE_ATTRIBUTE_DEFAULT } from '@/types/dto/modalityTypeAttribute';

/**
 * get haveOperators,haveTranscribers config of modalityType
 */
export const useModalityTypeConfig = ({
  orderModalityType,
}: {
  orderModalityType?: IModalityTypeDTO['name'];
}) => {
  const { data } = useGetListModalityTypeQuery(
    {
      filter: { name: orderModalityType ?? undefined },
    },
    { skip: !orderModalityType },
  );
  const modalityTypeSelected = data?.list[0];

  return {
    haveOperators: getBooleanValueOfAttribute(
      modalityTypeSelected?.attributes,
      MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TECHNICIAN,
    ),
    haveTranscribers: getBooleanValueOfAttribute(
      modalityTypeSelected?.attributes,
      MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TRANSCRIBER,
    ),
    requireConsumable: getBooleanValueOfAttribute(
      modalityTypeSelected?.attributes,
      MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRE_CONSUMABLE,
    ),
  };
};
