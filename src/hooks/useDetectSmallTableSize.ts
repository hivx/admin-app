import { useEffect, useState } from 'react';

import { TableRefType } from '@/components/Table/MyTable';

/**
 * Min width to detect small table size
 */
const MIN_WITDH_TABLE_CONTAINER = 950;

/**
 * Use to detect small table size
 */
export const useDetectSmallTableSize = (
  tableContainerRef?: TableRefType['tableContainerRef'],
) => {
  const [isSmallTableSize, setIsSmallTableSize] = useState<boolean>();

  let tableContainerElement = document.getElementById('');
  if (tableContainerRef && 'current' in tableContainerRef && tableContainerRef?.current) {
    tableContainerElement = tableContainerRef?.current;
  }
  /**
   * use Resize Observer interface
   * Observe width of table container
   */
  useEffect(() => {
    if (!tableContainerElement) return;
    const myObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.borderBoxSize) {
          const width = entry.borderBoxSize[0].inlineSize;
          setIsSmallTableSize(width < MIN_WITDH_TABLE_CONTAINER);
        }
      }
    });

    myObserver.observe(tableContainerElement);

    // Cleanup the observer by unobserving all elements
    return () => {
      myObserver.disconnect();
    };
  }, [tableContainerElement]);

  return isSmallTableSize;
};
