export enum QMSPath {
  Test = '/test',
  Reception = '/reception',
  Ticket = '/ticket',
  PatientWatingScreen = '/patient-screen',
  WaitingList = '/waiting-list',
  SpeakerQueue = '/speaker',
  Summary = '/summary',
  Kiosk = '/kiosk',
}
export const ROUTE_QMS = '/qms';
/**
 * Màn tiếp đón
 */
export const ROUTE_RECEPTION = `${ROUTE_QMS}${QMSPath.Reception}`;
/**
 * Màn phòng chụp
 */
export const ROUTE_TICKET = `${ROUTE_QMS}${QMSPath.Ticket}`;
/**
 * Màn bệnh nhân chờ khám
 */
export const ROUTE_PATIENT_WAITING_SCREEN = `${ROUTE_QMS}${QMSPath.PatientWatingScreen}`;
export const ROUTE_TEST = `${ROUTE_QMS}${QMSPath.Test}`;
/**
 * Màn bệnh nhân chờ kết quả
 */
export const ROUTE_WAITING_LIST = `${ROUTE_QMS}${QMSPath.WaitingList}`;
/**
 * Màn gọi loa
 */
export const ROUTE_PLAYER = `${ROUTE_QMS}${QMSPath.SpeakerQueue}`;
/**
 * Màn tổng hợp
 */
export const ROUTE_SUMMARY = `${ROUTE_QMS}${QMSPath.Summary}`;
