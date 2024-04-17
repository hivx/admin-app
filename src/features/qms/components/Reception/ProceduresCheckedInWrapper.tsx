import { Typography } from '@mui/material';

import { PrintApproveIcon, FolderIcon } from '@/assets/icon';
import { IRenderTree, MyCheckbox, MyTreeView } from '@/components';
import { useTranslate } from '@/hooks';
import { printDocumentHTML } from '@/lib/dataHelper/htmlElementHelper';

import { useReceptionFunctions } from '../../providers/ReceptionProvider';
import { IMwlBase } from '../../types';
import { ITicketProcedure } from '../../types/procedure';
import { ITicketDTO } from '../../types/ticket';

import { generateMultiTicketHTML } from './generateTicketHTML';
import { TITLE_FONT_WEIGHT } from './ServiceInfomationWrapper';

type ProceduresCheckedInWrapperProps = {
  proceduresCheckedIn: ITicketProcedure[];
  mwlData?: IMwlBase;
};

type ModalityWithProceduresCheckedIn = Record<string, ITicketProcedure[]>;

export const ProceduresCheckedInWrapper = (props: ProceduresCheckedInWrapperProps) => {
  const translate = useTranslate();
  const { mwlData, proceduresCheckedIn } = props;
  const receptionFunctions = useReceptionFunctions();
  const ModalityWithProceduresCheckedInData: ModalityWithProceduresCheckedIn = {};
  const modalityIDSet = new Set();

  /**
   * Ghép các dịch vụ (proceduresCheckedIn) có cùng máy (modalityID) vào chung
   */
  proceduresCheckedIn.forEach((procedure) => {
    if (!modalityIDSet.has(procedure.modalityID)) {
      modalityIDSet.add(procedure.modalityID);
      ModalityWithProceduresCheckedInData[procedure.modalityID] = [procedure];
    }
    if (modalityIDSet.has(procedure.modalityID)) {
      ModalityWithProceduresCheckedInData[procedure.modalityID] =
        ModalityWithProceduresCheckedInData[procedure.modalityID].concat([procedure]);
    }
  });

  const rePrintTicket = async (modalityID: string) => {
    const ticketListData: ITicketDTO[] = [];

    if (mwlData && modalityID) {
      const ticketNumberSet = new Set();
      const proceduresWithRoomSelected = ModalityWithProceduresCheckedInData[modalityID];

      /**
       * Ghép các dịch vụ có cùng (ticketNumber) vào chung mảng (ticketNumberSet) chứa data để in phiếu
       */
      proceduresWithRoomSelected.forEach((item) => {
        if (!ticketNumberSet.has(item.ticketNumber)) {
          ticketListData.push({
            id: parseInt(modalityID),
            patientName: mwlData.patientName ?? '',
            pid: mwlData.pid,
            ticketNumber: item.ticketNumber,
            roomName: item.roomName,
            createdDate: item.ticketCreatedDate ?? '',
            birthDate: null,
            modality: null,
            modalityID: null,
            status: null,
            ticketProcedures: null,
          });
          ticketNumberSet.add(item.ticketNumber);
        }
      });
      const externalDoc = await generateMultiTicketHTML(ticketListData);
      printDocumentHTML(externalDoc);
      receptionFunctions.clearPID();
      receptionFunctions.autoFocusPID();
    }
  };
  const trees: IRenderTree[] = Object.keys(ModalityWithProceduresCheckedInData).map(
    (key) => {
      return {
        MyTreeItemProps: {
          nodeId: key,
          label: (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                Phòng {ModalityWithProceduresCheckedInData[key][0].roomName}
              </Typography>
              <PrintApproveIcon
                color="inherit"
                onClick={() => {
                  rePrintTicket(key);
                }}
              />
            </div>
          ),
          ContentProps: {
            labelCollapsedIcon: <FolderIcon color="primary" />,
            labelExpandedIcon: <FolderIcon color="primary" />,
          },
        },
        children: ModalityWithProceduresCheckedInData[key].map((procedure) => {
          return {
            MyTreeItemProps: {
              nodeId: procedure.serviceID.toString(),
              label: procedure.procedureName,
              ContentProps: {
                labelIcon: <MyCheckbox checked={true} disabled />,
              },
            },
          };
        }),
      };
    },
  );
  return (
    <>
      {proceduresCheckedIn.length !== 0 && (
        <>
          <Typography fontWeight={TITLE_FONT_WEIGHT}>
            {translate.pages.reception.checkedIn()}
          </Typography>
          <MyTreeView trees={trees} multiSelect={false} />
        </>
      )}
    </>
  );
};
