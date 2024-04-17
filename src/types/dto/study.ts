import { Nullable, BaseEntity } from '@/types';

import { IModalityDTO } from './modality';
import { Gender } from './patient';
import { ICloudUserDTO } from './user';

export type IStudySuggestDTOBase = {
  abnormal: boolean;
  appsID: BaseEntity['id'];
  hospitalID: string;
  studyID: BaseEntity['id'];
  suggestion: string;
};
export type IStudySuggestDTO = Nullable<IStudySuggestDTOBase> & BaseEntity;

export type IStudyDTOBase = {
  accessionNumber: string;
  birthDate: string;
  bodyPartExamined: string;
  description: string;
  gender: `${Gender}`;
  hospitalID: string;
  institutionName: string;
  manufacturerModelName: string;
  modality: IModalityDTO;
  modalityType: string;
  numOfImages: number;
  numOfSeries: number;
  operator: ICloudUserDTO;
  operatorName: string;
  patientName: string;
  pid: string;
  referringPhysician: string;
  stationName: string;
  studyTime: string;
  studyInstanceUID: string;
  suggest: IStudySuggestDTO;
};
export type IStudyDTO = Nullable<IStudyDTOBase> & BaseEntity;
