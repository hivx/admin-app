import { FC } from 'react';

import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { ApprovedDateField } from '@/components/Order/ApprovedDateField';
import { ConnectedApproveWithTimeModal } from '@/components/Order/ApproveWithTimeModal';
import { ConnectedRadiologyModalitySelectForm } from '@/components/Order/Panel/ModalitySelectForm';
import { ConnectedOperatorAutoCompleteForm } from '@/components/Order/Panel/OperatorAutoCompleteForm';
import { FindingsEditor } from '@/components/Order/RadiologyReport/Editors/FindingsEditor';
import { ImpressionEditor } from '@/components/Order/RadiologyReport/Editors/ImpressionEditor';
import { useAppSelector } from '@/hooks';
import {
  selectCurrentRadiologyReportID,
  selectCurrentRequestID,
} from '@/stores/OrderRadiology';
import { IOrderDTO } from '@/types/dto';

import { MobileRadiologyBottomFields } from './MobileRadiologyBottomFields';
import { MobileRadiologyButton } from './MobileRadiologyButton';
import { MobileRadiologyContentShell } from './MobileRadiologyContentShell';
import { MobileRequestEditableField } from './MobileRequestEditableField';

type MobileRadiologyContentProps = {
  order: IOrderDTO;
};

export const MobileRadiologyContent: FC<MobileRadiologyContentProps> = ({ order }) => {
  const requestID = useAppSelector(selectCurrentRequestID(order.id));
  const { data: request } = useGetOneOrderRequestQuery({ orderID: order.id, requestID });
  const reportID = useAppSelector(
    selectCurrentRadiologyReportID({ orderID: order.id, requestID }),
  );

  return (
    <>
      <MobileRadiologyContentShell
        ActionButton={<MobileRadiologyButton order={order} />}
        ProceduresSelectFields={
          <MobileRequestEditableField order={order} request={request} />
        }
        FindingsEditor={<FindingsEditor />}
        ImpressionEditor={<ImpressionEditor />}
        ModalitySelectField={<ConnectedRadiologyModalitySelectForm />}
        BottomFields={
          <MobileRadiologyBottomFields
            order={order}
            request={request}
            reportID={reportID}
          />
        }
        TechnicianField={
          <ConnectedOperatorAutoCompleteForm orderID={order.id} requestID={requestID} />
        }
        ApprovedDateField={<ApprovedDateField />}
      />
      <ConnectedApproveWithTimeModal />
    </>
  );
};
