import { Stack } from '@mui/material';
import React, {
  ReactNode,
  useRef,
  FC,
  useEffect,
  useState,
  Ref,
  useCallback,
} from 'react';

// import { getListMockResources } from '@/test/data/getListMockData';
// import { mwlGenerator } from '@/test/data/mwlGenerator';
import { IGetManyResourceQueryResult } from '@/types';

import { useGetListApprovedDiagnosisQuery } from '../../api/approvedDiagnosis';
import { IMwlBase } from '../../types';
import { getTableOverflowInfo, IOverflowInfo } from '../../utils/getTableOverflowInfo';

import { WaitingListTable } from './WaitingListTable';

// const data = getListMockResources(mwlGenerator, 30);
// 30 seconds
const POLLING_INTERVAL = 5 * 1000;

/**
 * Handles data processing for WaitingListTable
 * Perform split data to the other table if we detect that data is overflowing
 */
export const ConnectedWaitingListTable = () => {
  const { data, isFetching } = useGetListApprovedDiagnosisQuery(
    { filter: {} },
    { pollingInterval: POLLING_INTERVAL, refetchOnReconnect: true, refetchOnFocus: true },
  );
  const firstTableRef = useRef<HTMLDivElement>(null);
  const secondTableRef = useRef<HTMLDivElement>(null);
  const [overflowInfo, setOverflowInfo] = useState<IOverflowInfo>(
    getTableOverflowInfo(firstTableRef.current, data?.list.length || 0),
  );
  const updateOverflowInfo = useCallback(
    () =>
      setOverflowInfo(
        getTableOverflowInfo(firstTableRef.current, data?.list.length || 0),
      ),
    [data?.list.length],
  );

  // run after render
  useEffect(() => {
    if (data && firstTableRef.current) {
      updateOverflowInfo();
    }
  }, [data, updateOverflowInfo]);

  // update overflow on window resize
  useEffect(() => {
    window.addEventListener('resize', updateOverflowInfo);
    return () => {
      window.removeEventListener('resize', updateOverflowInfo);
    };
  }, [updateOverflowInfo]);

  return data ? (
    <OverflowDualTable
      data={data}
      firstTableRef={firstTableRef}
      secondTableRef={secondTableRef}
      overflowInfo={overflowInfo}
      isFetching={isFetching}
    />
  ) : (
    <></>
  );
};

/**
 * Receive Overflow ratio and split the data
 */
const OverflowDualTable: FC<{
  firstTableRef: Ref<HTMLDivElement>;
  secondTableRef: Ref<HTMLDivElement>;
  data: IGetManyResourceQueryResult<IMwlBase>;
  isFetching: boolean;
  overflowInfo: IOverflowInfo;
}> = (props) => {
  const { data, isFetching, firstTableRef, secondTableRef, overflowInfo } = props;

  const [tableData, setTableData] = useState<{ first: IMwlBase[]; second: IMwlBase[] }>({
    first: data.list.slice(),
    second: [],
  });

  useEffect(() => {
    const { overflowRatio, numberOfRowsPerTable } = overflowInfo;
    if (data && overflowRatio > 1) {
      const firstTableData: IMwlBase[] = data.list.slice();
      // overflow detected, slicing data
      const spliced = firstTableData.splice(numberOfRowsPerTable);
      setTableData({
        first: firstTableData,
        second: spliced,
      });
    }
  }, [data, overflowInfo]);

  // console.log('overflowInfo', overflowInfo);
  return (
    <DualTableLayout>
      <WaitingListTable
        ref={firstTableRef}
        data={tableData.first}
        isFetching={isFetching}
      />
      <WaitingListTable
        ref={secondTableRef}
        data={tableData.second}
        isFetching={isFetching}
      />
    </DualTableLayout>
  );
};

/**
 * Handle UI
 */
const DualTableLayout: FC<{ children: [ReactNode, ReactNode] }> = (props) => {
  return (
    <Stack direction="row" height="100%">
      {props.children}
    </Stack>
  );
};
