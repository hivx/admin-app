import { BaseEntity } from '@/types';

export type ISoundDTOBase = {
  ticketId: number;
  modalityId: number;
  modalityRoom: string;
  speakerId: number;
  ticketNumber: string;
  patientName: string;
  audio: string;
};

export type ISoundDTO = Partial<ISoundDTOBase> & BaseEntity;

export type ISoundDTOSearch = { speakerId: number };

export type ISoundDTOCreate = { ticketId: number };
