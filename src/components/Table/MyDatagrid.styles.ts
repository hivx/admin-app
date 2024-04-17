import { css } from '@emotion/react';
import { colors, styled, darken } from '@mui/material';

import { globalStyles } from '@/providers/ThemeProvider';
import { filterTransientProps } from '@/utils/filterTransientProps';

/**
 * Styles
 */

const TableBorderStyle = css`
  border: 1px solid ${colors.grey[400]};
`;

const StyledDatagridContainer = styled('div')`
  overflow: auto;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.palette.background.paper};
  border: 1px solid ${colors.grey[400]};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius}
    ${(props) => props.theme.pacs?.layout.borderRadius} 0 0;

  & > table {
    ${(props) => props.theme.typography.body2}
    min-width: 100%;
    border-collapse: collapse;
    position: relative;
    background-color: ${(props) => props.theme.pacs?.customColors.backgroundTable};
    width: 100%;

    & thead {
      background-color: ${(props) =>
        props.theme.pacs?.customColors.tableHeaderBackground};
      height: ${(props) => props.theme.pacs?.layout.tableTheadHeight};
      top: 0;
      position: sticky;
      z-index: 1;
    }

    & th {
      ${TableBorderStyle}
      border-top: 0;
      position: relative;
      padding: ${(props) => props.theme.spacing(0.5)};
      font-weight: 500;
      font-size: 14px;
      &.sortable {
        cursor: pointer;
      }
      // resizer
      & > .resizer {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 10px;
        user-select: none;
        touch-action: none;
        display: flex;
        justify-content: center;
        transform: translateX(2px);
        &:hover {
          cursor: col-resize;
          & > * {
            width: 2px;
            background: rgba(0, 0, 0, 0.5);
          }
        }
        & > * {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 10px;
          background: transparent;
          transition: all 300ms ease;
        }
      }
    }

    & > tfoot {
      ${TableBorderStyle}
    }

    // disable border left right because of collision with table-container border
    & thead th,
    & tbody tr td {
      &:first-of-type {
        border-left: none;
      }
      &:last-child {
        border-right: none;
      }
    }

    & td,
    & th,
    & td * {
      // make overflow text display ellipsis for table headers and cell
      ${globalStyles.ellipsisEffect}
    }
  }
`;

/**
 * Uses styled because it has more than 2 transient props
 */
const StyledTBody = styled('tbody', filterTransientProps)<{
  $hasRowClick?: boolean;
}>`
  & > tr {
    &:hover {
      background-color: ${(props) =>
        darken(props.theme.palette.primary.contrastText, 0.1)};
      background-color: ${(props) =>
        props.theme.pacs?.customColors.tableRowSelectedBackgroundColor};
      /* color: ${(props) => props.theme.pacs?.customColors.textTableRowHoverColor}; */
      cursor: ${(props) => props.$hasRowClick && 'pointer'};
      /* td > div, */
      /* td > div > div {
        color: ${(props) => props.theme.pacs?.customColors.textTableRowHoverColor};
      } */
    }
    &.selected {
      background-color: ${(props) => props.theme.pacs?.customColors.tableRowHoverColor};
      td > div,
      td > div > div,
      td {
        color: ${(props) => props.theme.pacs?.customColors.textTableRowHoverColor};
      }
    }
    & td {
      ${TableBorderStyle}
      padding: ${(props) => props.theme.spacing(0.5)} ${(props) =>
        props.theme.spacing(1)};
    }
  }
`;

export default {
  StyledDatagridContainer,
  StyledTBody,
};
