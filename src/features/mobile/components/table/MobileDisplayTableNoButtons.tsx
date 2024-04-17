import { styled } from '@mui/material';
import { ReactNode } from 'react';

export const MobileDisplayTableNoButtons = (props: { TableComponent: ReactNode }) => {
  return <StyledTable>{props.TableComponent}</StyledTable>;
};

/**
 * Style table mobile, when table not filter on footer
 */
const StyledTable = styled('div')`
  width: 100%;
  height: 100%;
  overflow: auto;
  & .table-footer {
    overflow: auto;
    grid-template-columns: 0.5fr auto;
    position: relative;
    /**
      - HOT FIX: Trên IOS không hiển thị phân trang ở footer của table chọn mẫu kết quả
      * Tạm thời xử lý bằng cách set cứng chiều cao cho footer và căn chỉnh phần phân trang *
    */
    height: 35px;
    > div > div {
      transform: none;
      position: absolute;
      top: 5px;
      left: 0;
      transform: translateX(50%);
    }
  }
`;
