/**
 * Check if table content is overflowing table container
 * Return the ratio of overflow: bodyHeight / (tableHeight - headerHeight)
 * and the computed number of rows per table
 */
export type IOverflowInfo = {
  overflowRatio: number;
  numberOfRowsPerTable: number;
};
export const getTableOverflowInfo = (
  tableContainer: HTMLDivElement | null,
  totalRows: number,
): IOverflowInfo => {
  if (!tableContainer)
    return {
      overflowRatio: 1,
      numberOfRowsPerTable: 0,
    };
  const tableEl = tableContainer.querySelector('table');
  const headerEl = tableEl?.querySelector('thead');
  const bodyEl = tableEl?.querySelector('tbody');
  const rowEl = bodyEl?.querySelector('tr');

  if (headerEl && rowEl) {
    const tableRect = tableContainer.getBoundingClientRect();
    const headerRect = headerEl.getBoundingClientRect();
    const rowRect = rowEl.getBoundingClientRect();
    const headerHeight = headerRect.height;
    const tableHeight = tableRect.height;
    const rowHeight = rowRect.height;
    // console.log({ headerHeight, bodyHeight, tableHeight, bodyRect, bodyEl, rowHeight });
    return {
      overflowRatio: (totalRows * rowHeight) / (tableHeight - headerHeight),
      numberOfRowsPerTable: Math.floor((tableHeight - headerHeight) / rowHeight),
    };
  }
  return {
    overflowRatio: 1,
    numberOfRowsPerTable: 0,
  };
};
