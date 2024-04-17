import { useDisclosure, useTranslate } from '@/hooks';
import { printDocumentHTML } from '@/lib/dataHelper/htmlElementHelper';
import {
  useGenericNotifySnackbar,
  useNotifySnackbar,
} from '@/providers/NotificationProvider';
import { isFulfilled } from '@/utils/checkPromiseStatus';

import { useLazyGetModalitySuggestionQuery } from '../api/getModalitySuggestion';
import { useLazyGetListMwlQuery } from '../api/mwl';
import { useCreateTicketMutation } from '../api/ticket';
import { generateMultiTicketHTML } from '../components/Kiosk/generateTicketHTML';
import {
  GetDataPrintTicketProps,
  getDataPrintTicket,
} from '../lib/dataHelper/getDataPrintTicket';
import { useKioskFunctions } from '../providers/KioskProvider';
import { ITicketCreateDTO, ITicketDTO } from '../types/ticket';

/**
 *
 * @returns function printTicket()
 */
export const usePrintMultiTicket = () => {
  const kioskFunctions = useKioskFunctions();
  const [triggerGetMwlList] = useLazyGetListMwlQuery();
  const [triggerGetModalitySuggest] = useLazyGetModalitySuggestionQuery();
  const [createTicket] = useCreateTicketMutation();
  // const { isOpen, close, open } = useDisclosure(false);
  const translate = useTranslate();
  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.createResource({
      resource: translate.pages.reception.ticket().toLowerCase(),
    }),
  );

  const notify = useNotifySnackbar();

  const notifyNotProcedures = () => {
    notify({ message: 'Không tìm thấy dịch vụ chụp', options: { variant: 'warning' } });
  };

  const clearPIDnFocusInput = () => {
    kioskFunctions.clearPID();
    kioskFunctions.autoFocusPID();
  };
  const printTicket = async (
    filter: GetDataPrintTicketProps['filter'],
    siteID: GetDataPrintTicketProps['siteID'],
  ) => {
    const { execModalityData, ticketInfomation } = await getDataPrintTicket({
      filter,
      siteID,
      triggerGetMwlList,
      triggerGetModalitySuggest,
      notifyNotProcedures,
      clearPIDnFocusInput,
      // open,
    });
    const listTicketPrint: ITicketCreateDTO[] = [];
    Object.values(execModalityData).map((modality) => {
      const { id: modalityID, ticketProcedures: services } = modality;
      if (modalityID && services) {
        listTicketPrint.push({ ...ticketInfomation, modalityID, services });
      }
    });
    const promises: Promise<ITicketDTO>[] = listTicketPrint.map(
      (ticket) =>
        new Promise((resolve, reject) => {
          createTicket(ticket)
            .then((res) => {
              if ('error' in res) {
                notifyError();
                reject();
              } else {
                const ticketData = res.data;
                resolve(ticketData);
              }
            })
            .catch((error) => reject(error));
        }),
    );

    const rawResponse = await Promise.allSettled(promises);

    const dataPrint = rawResponse
      .filter(isFulfilled)
      .map((item) => item.value)
      .map((value) => {
        return {
          ...value,
          roomName: value.modality?.roomName ?? '',
        };
      });

    if (dataPrint && dataPrint.length !== 0) {
      const externalDoc = await generateMultiTicketHTML(dataPrint);
      printDocumentHTML(externalDoc);
    }
    clearPIDnFocusInput();
    kioskFunctions.closeAutoSelectModalityModal();
  };

  return { printTicket };
};
