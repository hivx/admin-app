import { styled, useTheme } from '@mui/material';
import { ResponsiveLine, Serie } from '@nivo/line';

type ProcedureLineChartProps = {
  dataChart: Serie[];
};

/**
 * Line chart represent number of order in each day
 */
export const ProcedureLineChart = ({ dataChart }: ProcedureLineChartProps) => {
  const theme = useTheme();
  return (
    <StyledContainer>
      <ResponsiveLine
        data={dataChart}
        margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        colors={[theme.pacs?.customColors.text.green || '']} // custom colors line chart
        lineWidth={3}
        enablePoints={false} // hidden the rendering of individual data points
        enableGridX={false}
        axisLeft={{
          tickSize: 0,
          tickPadding: 10,
        }}
        axisBottom={{
          tickSize: 10,
          tickPadding: 10,
        }}
        enableSlices="x"
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: theme.pacs?.customColors.statistic.title, // custom color of axisBottom and axisLeft
              },
              text: {
                fill: theme.pacs?.customColors.statistic.title,
                fontSize: 15,
              },
            },
          },
          tooltip: {
            container: {
              background: theme.pacs?.customColors.statistic.background, // custom color of tooltip
            },
            tableCell: {
              color: theme.pacs?.customColors.statistic.title,
            },
          },
        }}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  height: 100%;
  width: 100%;
`;
