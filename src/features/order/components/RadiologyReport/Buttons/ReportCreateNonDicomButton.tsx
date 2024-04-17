import { useGetOneOrderQuery } from '@/api/order';
import { HOTKEYS } from '@/config';
import { filterModalCreateNonDicom } from '@/dataHelper/filterModalCreateNonDicom';
import { useDisclosure, useKeybinds } from '@/hooks';

import { useCurrentOrderID } from '../../../providers';
import { ReportCreateNonDicomModal } from '../Panel/Modal/ReportCreateNonDicomModal';

import CreateNonDicomButton from './CreateNonDicomButton';

/**
 * Nút Chụp ảnh Non DICOM
 */
const ReportCreateNonDicomButton = () => {
  const disclosure = useDisclosure();
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  /**
   * Check modalitype can use create nondicom
   * @returns boolean
   */
  const isLock = !!order?.lockedBy;

  useKeybinds(HOTKEYS.TAKE_IMAGE_DICOM.key, () => disclosure.open());

  const isVisible = filterModalCreateNonDicom(order?.modalityType ?? '');

  return order ? (
    <>
      <CreateNonDicomButton
        disabled={!isLock || !isVisible}
        onClick={() => disclosure.open()}
      />
      {isVisible && <ReportCreateNonDicomModal disclosure={disclosure} />}
    </>
  ) : (
    <></>
  );
};

export default ReportCreateNonDicomButton;
