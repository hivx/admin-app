import { Button, Grid, styled, useTheme } from '@mui/material';

import { useTranslate } from '@/hooks';
import { DISPLAY_FORMAT } from '@/utils/dateUtils';

import { useSummaryProcedureData } from '../../hook/useSummaryProcedureData';

import { ProcedureLineChart } from './ProcedureLineChart';

/**
 * Show summary data by day of procedure
 *
 */
export const SummaryProcedureData = () => {
  const translate = useTranslate();
  const { optionSelectTime, buttonSelect, onChangeTimeType, dataChart, dateSelect } =
    useSummaryProcedureData();
  const theme = useTheme();
  return (
    <StyledLayout>
      <StyledHeader>
        <Grid container justifyContent={'space-between'}>
          <Grid item md={8}>
            {translate.resources.analytics.serviceAverage()}
          </Grid>
          <StyledButtonGroup item md={4}>
            {optionSelectTime.map((option) => {
              return (
                <StyledButton
                  key={option.label}
                  onClick={() => onChangeTimeType(option.value)}
                  variant={buttonSelect === option.value ? 'contained' : 'outlined'}
                  sx={{
                    '&:hover': {
                      borderColor: theme?.pacs?.customColors.text.green,
                      backgroundColor: theme?.pacs?.customColors.statistic.title,
                      color: theme?.pacs?.customColors.text.green,
                    },
                    '&:active': {
                      borderColor: theme?.pacs?.customColors.text.green,
                      backgroundColor: theme?.pacs?.customColors.text.green,
                      color: theme?.pacs?.customColors.statistic.title,
                    },
                  }}
                >
                  {option.label}
                </StyledButton>
              );
            })}
          </StyledButtonGroup>
        </Grid>
        <Grid container justifyContent="flex-end">
          {translate.resources.analytics.fromAndToDate({
            fromDate: dateSelect.fromDate.format(DISPLAY_FORMAT.date),
            toDate: dateSelect.toDate.format(DISPLAY_FORMAT.date),
          })}
        </Grid>
      </StyledHeader>
      <ProcedureLineChart dataChart={dataChart} />
    </StyledLayout>
  );
};

const StyledHeader = styled('div')`
  margin-bottom: 10px;
  width: 100%;
`;

const StyledLayout = styled('div')`
  display: grid;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  grid-template-rows: auto minmax(200px, 1fr);
  grid-template-columns: 100%;
`;

const StyledButton = styled(Button)`
  box-shadow: none;
  min-width: 60px;
  height: 20px;
  border-radius: 3px;
  padding: 0;
  margin-left: 5px;
  font-size: 13px;
  font-weight: 400;
  text-transform: none;
  border-color: ${(props) =>
    props.variant === 'contained'
      ? props.theme?.pacs?.customColors.text.green
      : props.theme?.pacs?.customColors.text.gray};
  background-color: ${(props) =>
    props.variant === 'contained'
      ? props.theme?.pacs?.customColors.text.green
      : props.theme?.pacs?.customColors.statistic.title};
  color: ${(props) =>
    props.variant === 'contained'
      ? props.theme?.pacs?.customColors.statistic.title
      : props.theme?.pacs?.customColors.text.gray};
`;

const StyledButtonGroup = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;
