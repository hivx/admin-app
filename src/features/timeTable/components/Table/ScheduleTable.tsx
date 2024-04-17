import { FC, useMemo, useRef } from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { ITableField, MyTable } from '@/components/Table/MyTable';
import { useTranslate } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { TimeTableDatagrid } from '@/types/dto/timeTable';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

import { useScheduleTableData } from '../../hook/useScheduleTableData';
import { TimeTableProvider } from '../../providers/TimeTableProvider';
import { ModalUpdateTimetable } from '../Modal/ModalUpdateTimetable';

import { LeftIcon } from './LeftIcon';
import { RightIcon } from './RightIcon';
import { TimeTableActionButton } from './TimeTableActionButton';
import { UsersCell } from './UsersCell';
import { UsersCellActionButton } from './UsersCellActionButton';
import { UsersCellWrapper } from './UsersCellWrapper';
import { WeekInfomation } from './WeekInfomation';

export const ScheduleTable: FC = (props) => {
  const translate = useTranslate();
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const timetableListData = useScheduleTableData();

  const tableColumns = useMemo<ITableField<TimeTableDatagrid>[]>(
    () => [
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            header: 'Thứ',
            cell: (props) => (
              <div
                style={{
                  height: '110px',
                }}
              >
                <StyledDivCenterChildren>
                  {props.row.original.dateOfWeek}
                </StyledDivCenterChildren>
              </div>
            ),
            size: 75,
          }),
      },
      {
        type: 'record',
        name: 'id',
        headerLabel: translate.resources.timetable.date(),
        columnDefOptions: {
          size: 50,
        },
        renderCell: (props) => (
          <StyledDivCenterChildren>
            {itechDateToDayjs(props.row.original.id)?.format(DISPLAY_FORMAT.date)}
          </StyledDivCenterChildren>
        ),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            header: translate.resources.timetable.shift.morning(),
            cell: (props) => (
              <StyledDivCenterChildren>
                <UsersCellWrapper
                  UsersInfoComponent={
                    props.row.original && (
                      <UsersCell
                        users={
                          props.row.original.timetable
                            ? props.row.original.timetable[1]
                            : []
                        }
                      />
                    )
                  }
                  UsersCellButton={<></>}
                />
              </StyledDivCenterChildren>
            ),
            size: 300,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            header: translate.resources.timetable.shift.afternoon(),
            cell: (props) => (
              <StyledDivCenterChildren>
                <UsersCellWrapper
                  UsersInfoComponent={
                    props.row.original && (
                      <UsersCell
                        users={
                          props.row.original.timetable
                            ? props.row.original.timetable[2]
                            : []
                        }
                      />
                    )
                  }
                  UsersCellButton={<></>}
                />
              </StyledDivCenterChildren>
            ),
            size: 300,
          }),
      },
      {
        type: 'custom',
        getColumnDef: (columnHelper) =>
          columnHelper.display({
            header: translate.resources.timetable.shift.day(),
            cell: (props) => (
              <StyledDivCenterChildren>
                <UsersCellWrapper
                  UsersInfoComponent={
                    props.row.original && (
                      <UsersCell
                        users={
                          props.row.original.timetable
                            ? props.row.original.timetable[3]
                            : []
                        }
                      />
                    )
                  }
                  UsersCellButton={<></>}
                />
              </StyledDivCenterChildren>
            ),
            size: 300,
          }),
      },
    ],
    [],
  );

  return (
    <TimeTableProvider>
      <MyTable
        tableId={TABLE_SCHEDULE}
        data={timetableListData}
        tableColumnsDescription={tableColumns}
        TanstackTableOptions={{
          enableRowSelection: true,
          enableMultiRowSelection: false,
        }}
        showPaginationInfo={false}
        renderPagination={() => <WeekInfomation />}
        renderActionButtons={() => <TimeTableActionButton />}
      />
      <ModalUpdateTimetable />
    </TimeTableProvider>
  );
};
