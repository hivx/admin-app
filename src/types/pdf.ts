export enum PAPER_SIZE {
  A3 = 'A3',
  A4 = 'A4',
  A5 = 'A5',
}

export enum PAPER_ORIENTATION {
  Portrait = 'Portrait',
  Landscape = 'Landscape',
}

export type PaperConfig = {
  pageSize?: PAPER_SIZE;
  /**
   * Margins in mm
   */
  marginTop?: `${number}`;
  marginBottom?: `${number}`;
  marginLeft?: `${number}`;
  marginRight?: `${number}`;
  zoom?: `${number}`;
  orientation?: PAPER_ORIENTATION;
};

export type ConvertHTMLToPDFArgs = {
  contentHTML: string;
} & PaperConfig;

type PAPER_CONFIG = Record<string, PaperConfig>;

export const PAPER_CONFIG = {
  normalA4: {
    pageSize: PAPER_SIZE.A4,
    marginBottom: '20',
  },
} as const satisfies PAPER_CONFIG;
