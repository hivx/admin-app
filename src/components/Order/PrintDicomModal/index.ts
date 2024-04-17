import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {
  LayoutPrintOneImage,
  LayoutPrintFourImage,
  LayoutPrintSixImage,
  LayoutPrintTwoImage,
} from './LayoutPrintImage';

export enum LAYOUT_DISPLAY_NAME {
  ONE_IMAGE_LAYOUT = 'ONE_IMAGE_LAYOUT',
  TWO_IMAGE_LAYOUT = 'TWO_IMAGE_LAYOUT',
  FOUR_IMAGE_LAYOUT = 'FOUR_IMAGE_LAYOUT',
  SIX_IMAGE_LAYOUT = 'SIX_IMAGE_LAYOUT',
  // NINE_IMAGE_LAYOUT = 'NINE_IMAGE_LAYOUT',
}

export type PrintDicomTemplate = {
  displayName: string;
  numberOfImages: number;
  Layout: React.FC<LayoutPrintImageProps>;
};

export type PrintImageConfig = Record<LAYOUT_DISPLAY_NAME, PrintDicomTemplate>;

export const printImageConfig: PrintImageConfig = {
  ONE_IMAGE_LAYOUT: {
    displayName: '1 ảnh',
    numberOfImages: 1,
    Layout: LayoutPrintOneImage,
  },
  TWO_IMAGE_LAYOUT: {
    displayName: '2 ảnh',
    numberOfImages: 2,
    Layout: LayoutPrintTwoImage,
  },
  FOUR_IMAGE_LAYOUT: {
    displayName: '2 x 2',
    numberOfImages: 4,
    Layout: LayoutPrintFourImage,
  },

  SIX_IMAGE_LAYOUT: {
    displayName: '3 x 2',
    numberOfImages: 6,
    Layout: LayoutPrintSixImage,
  },
  // NINE_IMAGE_LAYOUT: {
  //   displayName: '3 x 3',
  //   numberOfImages: 9,
  //   Layout: LayoutPrintNineImage,
  // },
};

export const defaultPrintDicomTemplate = printImageConfig.ONE_IMAGE_LAYOUT;

export type LayoutPrintImageProps = {
  /**
   * Base64 string
   */
  images: string[];
};

export const getLayoutPrintHTML = (layoutID: string, images: string[]) => {
  switch (layoutID) {
    case LAYOUT_DISPLAY_NAME.ONE_IMAGE_LAYOUT:
      // code block
      return ReactDOMServer.renderToString(
        React.createElement(printImageConfig.ONE_IMAGE_LAYOUT.Layout, { images }),
      );
    case LAYOUT_DISPLAY_NAME.TWO_IMAGE_LAYOUT:
      return ReactDOMServer.renderToString(
        React.createElement(printImageConfig.TWO_IMAGE_LAYOUT.Layout, { images }),
      );
    case LAYOUT_DISPLAY_NAME.FOUR_IMAGE_LAYOUT:
      return ReactDOMServer.renderToString(
        React.createElement(printImageConfig.FOUR_IMAGE_LAYOUT.Layout, { images }),
      );
    case LAYOUT_DISPLAY_NAME.SIX_IMAGE_LAYOUT:
      return ReactDOMServer.renderToString(
        React.createElement(printImageConfig.SIX_IMAGE_LAYOUT.Layout, { images }),
      );
    // case LAYOUT_DISPLAY_NAME.NINE_IMAGE_LAYOUT:
    //   return ReactDOMServer.renderToString(
    //     React.createElement(printImageConfig.NINE_IMAGE_LAYOUT.Layout, { images }),
    //   );
  }
};
