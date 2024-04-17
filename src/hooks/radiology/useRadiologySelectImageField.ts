import { selectRadiologyReportImages } from '@/stores/OrderRadiology';
import { getOrderLayout } from '@/stores/OrderRadiology/orderLayoutSlice';
import { BaseEntity } from '@/types';

import { useAppSelector } from '..';

/**
 * Hook dùng cho component RadiologyReportImageSelectField
 */
export const useRadiologySelectImageField = ({
  orderID,
  requestID,
}: {
  orderID: BaseEntity['id'];
  requestID: BaseEntity['id'];
}) => {
  const currentTemplate = useAppSelector(getOrderLayout());

  const currentImageReportImage = useAppSelector(
    selectRadiologyReportImages({ orderID, requestID }),
  );

  return {
    currentTemplate,
    numberImages: currentImageReportImage
      ? Object.values(currentImageReportImage).length
      : 0,
  };
};
