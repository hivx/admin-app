import { FC } from 'react';

import { LayoutPrintImageProps } from '..';

export const LayoutPrintTwoImage: FC<LayoutPrintImageProps> = (props) => {
  const { images } = props;
  return (
    <div id="imageSegment" style={{ width: '100%' }}>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                paddingBottom: '24px',
              }}
            >
              {images[0] ? <img src={images[0]} alt="img" width={'50%'} /> : <></>}
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
              {images[1] ? <img src={images[1]} alt="img" width={'50%'} /> : <></>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
