import { Stack, styled } from '@mui/material';
import { FC } from 'react';

import { useAppSelector, useTranslate } from '@/hooks';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { ITableID } from '@/stores/table/tableSlice';
import { ISearchOrderFilter } from '@/types/dto';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

import { CollapsibleBoxLayout } from '../CollapsibleBox/CollapsibleBoxLayout';

import { GroupDateRangeButtonFieldProps } from './GroupDateRangeButtonField';
import { SidebarRequestedDateForm } from './SidebarRequestedDateForm';
type SidebarRequestedDateWrapperProps = {
  tableID: ITableID;
} & Pick<GroupDateRangeButtonFieldProps, 'disabledButtonAll'>;

/**
 * Layout filter by RequestedDate in OrderList sidebar
 */
export const SidebarRequestedDateWrapper: FC<SidebarRequestedDateWrapperProps> = ({
  tableID,
  disabledButtonAll,
}) => {
  const translate = useTranslate();
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(tableID));
  const dateFrom = query?.filter.requestedDateFrom;
  const dateTo = query?.filter.requestedDateTo;

  const title =
    dateFrom && dateTo
      ? `${itechDateToDayjs(dateFrom)?.format(DISPLAY_FORMAT.date)} -
      ${itechDateToDayjs(dateTo)?.format(DISPLAY_FORMAT.date)}`
      : translate.date.allDate();

  return title ? (
    <CollapsibleBoxLayout title={title} collapsible>
      <StyledSidebarRequestedDateForm>
        <SidebarRequestedDateForm
          key={title}
          tableID={tableID}
          disabledButtonAll={disabledButtonAll}
        />
      </StyledSidebarRequestedDateForm>
    </CollapsibleBoxLayout>
  ) : (
    <></>
  );
};

const StyledSidebarRequestedDateForm = styled(Stack)`
  padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1)};
`;
