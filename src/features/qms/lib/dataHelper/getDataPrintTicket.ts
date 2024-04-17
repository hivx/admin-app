import { useLazyGetModalitySuggestionQuery } from '../../api/getModalitySuggestion';
import { useLazyGetListMwlQuery } from '../../api/mwl';
import { NavBarFilterForm } from '../../components/Reception/NavBarFilterForm';
import { IModalityFormItem } from '../../types';
import { ITicketCreateDTO } from '../../types/ticket';

import { getProcedureInfomation } from './getProcedureInfomation';

export type GetDataPrintTicketProps = {
  filter: Pick<NavBarFilterForm, 'pid' | 'checkIn' | 'fromDate' | 'toDate'>;
  siteID: number;
  triggerGetMwlList: ReturnType<typeof useLazyGetListMwlQuery>[0];
  triggerGetModalitySuggest: ReturnType<typeof useLazyGetModalitySuggestionQuery>[0];
  notifyNotProcedures: () => void;
};

export type DataPrintMultiTicket = {
  ticketInfomation: ITicketCreateDTO;
  execModalityData: Record<string, IModalityFormItem>;
};

/**
 *
 * @returns {execModalityData, ticketInfomation} data needed for printing multi ticket
 */

export const getDataPrintTicket = async (props: GetDataPrintTicketProps) => {
  const {
    filter,
    siteID,
    triggerGetModalitySuggest,
    triggerGetMwlList,
    notifyNotProcedures,
  } = props;

  const mwlQueryResult = await triggerGetMwlList({
    filter: { ...filter, siteID },
  }).unwrap();

  const mwlData = mwlQueryResult?.list[0];

  const { procedures } = getProcedureInfomation({ mwlListData: mwlQueryResult?.list });

  if (!procedures) {
    notifyNotProcedures();
  }

  /**
   * procedureIDs can cho API chon may tu dong
   * la procedure chua duoc xep so
   */
  const procedureIDs = procedures
    ? procedures.filter((item) => !item.ticketNumber).map((item) => item.procedureID)
    : [];

  const ticketInfomation: ITicketCreateDTO | undefined = mwlData
    ? {
        address: mwlData.address,
        birthDate: mwlData.birthDate,
        gender: mwlData.gender,
        patientName: mwlData.patientName,
        pid: mwlData.pid,
      }
    : undefined;

  /**
   * Goi API chon may tu dong khi co procedureIDs
   */
  const modalitySuggestData =
    !!procedureIDs.length &&
    (await triggerGetModalitySuggest({
      filter: { ids: procedureIDs, siteID },
    }).unwrap());

  const modalityData: IModalityFormItem[] = [];
  /**
   * Ghep data tu API voi cac Service da chon de in
   */
  if (modalitySuggestData && procedures) {
    Object.keys(modalitySuggestData).map((procedureID) => {
      const ticketProcedures = procedures.filter((item) => {
        return item.procedureID.toString() === procedureID;
      });
      modalityData.push({ ...modalitySuggestData[procedureID], ticketProcedures });
    });
  }

  const execModalityData: DataPrintMultiTicket['execModalityData'] = {};
  const modalitySet = new Set();
  /**
   * Ghép các dịch vụ (ticketProcedures) có mã máy (modaity.code) giống nhau vào chung 1 máy
   */
  modalityData.forEach((modality) => {
    if (modality.code !== null && modality.ticketProcedures !== null) {
      if (!modalitySet.has(modality.code)) {
        modalitySet.add(modality.code);
        execModalityData[modality.code] = modality;
      } else if (modalitySet.has(modality.code)) {
        const newTicketProcedures = execModalityData[
          modality.code
        ].ticketProcedures?.concat(modality.ticketProcedures);
        if (newTicketProcedures) {
          execModalityData[modality.code] = {
            ...execModalityData[modality.code],
            ticketProcedures: newTicketProcedures,
          };
        }
      }
    }
  });

  return { execModalityData, ticketInfomation };
};
