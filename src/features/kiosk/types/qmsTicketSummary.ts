export type ITicketSummaryDTOBase = {
  modalityID: number;
  roomName: string;
  firstNumber: string;
  secondNumber: string;
  modalityType: string;
};

export type ITicketSummaryDTO = Partial<ITicketSummaryDTOBase>;

export type ITicketSummaryFilterDTO = {
  siteID: number;
};
