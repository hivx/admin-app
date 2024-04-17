import { QRCodeOptions } from 'qrcode';

import { CSSPx } from './css';

export type ElementEntity = {
  /**
   * HTML Element ID or HTML Element Classname
   */
  id: string;
  /**
   * Search by ID or search by Classname
   */
  idType?: 'id' | 'classname';
};

export enum PrintDataType {
  Text = 'text',
  Image = 'image',
  Barcode = 'barcode',
  Checkbox = 'checkbox',
  QRCode = 'QRCode',
}

/**
 * Use this type for replaceElement function to input custom data
 */
export type HTMLPrintElement = ElementEntity &
  (
    | ({ dataType: PrintDataType.Text } & PrintTextData)
    | ({ dataType: PrintDataType.Image } & PrintImageData)
    | ({ dataType: PrintDataType.Barcode } & PrintBarcodeData)
    | ({ dataType: PrintDataType.Checkbox } & PrintCheckboxData)
    | ({ dataType: PrintDataType.QRCode } & PrintQRCodeData)
  );

/**
 * Text data
 * Usually use in printing text content
 */
export type PrintTextData = {
  /**
   * Element value for display
   */
  value: string;
} & ElementEntity;

/**
 * Use for printing images
 */
export type PrintImageData = {
  /**
   * Can be Blob || Base64 data url || Path to image
   */
  value: Blob | string;
} & ElementEntity;

/**
 * Use for printing barcode
 * Value will be automatically converted to barcode
 */
export type PrintBarcodeData = {
  value: string;
  options?: {
    height?: CSSPx; // css height
  };
} & ElementEntity;

/**
 * Use for printing checkbox
 */
export type PrintCheckboxData = {
  value: boolean;
} & ElementEntity;

/**
 * Use for printing QRCode
 * Value will be automatically converted to QRCode
 */
export type PrintQRCodeData = {
  value: string;
  options?: QRCodeOptions;
} & ElementEntity;
