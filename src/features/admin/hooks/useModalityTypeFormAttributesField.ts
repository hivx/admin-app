import { useGetListModalityTypeAttributeQuery } from '@/api/modalityTypeAttribute';
import { MODALITY_TYPE_ATTRIBUTE_DEFAULT } from '@/types/dto/modalityTypeAttribute';

/**
 * Hiển thị các trường KTV chụp, Điều dưỡng theo attribute type trong viện,
 * Dùng trong form tạo / sửa modalityType
 */
export const useModalityTypeFormAttributesField = () => {
  const { data: attributeTypeData } = useGetListModalityTypeAttributeQuery({
    filter: {},
  });

  let displayTranscriberField = false;
  let displayTechnicianField = false;

  const attributeTypes = attributeTypeData?.list;

  attributeTypes?.forEach((type) => {
    if (type.id === MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TECHNICIAN) {
      displayTechnicianField = true;
    }
    if (type.id === MODALITY_TYPE_ATTRIBUTE_DEFAULT.REQUIRES_TRANSCRIBER) {
      displayTranscriberField = true;
    }
  });
  return { displayTranscriberField, displayTechnicianField };
};
