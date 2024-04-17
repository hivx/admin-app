import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

import {
  ElementEntity,
  PrintTextData,
  HTMLPrintElement,
  PrintDataType,
  PrintBarcodeData,
  PrintImageData,
  PrintCheckboxData,
  PrintQRCodeData,
} from '@/types/htmlPrint';
import { isDataURI, loadImage } from '@/utils/imageUtils';

import { base64Coded, convertFileToBase64 } from './base64FileHelper';

/**
 * Get element or elements based on id or classnames
 */
const getElement = (
  DOMObject: Document,
  options: ElementEntity,
): HTMLElement | HTMLCollectionOf<Element> | null => {
  const { id, idType = 'id' } = options;
  if (idType === 'id') {
    // select element by id
    const element = DOMObject.getElementById(id);
    return element;
  } else if (idType === 'classname') {
    // select element by class
    const elementsByClass = DOMObject.getElementsByClassName(id);
    return elementsByClass;
  }
  return null;
};

const replaceTextElement = async (DOMObject: Document, data: PrintTextData) => {
  const { id, value, idType } = data;

  const element = getElement(DOMObject, { id, idType });

  if (element instanceof HTMLElement) {
    // get by id
    element.innerHTML = value ?? '';
  } else if (element) {
    // get by class
    if (element && element.length > 0) {
      for (let index = 0; index < element.length; ++index) {
        element[index].innerHTML = value ?? '';
      }
    }
  }
};

const replaceBarcode = async (DOMObject: Document, data: PrintBarcodeData) => {
  const { id, value, idType, options = {} } = data;
  const { height = '50px' } = options;

  const element = getElement(DOMObject, { id, idType });

  if (element instanceof HTMLElement) {
    // get by id
    JsBarcode(element, value);
    element.style.height = height;
  } else if (element) {
    // get by class
    if (element && element.length > 0) {
      for (let index = 0; index < element.length; ++index) {
        JsBarcode(element[index], value);
      }
    }
  }
};

const replaceImage = async (DOMObject: Document, data: PrintImageData) => {
  const { id, value, idType } = data;
  const element = getElement(DOMObject, { id, idType });

  let imageDataURI;
  if (value instanceof Blob) {
    imageDataURI = await convertFileToBase64(value);
  } else {
    // image is string

    if (isDataURI(value)) {
      // image is base64
      imageDataURI = value;
    } else {
      // image is a path to image
      const imageBlob = await loadImage(value);
      const imageBase64 = await convertFileToBase64(imageBlob);
      imageDataURI = imageBase64;
    }
  }

  if (element instanceof HTMLElement) {
    // get by id
    if (element instanceof HTMLImageElement) {
      element.src = imageDataURI;
    }
  } else if (element) {
    // get by class
    if (element && element.length > 0) {
      for (let index = 0; index < element.length; ++index) {
        const imageElement = element[index] as HTMLImageElement;
        imageElement.src = imageDataURI;
      }
    }
  }
};

const replaceCheckbox = async (DOMObject: Document, data: PrintCheckboxData) => {
  const { id, value, idType } = data;
  const element = getElement(DOMObject, { id, idType });

  if (element instanceof HTMLElement) {
    // get by id
    if (element instanceof HTMLInputElement) {
      element.defaultChecked = value;
    }
  } else if (element) {
    // get by class
    if (element && element.length > 0) {
      for (let index = 0; index < element.length; ++index) {
        const checkboxElement = element[index] as HTMLInputElement;
        checkboxElement.defaultChecked = value;
      }
    }
  }
};

const replaceQRCode = async (DOMObject: Document, data: PrintQRCodeData) => {
  const { value, options } = data;
  const QRCodeDataURI = await QRCode.toDataURL(value, options);
  replaceImage(DOMObject, {
    ...data,
    value: QRCodeDataURI,
  });
};

export type CreateDocumentHTMLOptions = {
  items: HTMLPrintElement[];
  formatOptions?: Omit<FormatDocumentOptions, 'DOMObject'>;
};
/**
 * Main function to call in components
 * DO NOT call the individual replaceXXXElement
 */
export const createPrintDocumentHTML = async (
  DOMObject: Document,
  options: CreateDocumentHTMLOptions,
) => {
  const { items, formatOptions } = options;

  const promises: Promise<void>[] = items.map((item) => {
    switch (item.dataType) {
      case PrintDataType.Text:
        return replaceTextElement(DOMObject, item);
      case PrintDataType.Image:
        return replaceImage(DOMObject, item);
      case PrintDataType.Barcode:
        return replaceBarcode(DOMObject, item);
      case PrintDataType.Checkbox:
        return replaceCheckbox(DOMObject, item);
      case PrintDataType.QRCode:
        return replaceQRCode(DOMObject, item);
    }
  });

  if (formatOptions) {
    formatDocument({ DOMObject, ...formatOptions });
  }

  await Promise.allSettled(promises);
  return DOMObject;
};

export const printDocumentHTML = (externalDoc: Blob) => {
  const newFrame = document.createElement('iframe');
  newFrame.onload = function onload() {
    newFrame.contentWindow && newFrame.contentWindow.print();
    setTimeout(() => document.body.removeChild(newFrame), 2000);
  };
  newFrame.src = URL.createObjectURL(externalDoc);
  document.body.appendChild(newFrame);
};

type FormatDocumentOptions = {
  DOMObject: Document;
  format: PrintDocumentFormat;
  /**
   * List of element IDs to apply formatting
   */
  formatElements: string[];
};
export type PrintDocumentFormat = {
  fontSize?: number;
  lineHeight?: number;
};
/**
 * set font size and spacing for selected elements
 */
const formatDocument = (options: FormatDocumentOptions) => {
  const { DOMObject, format, formatElements } = options;
  const { lineHeight = 1.2, fontSize = 12 } = format;

  formatElements.forEach((elementID) => {
    const element = DOMObject.getElementById(elementID);
    if (element) {
      element.style.fontSize = `${fontSize}pt`;
      element.style.lineHeight = `${lineHeight}`;
    }
  });
};
/**
 * get base64 barcode from string
 */
export const getBase64barcode = (text: string) => {
  const newText = text.replace('.', '');
  if (!isNaN(Number(newText))) {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, text, { format: 'CODE39' });
    return base64Coded(canvas.toDataURL('image/png'));
  }
  return undefined;
};
/**
 * get base64 qrcode from string
 */
export const getBase64QRcode = async (text: string) => {
  return base64Coded(await QRCode.toDataURL(text));
};
