import { IModalityTypeDTO } from '@/types/dto';

/**
 * Lấy giá trị boolean theo attribute type
 */
export const getBooleanValueOfAttribute = (
  attributes?: IModalityTypeDTO['attributes'],
  attributeType?: string,
) => {
  if (attributes && attributeType) {
    return attributes[attributeType] === 'true';
  }
  return false;
};
