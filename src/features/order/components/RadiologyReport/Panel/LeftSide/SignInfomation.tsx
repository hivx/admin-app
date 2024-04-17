import SignIcon from '@/assets/icon/SignIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useTranslate } from '@/hooks';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { BaseEntity } from '@/types';
import { IOrderDTO } from '@/types/dto';

type SignInfomationProps = {
  order?: IOrderDTO;
  requestID: BaseEntity['id'];
};
const SignInfomation = (props: SignInfomationProps) => {
  const { order, requestID } = props;

  const currentRequest = order?.requests?.find((request) => request.id === requestID);

  const translate = useTranslate();
  const { isConnectHsm } = useHospitalProvider();
  const isSigned = currentRequest?.finalSigner
    ? !!currentRequest.finalSignedReportID
    : false;

  return currentRequest && isConnectHsm && !isSigned ? (
    <IconButtonWithToolTip
      title={translate.resources.order.signStatusMessage.unSigned()}
      onClick={() => {}}
      disabled
    >
      <SignIcon />
    </IconButtonWithToolTip>
  ) : (
    <></>
  );
};

export default SignInfomation;
