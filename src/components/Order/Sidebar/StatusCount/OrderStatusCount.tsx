import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, styled } from '@mui/material';
import { FC } from 'react';
import { UseFormProps } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { useLazyGetListOrdersQuery } from '@/api/order';
import { useGetOrderStatusCountQuery } from '@/api/orderStatusCount';
import { MyFormGroupUnstyled } from '@/components/Form';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { ISearchOrderFilter, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { IOrderStatusCountDTO } from '@/types/dto/reportStatusCount';

import { CollapsibleBoxLayout } from '../CollapsibleBox/CollapsibleBoxLayout';

import { StatusCheckboxList } from './StatusCheckboxList';

export type OrderStatusForm = { reportStatus: `${ORDER_DIAGNOSIS_STEP_STATUS}`[] };

enum TableWithOrderStatusCount {
  TABLE_ORDER = 'order',
  TABLE_EXAMINATION = 'examination',
}
type ReportStatusCountWrapperProps = {
  tableID: `${TableWithOrderStatusCount}`;
};
/**
 * Wrap list checkbox status in Layout can toggle expand
 */
export const OrderStatusCountWrapper: FC<ReportStatusCountWrapperProps> = (props) => {
  const { tableID } = props;
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(tableID));

  /**
   * isRequiredModalityID = true -> component OrderStatusCount dùng trong màn đọc ca OrderListPage,
   * Khi đó, skip truy vấn GetOrderStatusCount phụ thuộc vào điều kiện modalityIDs có hay không
   */
  const isRequiredModalityIdsInQuery = tableID === TABLE_ORDER;
  const translate = useTranslate();
  const { data } = useGetOrderStatusCountQuery(
    {
      filter: {
        fromDate: query?.filter.requestedDateFrom,
        toDate: query?.filter.requestedDateTo,
        modalityIDs: query?.filter.modalityIDs,
        modalityTypes: query?.filter.modalityType
          ? [query?.filter.modalityType]
          : undefined,
      },
    },
    { skip: isRequiredModalityIdsInQuery && !query?.filter.modalityIDs?.length },
  );

  return (
    <CollapsibleBoxLayout title={translate.resources.orderStatus.title()} collapsible>
      <StyledStatusCountForm>
        <div>{data && <OrderStatusForm data={data} tableID={tableID} />}</div>
      </StyledStatusCountForm>
    </CollapsibleBoxLayout>
  );
};

/**
 * Provider func when select list status checkbox
 */
const OrderStatusForm = ({
  data,
  tableID,
}: {
  data: IOrderStatusCountDTO[];
  tableID: ReportStatusCountWrapperProps['tableID'];
}) => {
  const dispatch = useDispatch();
  const query = useAppSelector(getCurrentTableQuery<ISearchOrderFilter>(tableID));
  const [trigger] = useLazyGetListOrdersQuery();

  const formOptions: UseFormProps<OrderStatusForm> = {
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(
      z.object({
        reportStatus: z.array(z.string()).optional(),
      }),
    ),
    defaultValues: {
      reportStatus: [],
    },
  };

  const onSubmit = (formData: OrderStatusForm) => {
    const { reportStatus } = formData;
    dispatch(
      setTableFilter({
        tableId: tableID,
        filter: { ...query?.filter, reportStatus },
      }),
    );
    query && trigger({ ...query, filter: { ...query.filter, reportStatus } });
  };

  return (
    <MyFormGroupUnstyled
      formOptions={formOptions}
      onSubmit={onSubmit}
      autoSubmit
      renderInputs={(controls) => (
        <StatusCheckboxList
          name="reportStatus"
          controls={controls}
          data={data}
          statusTableFilter={query?.filter.reportStatus ?? []}
        />
      )}
    />
  );
};

const StyledStatusCountForm = styled(Stack)`
  padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1)};
`;
