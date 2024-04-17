import { DEFAULT_QUERY } from '@/lib/dataHelper/apiHelper';
import { IReduxTableState } from '@/stores/table/tableSlice';
import { ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { QMS_RESOURCES, RESOURCES } from '@/types/resources';
import { formatDate, getCurrentDate } from '@/utils/dateUtils';
import { initializeDayjs } from '@/utils/initializeDayjs';

type TableStore = {
  expiredTime: number;
  data: Record<string, IReduxTableState>;
};

export const TABLE_DEPARTMENT = RESOURCES.DEPARTMENT;
export const TABLE_CERTIFICATE = RESOURCES.CERTIFICATE;
export const TABLE_MODALITY = RESOURCES.MODALITY;
export const TABLE_MODALITY_ROOM = RESOURCES.MODALITY_ROOM;
export const TABLE_MODALITY_GROUP = RESOURCES.MODALITY_GROUP;
export const TABLE_MODALITY_TYPE = RESOURCES.MODALITY_TYPE;
export const TABLE_PROCEDURE_GROUP = RESOURCES.PROCEDURE_GROUP;
export const TABLE_PROCEDURE = RESOURCES.PROCEDURE;
export const TABLE_CONTENT_GROUP = RESOURCES.CONTENT_GROUP;
export const TABLE_CONTENT = RESOURCES.CONTENT;
export const TABLE_ORDER = RESOURCES.ORDER;
export const TABLE_EXAMINATION = 'examination';
export const TABLE_ORDER_MOBILE = `${RESOURCES.ORDER}-mobile`;
export const TABLE_RESULT = 'result';
export const TABLE_TICKET = QMS_RESOURCES.QMS_TICKET;
export const TABLE_LAYOUT = RESOURCES.LAYOUT;
export const TABLE_GROUP = RESOURCES.USER_GROUP;
export const TABLE_USER = RESOURCES.USER;
export const TABLE_ORDER_HISTORY = 'order-history';
export const TABLE_ORDER_MERGE_STUDY = 'order-merge-study';
export const TABLE_BOOKMARK = RESOURCES.BOOKMARK;
export const TABLE_USER_ACTIVITY = RESOURCES.USER_ACTIVITY;
export const TABLE_EVENT_LOG = RESOURCES.EVENT_LOG;
export const TABLE_ROLE = RESOURCES.ROLE;
export const TABLE_MODALITY_TYPE_NAME = RESOURCES.MODALITY_TYPE_NAME;
export const TABLE_APPLICATION = RESOURCES.APPLICATION;
export const TABLE_CONFIG = RESOURCES.CONFIG;
export const TABLE_USER_TYPE = RESOURCES.USER_TYPE;
export const TABLE_PATIENT_HISTORY = 'patient-history';
export const TABLE_SHIFT_WORK = RESOURCES.SHIFT_WORK;

// table display summary data of radiologist with each modality type
export const TABLE_SUMMARY_RADIOLOGIST = 'table-summary-radiologist';

// table display summary data of each modality
export const TABLE_SUMMARY_MODALITY = 'table-summary-modality';

// table display list template for selecting
export const TABLE_ATTACHMENT = 'attachment-file';

// table display list template for selecting
export const TABLE_SELECT_TEMPLATE = 'select-template';

// sub table display user list in admin department
export const TABLE_DEPARTMENT_USER = 'department-user';

// sub table display modality list in admin modality group
export const TABLE_MODALITY_BY_GROUP = 'modality-by-group';

// sub table display modality list in admin modality room
export const TABLE_MODALITY_BY_ROOM = 'modality-by-room';

// sub table display modality list in admin modality type
export const TABLE_MODALITY_BY_TYPE = 'modality-by-type';

// sub table display content list in admin content group
export const TABLE_CONTENT_BY_CONTENT_GROUP = 'content-by-group';

// sub table display content list in user group
export const TABLE_USER_GROUP_MEMBER = 'group-user';

export const TABLE_PICK_PATIENT = 'table-pick-patient';

export const TABLE_SCHEDULE = 'table-schedule';

export const TABLE_CONSUMABLE = RESOURCES.CONSUMABLE;
export const TABLE_CONSUMABLE_CREATE = `${RESOURCES.CONSUMABLE}-create`;

export const TABLE_CONTENT_BY_USER = `${RESOURCES.CONTENT}-by-user`;

export const TABLE_STATISTICAL = `${RESOURCES.STATISTICS_REPORT}`;

export const TABLE_SHORTCUTKEY = `${RESOURCES.SHORTCUT_KEY}`;

export const TABLE_CONFIG_ORDER_LIST = 'table-config-order-list';

initializeDayjs();

/**
 * Define the time where we need to clear table query state
 * This is business logic so it should not be in dateUtils
 */
const getTableQueryExpiredTime = () => getCurrentDate().add(1, 'day').unix();

export const initialState: TableStore = {
  expiredTime: getTableQueryExpiredTime(),
  data: {
    // you can set the table's initial state here
    [TABLE_DEPARTMENT]: {
      query: DEFAULT_QUERY,
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_PICK_PATIENT]: {
      query: DEFAULT_QUERY,
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_ORDER_HISTORY]: {
      query: {
        ...DEFAULT_QUERY,
        sort: {
          modalityType: 'asc',
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_ORDER]: {
      query: {
        ...DEFAULT_QUERY,
        sort: {
          reportStatus: 'asc',
          studyTime: 'desc',
        },
        filter: {
          requestedDateFrom: formatDate(getCurrentDate()),
          requestedDateTo: formatDate(getCurrentDate()),
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: 'patientName',
    },
    [TABLE_ORDER_MOBILE]: {
      query: {
        ...DEFAULT_QUERY,
        sort: {
          reportStatus: 'asc',
          requestedTime: 'desc',
        },
        filter: {
          requestedDateFrom: formatDate(getCurrentDate()),
          requestedDateTo: formatDate(getCurrentDate()),
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_RESULT]: {
      query: {
        ...DEFAULT_QUERY,
        filter: {
          requestedDateFrom: formatDate(getCurrentDate()),
          requestedDateTo: formatDate(getCurrentDate()),
          reportStatus: [ORDER_DIAGNOSIS_STEP_STATUS.APPROVED],
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_EXAMINATION]: {
      query: {
        ...DEFAULT_QUERY,
        sort: {
          reportStatus: 'asc',
          requestedTime: 'desc',
        },
        filter: {
          requestedDateFrom: formatDate(getCurrentDate()),
          requestedDateTo: formatDate(getCurrentDate()),
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_SELECT_TEMPLATE]: {
      query: DEFAULT_QUERY,
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_EVENT_LOG]: {
      query: {
        ...DEFAULT_QUERY,
        filter: {
          fromDate: formatDate(getCurrentDate()),
          toDate: formatDate(getCurrentDate()),
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_SCHEDULE]: {
      query: {
        ...DEFAULT_QUERY,
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_PATIENT_HISTORY]: {
      query: {
        ...DEFAULT_QUERY,
        filter: {
          fromDate: formatDate(getCurrentDate()),
          toDate: formatDate(getCurrentDate()),
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_STATISTICAL]: {
      query: {
        ...DEFAULT_QUERY,
        filter: {
          requestedDateFrom: formatDate(getCurrentDate()),
          requestedDateTo: formatDate(getCurrentDate()),
        },
      },
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
    [TABLE_SHIFT_WORK]: {
      query: DEFAULT_QUERY,
      selection: {
        selectedRow: null,
        selectedRows: [],
      },
      defaultFilterField: null,
    },
  },
};
