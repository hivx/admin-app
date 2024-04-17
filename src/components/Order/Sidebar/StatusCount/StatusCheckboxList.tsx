import { Box, Stack, Typography, styled, lighten } from '@mui/material';
import { FC, useMemo } from 'react';
import { Path } from 'react-hook-form';

import { MyCheckbox } from '@/components';
import { MyFormMultiCheckbox } from '@/components/Elements/Inputs/MyFormMultiCheckbox';
import {
  MultiCheckboxController,
  MultiCheckboxData,
} from '@/components/Elements/Inputs/MyMultiCheckboxController';
import { IFormControlInputProps } from '@/components/Form';
import OrderTableStyles from '@/components/Order/OrderTable.styles';
import { useTranslate } from '@/hooks';
import { ISearchOrderFilter, ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';
import { IOrderStatusCountDTO } from '@/types/dto/reportStatusCount';

import { OrderStatusForm } from './OrderStatusCount';

const { StyledOrderTableRow } = OrderTableStyles;

type StatusCheckboxListProps = {
  name: Path<OrderStatusForm>;
  data: IOrderStatusCountDTO[];
  controls: IFormControlInputProps<OrderStatusForm>;
  statusTableFilter?: ISearchOrderFilter['reportStatus'];
};

/**
 * Display status checkbox list in Order list sidebar
 */
export const StatusCheckboxList: FC<StatusCheckboxListProps> = (props) => {
  const { controls, data, name, statusTableFilter = [] } = props;
  const translate = useTranslate();
  const numberOfOrder = data.map((item) => item.total).reduce((a, b) => a + b, 0);

  const checkboxData = useMemo<MultiCheckboxData<IOrderStatusCountDTO>[]>(() => {
    const m_data: MultiCheckboxData<IOrderStatusCountDTO>[] = [];
    Object.entries(ORDER_DIAGNOSIS_STEP_STATUS).map(([_, value]) => {
      const dataFromAPI = data.find((statusCount) => statusCount.status === value);
      m_data.push({
        id: value,
        data: {
          status: value,
          total: dataFromAPI?.total ?? 0,
        },
        isSelected: statusTableFilter.includes(value), // trang thai ban dau
      });
    });
    return m_data;
  }, [data, statusTableFilter]);

  return (
    <Stack>
      <MyFormMultiCheckbox
        control={controls.control}
        name={name}
        renderInput={(fields) => (
          <MultiCheckboxController
            value={checkboxData}
            onSelectCallback={(data) => {
              const listSelectedStatus = data.map((item) => {
                if (item.isSelected) return item.id;
              });
              fields.onChange(listSelectedStatus.filter((item) => item));
            }}
            renderInput={({ onItemClick, checkboxDataState }) => {
              return (
                <>
                  {checkboxDataState.map((item) => {
                    return (
                      <StyledSelectItemWrapper key={item.id}>
                        <StyledCheckboxAndTitleWrapper>
                          <StyledStatusCheckbox
                            value={item.id}
                            onChange={(e) => {
                              onItemClick && onItemClick(e, item);
                            }}
                            checked={item.isSelected}
                          />
                          <StyledOrderTableRow $reportStatus={item.data?.status}>
                            <Typography>
                              {item.data?.status &&
                                translate.resources.order.reportStatusMessage({
                                  status: item.data.status,
                                })}
                            </Typography>
                          </StyledOrderTableRow>
                        </StyledCheckboxAndTitleWrapper>
                        <Box display="flex" alignItems="center">
                          <StyledCountNumber>
                            ({item.data ? item.data?.total : 0})
                          </StyledCountNumber>
                        </Box>
                      </StyledSelectItemWrapper>
                    );
                  })}
                </>
              );
            }}
            renderOptionSelectAll={({
              onSelectAll,
              checkboxDataState,
              isAllCheckboxSelected,
            }) => {
              return (
                <>
                  <StyledSelectItemWrapper key={'all'}>
                    <StyledCheckboxAndTitleWrapper>
                      <StyledStatusCheckbox
                        value={''}
                        onChange={(e) => {
                          onSelectAll && onSelectAll(e);
                        }}
                        checked={isAllCheckboxSelected}
                      />
                      <Typography>{translate.buttons.all()}</Typography>
                    </StyledCheckboxAndTitleWrapper>
                    <Box display="flex" alignItems="center">
                      <StyledCountNumber>({numberOfOrder})</StyledCountNumber>
                    </Box>
                  </StyledSelectItemWrapper>
                </>
              );
            }}
          />
        )}
      />
    </Stack>
  );
};

const StyledSelectItemWrapper = styled(Stack)`
  padding: ${(props) => props.theme.spacing(0.25)} 0;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledCheckboxAndTitleWrapper = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;
const StyledCountNumber = styled(Typography)`
  color: ${(props) => lighten(props.theme.palette.text.primary, 0.5)};
`;

const StyledStatusCheckbox = styled(MyCheckbox)`
  padding: 0;
`;
