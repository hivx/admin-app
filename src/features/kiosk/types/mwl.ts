import { Gender } from '@/types/dto';

export type IMwlBase = {
  address?: string;
  birthDate?: string;
  modalityID: number;
  orderID: number;
  patientName: string;
  pid: string;
  procedureCode: string;
  procedureID: number;
  procedureName: string;
  roomName: string;
  serviceID: number;
  ticketID: number;
  ticketNumber: string;
  accessionNumber: string;
  gender: `${Gender}`;
  ticketCreatedDate?: string;
};

export type IMwlSearch = {
  pid?: string;
  fromDate?: string;
  toDate?: string;
  checkIn?: boolean | null;
  siteID?: number;
};
