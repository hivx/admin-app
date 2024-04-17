import { TranslationFunctions } from '@/locales/i18n-types';
import { IModalityTypeDTO, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import {
  DAY_OF_WEEK,
  IProcedureCountByDayDataDTO,
  IProcedureCountByDayFieldDTO,
  ISummaryApproverDataDTO,
  ISummaryApproverDataFieldDTO,
  ISummaryApproverDataTableField,
  ISummaryProcedureDataDTO,
  ISummaryStatusDataDTO,
  ISummaryStatusDataFieldDTO,
} from '@/types/dto/analytics';

export const ANALYTIC_REFETCH_INTERVAL = 60000; // auto refetch data after 1 minute

export const getSummaryOrderData = (data?: ISummaryStatusDataDTO) => {
  // calculate total order and the number of order depend on ORDER_DIAGNOSIS_STEP_STATUS
  let total = 0;
  let approved = 0;
  let notStarted = 0;
  let notReady = 0;
  let pendingApproval = 0;

  (data || []).forEach((dataItem: ISummaryStatusDataFieldDTO) => {
    switch (dataItem.status) {
      case ORDER_DIAGNOSIS_STEP_STATUS.NOT_READY: {
        notReady += dataItem.total;
        break;
      }
      case ORDER_DIAGNOSIS_STEP_STATUS.NOT_STARTED: {
        notStarted += dataItem.total;
        break;
      }
      case ORDER_DIAGNOSIS_STEP_STATUS.PENDING_APPROVAL: {
        pendingApproval += dataItem.total;
        break;
      }
      case ORDER_DIAGNOSIS_STEP_STATUS.APPROVED: {
        approved += dataItem.total;
        break;
      }
    }
    total += dataItem.total;
  });

  return {
    /**
     * tổng tất cả các ca
     */
    total,
    /**
     * đã đọc/duyệt
     */
    approved,
    /**
     * chưa đọc
     */
    notStarted,
    /**
     * chưa chụp
     */
    notReady,
    /**
     * đang đọc, chờ duyệt
     */
    pendingApproval,
  };
};

/**
 * convert data from API to data table
 * table field: approverName, each modalityName(CT, MRI, ...), total
 */
export const getSummaryApproverDataTable = (
  data?: ISummaryApproverDataDTO,
  listModalityType?: IModalityTypeDTO[],
) => {
  const dataTable: ISummaryApproverDataTableField[] = [];
  const listHeaderModalityType = (listModalityType || []).map((item) => item.name || '');
  (data || []).forEach((approverDataItem: ISummaryApproverDataFieldDTO) => {
    const { approver, total, details } = approverDataItem;
    // calculate total request base on each modality request
    // const total = Object.values(totalRequests).reduce((acc, cur) => acc + cur, 0);
    dataTable.push({
      approverName: approver.fullname ?? '',
      total,
      ...details,
    });
  });
  return {
    dataTable,
    listHeaderModalityType,
  };
};

/**
 * convert data from API to data for procedure line chart
 */
export const getProcedureDataForChart = (
  translate: TranslationFunctions,
  data?: IProcedureCountByDayDataDTO,
) => {
  const allVal = {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  };
  // get data for eachDay from api response
  (data || []).forEach((dataItem: IProcedureCountByDayFieldDTO) => {
    const { dow, total } = dataItem;
    switch (dow) {
      case DAY_OF_WEEK.MONDAY: {
        allVal.monday = total;
        break;
      }
      case DAY_OF_WEEK.TUESDAY: {
        allVal.tuesday = total;
        break;
      }
      case DAY_OF_WEEK.WEDNESDAY: {
        allVal.wednesday = total;
        break;
      }
      case DAY_OF_WEEK.THURSDAY: {
        allVal.thursday = total;
        break;
      }
      case DAY_OF_WEEK.FRIDAY: {
        allVal.friday = total;
        break;
      }
      case DAY_OF_WEEK.SATURDAY: {
        allVal.saturday = total;
        break;
      }
      case DAY_OF_WEEK.SUNDAY: {
        allVal.sunday = total;
        break;
      }
    }
  });

  // return the data that line chart need to display
  const dataChart = [
    {
      id: `${translate.resources.analytics.serviceAverageColumn()} :`,
      data: [
        {
          x: translate.common.weekday.monday(),
          y: allVal.monday,
        },
        {
          x: translate.common.weekday.tuesday(),
          y: allVal.tuesday,
        },
        {
          x: translate.common.weekday.wednesday(),
          y: allVal.wednesday,
        },
        {
          x: translate.common.weekday.thursday(),
          y: allVal.thursday,
        },
        {
          x: translate.common.weekday.friday(),
          y: allVal.friday,
        },
        {
          x: translate.common.weekday.saturday(),
          y: allVal.saturday,
        },
        {
          x: translate.common.weekday.sunday(),
          y: allVal.sunday,
        },
      ],
    },
  ];

  return dataChart;
};
