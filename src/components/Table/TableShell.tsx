import { styled, SxProps } from '@mui/material';
import { css } from '@mui/system';
import { FC, ReactNode } from 'react';

export type TableShellProps = {
  FooterComponent?: ReactNode;
  DatagridComponent: ReactNode;
  /**
   * Component that is rendered below the table
   */
  ExtraBottomComponent?: ReactNode;
  /**
   * Determine whether footer is rendered on top or bottom
   * @default top
   */
  footerPosition?: 'top' | 'bottom';
  /**
   * Override container style
   */
  sx?: SxProps;

  /**
   * Hidden footer for table with out footer/pagination
   */
  hiddenFooter?: boolean;
};
/**
 * Handle UI Composition of a Table Component
 * Usually, a table has one of these components: Main Table, Pagination, Extra Footer components
 * We need a Shell component to handle placement and layout of these component
 * and we dont want MyTable to handle Layout logic
 */
export const TableShell: FC<TableShellProps> = (props) => {
  const {
    DatagridComponent,
    FooterComponent,
    ExtraBottomComponent,
    footerPosition = 'top',
    sx,
    hiddenFooter,
  } = props;

  // display Footer when there are ANY component passed in
  const shouldDisplayFooter = !hiddenFooter && FooterComponent;

  return (
    <>
      <StyledTableContainer sx={sx}>
        {shouldDisplayFooter && footerPosition === 'top' && FooterComponent}
        <StyledDatagridContainer $footerPosition={footerPosition}>
          {DatagridComponent}
        </StyledDatagridContainer>
        {shouldDisplayFooter && footerPosition === 'bottom' && FooterComponent}
      </StyledTableContainer>
      {ExtraBottomComponent && (
        <StyledExtraBottomComponentContainer>
          {ExtraBottomComponent}
        </StyledExtraBottomComponentContainer>
      )}
    </>
  );
};

const StyledTableContainer = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

const StyledDatagridContainer = styled('div')<{
  $footerPosition: TableShellProps['footerPosition'];
}>`
  overflow: hidden;
  flex: 1;
  ${(props) => {
    switch (props.$footerPosition) {
      /**
       * remove border radius from table header because footer already has border radius
       */
      case 'top':
        return css`
          .table-container {
            border-radius: 0 0 ${props.theme.pacs?.layout.borderRadius}
              ${props.theme.pacs?.layout.borderRadius};
          }
        `;
      case 'bottom':
        return;
    }
  }}
`;
const StyledExtraBottomComponentContainer = styled('div')``;
