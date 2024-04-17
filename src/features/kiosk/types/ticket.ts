import { Nullable, BaseEntity } from '@/types';
import { Gender } from '@/types/dto';

import { IKioskModalityDTO } from './kioskModality';
import { ITicketProcedure, ITicketProcedureDTOCreate } from './procedure';

export enum TICKET_STEP_STATUS {
  STARTED = 'STARTED',
  PASSING = 'PASSING',
  COMPLETED = 'COMPLETED',
}
export enum TICKET_ELEMENT_ID {
  PATIENT_NAME = 'pName',
  PATIENT_ID = 'PID',
  QUEUE_NUMBER = 'queue',
  ROOM = 'room',
  TICKET_CREATED_DATE = 'ticketCreatedDate',
  PATIENT_BARCODE = 'patientBarcode',
}

export type ITicketDTOBase = {
  modalityID: number;
  patientName: string;
  pid: string;
  status: `${TICKET_STEP_STATUS}`;
  ticketNumber: string;
  ticketProcedures: ITicketProcedure[];
  modality: IKioskModalityDTO;
  birthDate: string;
  roomName: string;
  createdDate: string;
};

export type ITicketDTO = BaseEntity & Nullable<ITicketDTOBase>;

export type ITicketCreateDTO = {
  address?: string;
  birthDate?: string;
  modalityID?: number;
  patientName?: string;
  pid?: string;
  gender?: `${Gender}`;
  services?: ITicketProcedureDTOCreate[];
};

export type ITicketUpdateDTO = BaseEntity & Partial<Pick<ITicketDTOBase, 'status'>>;

export type ISearchTicketFilter = Partial<
  Pick<ITicketDTOBase, 'modalityID' | 'pid' | 'status'> & {
    patientName: string;
  }
>;
