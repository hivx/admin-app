import dayjs, { Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { useState } from 'react';

import { useGetSummaryDayOfWeekDataQuery } from '@/api/analytics';
// eslint-disable-next-line no-restricted-imports
import { useTranslate } from '@/hooks';
import { ANALYTIC_ID } from '@/types/dto/analytics';
import {
  ANALYTIC_REFETCH_INTERVAL,
  getProcedureDataForChart,
} from '@/utils/analyticUtil';
import { DATE_FORMAT } from '@/utils/dateUtils';

dayjs.extend(quarterOfYear); // for using startOf quarter and endOf quarter

/**
 * For button group select time summary procedure
 */
export enum PROCEDURE_SELECT_TIME {
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
}

type DateSelectType = {
  fromDate: Dayjs;
  toDate: Dayjs;
};

/**
 * Show summary data in all type of order
 */
export const useSummaryProcedureData = () => {
  const translate = useTranslate();
  const [buttonSelect, setButtonSelect] = useState(PROCEDURE_SELECT_TIME.WEEK);
  const [dateSelect, setDateSelect] = useState<DateSelectType>({
    fromDate: dayjs().startOf('week'),
    toDate: dayjs().endOf('week'),
  });

  const { data, isFetching } = useGetSummaryDayOfWeekDataQuery(
    {
      fromDate: dateSelect.fromDate.format(DATE_FORMAT),
      id: ANALYTIC_ID.DAYOFWEEK_COUNT,
      toDate: dateSelect.toDate.format(DATE_FORMAT),
    },
    { pollingInterval: ANALYTIC_REFETCH_INTERVAL }, // auto refetch to get real-time data
  );

  const dataChart = getProcedureDataForChart(translate, data);

  const optionSelectTime = [
    {
      label: translate.common.week(),
      value: PROCEDURE_SELECT_TIME.WEEK,
    },
    {
      label: translate.common.month(),
      value: PROCEDURE_SELECT_TIME.MONTH,
    },
    {
      label: translate.common.quarter(),
      value: PROCEDURE_SELECT_TIME.QUARTER,
    },
  ];

  const onChangeTimeType = (val: PROCEDURE_SELECT_TIME) => {
    // handle click button change time type
    setButtonSelect(val);
    setDateSelect({
      fromDate: dayjs().startOf(val),
      toDate: dayjs().endOf(val),
    });
  };

  return {
    optionSelectTime,
    buttonSelect,
    onChangeTimeType,
    dateSelect,
    data,
    isFetching,
    dataChart,
  };
};
