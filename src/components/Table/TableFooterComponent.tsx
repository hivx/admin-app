import { colors, css, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

import { useDetectSmallTableSize } from '@/hooks/useDetectSmallTableSize';

import { TableRefType } from './MyTable';
import { TableShellProps } from './TableShell';

type TableFooterComponentProps = {
  FooterCenterComponent: ReactNode;
  FooterLeftComponent: ReactNode;
  FooterRightComponent: ReactNode;
  footerPosition?: 'top' | 'bottom';
  tableContainerRef?: TableRefType['tableContainerRef'];
};

/**
 * Wrap footer component of table
 */
export const TableFooterComponent: FC<TableFooterComponentProps> = (props) => {
  const {
    FooterCenterComponent,
    FooterLeftComponent,
    FooterRightComponent,
    footerPosition = 'top',
    tableContainerRef,
  } = props;

  const isSmallTableSize = useDetectSmallTableSize(tableContainerRef);
  return (
    <StyledFooter
      $footerPosition={footerPosition}
      $isSmallTableSize={isSmallTableSize ?? false}
      className="table-footer"
    >
      <StyledFooterLeftContainer>{FooterLeftComponent}</StyledFooterLeftContainer>
      <StyledFooterCenterContainer>{FooterCenterComponent}</StyledFooterCenterContainer>
      <StyledFooterRightContainer>{FooterRightComponent}</StyledFooterRightContainer>
    </StyledFooter>
  );
};

const StyledFooter = styled('div')<{
  $footerPosition: TableShellProps['footerPosition'];
  $isSmallTableSize: boolean;
}>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isSmallTableSize ? '1fr 0.25fr 1fr' : '1fr 1fr 1fr'};
  grid-template-rows: auto;
  background-color: ${(props) => props.theme.palette.background.paper};
  align-items: center;
  padding: ${(props) => props.theme.spacing(0.5)};
  border: 1px solid ${colors.grey[400]};
  ${(props) => {
    const tableBorderRadius = props.theme.pacs?.layout.borderRadius;
    switch (props.$footerPosition) {
      case 'top':
        return css`
          border-bottom: 0;
          border-radius: ${tableBorderRadius} ${tableBorderRadius} 0 0;
        `;
      case 'bottom':
        return css`
          border-top: 0;
          border-radius: 0 0 ${tableBorderRadius} ${tableBorderRadius};
        `;
    }
  }}
`;

const StyledFooterLeftContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
`;
const StyledFooterRightContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: end;
  align-items: center;
`;
const StyledFooterCenterContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;
