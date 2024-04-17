import { BaseEntity, Nullable } from '@/types';

export enum EventLogSource {
  HIS_INTEGRATE = 'HIS_INTEGRATE',
  WORKLIST_INTEGRATE = 'WORKLIST_INTEGRATE',
}
export type IEventLogDTOBase = {
  attempts: number;
  availableAt: string;
  createdTime: string;
  errors: string;
  hospitalID: string;
  key: string;
  lastAttempt: string;
  payload: string;
  source: `${EventLogSource}`;
  succeeded: boolean;
  type: string;
  uuid: string;
};

export type IEventLogDTO = BaseEntity & Nullable<IEventLogDTOBase>;

export type IEventLogDTOSearch = Partial<
  Pick<IEventLogDTO, 'source' | 'succeeded' | 'id'> & {
    ids: IEventLogDTO['id'][];
    fromDate: string;
    toDate: string;
  }
>;

export type IEventLogSource = {
  id: `${EventLogSource}`;
  name: `${EventLogSource}`;
};
