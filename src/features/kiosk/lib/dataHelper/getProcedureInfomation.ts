import { IMwlBase } from '../../types';
import { ITicketProcedure } from '../../types/procedure';

type procedureInfomationProps = {
  mwlListData: IMwlBase[] | undefined;
};
export const getProcedureInfomation = (props: procedureInfomationProps) => {
  if (props.mwlListData && props.mwlListData.length) {
    const procedures: ITicketProcedure[] = props.mwlListData.map((item) => {
      return {
        accessionNumber: item.accessionNumber,
        procedureCode: item.procedureCode,
        procedureID: item.procedureID,
        procedureName: item.procedureName,
        orderID: item.orderID,
        serviceID: item.serviceID,
        ticketNumber: item.ticketNumber,
        modalityID: item.modalityID,
        roomName: item.roomName,
        ticketCreatedDate: item.ticketCreatedDate ?? '',
      };
    });
    return { procedures };
  }
  return { procedures: undefined };
};
