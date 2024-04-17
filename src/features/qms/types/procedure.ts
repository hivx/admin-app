export type ITicketProcedureDTOCreate = {
  procedureCode: string;
  procedureID: number;
  procedureName: string;
  accessionNumber: string;
  orderID: number;
  serviceID: number;
};

export type ITicketProcedure = ITicketProcedureDTOCreate & {
  ticketNumber: string;
  modalityID: number;
  roomName: string;
  ticketCreatedDate: string;
};
