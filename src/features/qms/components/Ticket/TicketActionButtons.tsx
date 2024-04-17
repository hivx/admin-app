import CastIcon from '@mui/icons-material/Cast';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useAppSelector } from '@/hooks';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { TABLE_TICKET } from '@/stores/table/tableInitialState';
import {
  getCurrentSelectedRow,
  getCurrentTableQuery,
} from '@/stores/table/tableSelectors';
import { QMS_RESOURCES } from '@/types/resources';

import { useTicketButton } from '../../hooks/useTicketButton';
import { ROUTE_PATIENT_WAITING_SCREEN } from '../../routes';
import { ISearchTicketFilter, ITicketDTO } from '../../types/ticket';

import { CallSpeakerButton } from './buttons/CallSpeakerButton';
import { TicketActionButtonsShell } from './TicketActionButtonsShell';

function TicketActionButtons() {
  const record = useAppSelector(
    getCurrentSelectedRow<ITicketDTO>(QMS_RESOURCES.QMS_TICKET),
  );
  const query = useAppSelector(getCurrentTableQuery<ISearchTicketFilter>(TABLE_TICKET));
  const modalityID = query?.filter?.modalityID;
  const notifyModal = useNotifySnackbar();

  const { completeTicket, passingTicket } = useTicketButton({ record });

  return (
    <TicketActionButtonsShell
      ActionsButton={[
        query && <CallSpeakerButton key="Gọi loa" query={query} />,
        <IconButtonWithToolTip
          title="Hoàn thành"
          key="Hoàn thành"
          onClick={async () => {
            completeTicket();
          }}
        >
          <CheckCircleOutlineIcon />
        </IconButtonWithToolTip>,
        <IconButtonWithToolTip
          key="Bỏ lượt"
          title="Bỏ lượt"
          onClick={async () => {
            passingTicket();
          }}
        >
          <DoDisturbOnIcon />
        </IconButtonWithToolTip>,
        <IconButtonWithToolTip
          title="Màn hình chờ"
          key="Màn hình chờ"
          onClick={() => {
            if (modalityID) {
              window.open(`${ROUTE_PATIENT_WAITING_SCREEN}/${modalityID}`, '_blank');
            } else {
              notifyModal({
                message: `Chọn phòng chụp để thực hiện chức năng này`,
                options: {
                  variant: 'error',
                },
              });
            }
          }}
        >
          <CastIcon />
        </IconButtonWithToolTip>,
      ]}
    />
  );
}

export default TicketActionButtons;
