import { Image } from '@/components/Order/PrintDicomModal/LayoutShowImage/Image';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ImageDataState } from '@/hooks/useSelectDicomImage';
import {
  selectRadiologyReportImages,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';

export type ImageListProps = {
  orderID: BaseEntity['id'];
  requestID: BaseEntity['id'];
};

/**
 * Danh sách image dùng ở modal in KQ, modal in ảnh
 */
const RadiologySelectImagesList = (props: ImageListProps) => {
  const { orderID, requestID } = props;

  const currentImageReportImage = useAppSelector(
    selectRadiologyReportImages({ orderID, requestID }),
  );
  const dispatch = useAppDispatch();
  const onDelete = (imageID: string) => {
    if (currentImageReportImage) {
      const newImages: Record<string, string> = {};
      Object.keys(currentImageReportImage).map((key) => {
        if (key !== imageID) {
          newImages[key] = currentImageReportImage[key];
        }
      });

      dispatch(
        setRadiologyReportSubmissionData({
          orderID,
          requestID,
          images: newImages,
        }),
      );
    }
  };

  return (
    <>
      {currentImageReportImage &&
        Object.entries(currentImageReportImage).map(([imageID, imageData]) => {
          return (
            <Image
              imageData={imageData}
              key={imageID}
              imageID={imageID}
              isSelected={true}
              onDelete={onDelete}
            />
          );
        })}
    </>
  );
};

export default RadiologySelectImagesList;
