import { HOSPITAL_ASSETS } from './hospitalAssets';
import { HOSPITAL_IDS } from './hospitalIDs';

export const HOSPITAL_ID = import.meta.env.VITE_APP_HOSPITAL_ID as `${HOSPITAL_IDS}`;
export const HOSPITAL_NAME = HOSPITAL_ASSETS[HOSPITAL_ID]?.name.vi;
export const HOSPITAL_NAME_EN = HOSPITAL_ASSETS[HOSPITAL_ID]?.name.en;
export const PATIENT_PORTAL_URL = import.meta.env.VITE_APP_PATIENT_PORTAL_URL as string;
export const CONSULTANT_MEETING_URL = import.meta.env
  .VITE_APP_CONSULTANT_MEETING_URL as string;
