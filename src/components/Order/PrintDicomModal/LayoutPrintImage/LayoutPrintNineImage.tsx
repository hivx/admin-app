import React, { FC } from 'react';

import { LayoutPrintImageProps } from '..';

export const LayoutPrintNineImage: FC<LayoutPrintImageProps> = (props) => {
  const { images } = props;
  return (
    <div id="imageSegment" style={{ width: '100%' }}>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td
              style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
              width="50%"
            >
              {images[0] ? <img src={images[0]} alt="img" width={'100%'} /> : <></>}
            </td>
            <td
              style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
              width="50%"
            >
              {images[1] ? <img src={images[1]} alt="img" width={'100%'} /> : <></>}
            </td>
          </tr>
          <tr>
            <td
              style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
              width="50%"
            >
              {images[2] ? <img src={images[2]} alt="img" width={'100%'} /> : <></>}
            </td>
            <td
              style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
              width="50%"
            >
              {images[3] ? <img src={images[3]} alt="img" width={'100%'} /> : <></>}
            </td>
          </tr>
          <tr>
            <td
              style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
              width="50%"
            >
              {images[4] ? <img src={images[2]} alt="img" width={'100%'} /> : <></>}
            </td>
            <td
              style={{ textAlign: 'center', verticalAlign: 'middle', padding: '10px' }}
              width="50%"
            >
              {images[5] ? <img src={images[3]} alt="img" width={'100%'} /> : <></>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
