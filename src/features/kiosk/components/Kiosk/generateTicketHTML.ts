import JsBarcode from 'jsbarcode';

import { createPrintDocumentHTML } from '@/lib/dataHelper/htmlElementHelper';
import { HTMLPrintElement, PrintDataType } from '@/types/htmlPrint';
import { itechDateTimeToDayjs } from '@/utils/dateUtils';

import { ITicketDTO, TICKET_ELEMENT_ID } from '../../types/ticket';

import rawTicketHtmlTemplate from './rawTicketHtmlTemplate';

const TICKET_BARCODE_HEIGHT = '96px';

export const createPrintTicketDocument = async (
  htmlTemplate: string,
  ticketData: ITicketDTO,
) => {
  const { patientName, pid, ticketNumber, roomName, createdDate } = ticketData;
  const composeDocs = new DOMParser().parseFromString(rawTicketHtmlTemplate, 'text/html');
  const pidElement = composeDocs.getElementById(TICKET_ELEMENT_ID.PATIENT_BARCODE);

  if (pid && pidElement) {
    JsBarcode(pidElement, pid);
    pidElement.style.height = TICKET_BARCODE_HEIGHT;
  }

  const items: HTMLPrintElement[] = [
    {
      id: TICKET_ELEMENT_ID.PATIENT_NAME,
      dataType: PrintDataType.Text,
      value: patientName || '',
    },
    {
      id: TICKET_ELEMENT_ID.PATIENT_ID,
      dataType: PrintDataType.Text,
      value: pid || '',
    },
    {
      id: TICKET_ELEMENT_ID.QUEUE_NUMBER,
      dataType: PrintDataType.Text,
      value: ticketNumber || '',
    },
    {
      id: TICKET_ELEMENT_ID.ROOM,
      dataType: PrintDataType.Text,
      value: roomName || '',
    },
    {
      id: TICKET_ELEMENT_ID.TICKET_CREATED_DATE,
      dataType: PrintDataType.Text,
      value: itechDateTimeToDayjs(createdDate || '')?.format('DD/MM/YYYY hh:mm:ss') || '',
    },
  ];

  return createPrintDocumentHTML(composeDocs, { items });
};

export const generateTicketHTML = async (ticketData: ITicketDTO) => {
  const execComposeDocs = await createPrintTicketDocument(
    rawTicketHtmlTemplate,
    ticketData,
  );
  const externalDoc = new Blob([execComposeDocs.documentElement.innerHTML], {
    type: 'text/html',
  });

  return externalDoc;
};

export const generateMultiTicketHTML = async (multiTicketData: ITicketDTO[]) => {
  const wrapperElement = document.createElement('div');

  const promises = multiTicketData.map((ticketData) => {
    return createPrintTicketDocument(rawTicketHtmlTemplate, ticketData);
  });

  const results = await Promise.allSettled(promises);
  results.forEach((res) => {
    if (res.status === 'fulfilled') {
      wrapperElement.append(res.value.documentElement);
    }
  });
  const externalDoc = new Blob([wrapperElement.innerHTML], {
    type: 'text/html',
  });

  return externalDoc;
};
