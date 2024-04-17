import {
  colors,
  Grow,
  Paper,
  Popper,
  PopperProps,
  styled,
  useTheme,
} from '@mui/material';
import { Stack, SxProps } from '@mui/system';
import { Dayjs } from 'dayjs';
import { FC, PropsWithChildren, ReactElement } from 'react';

import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';

import { DateRangeQuickButtons } from './DateRangeQuickButtons';
import MyStaticDatePicker from './MyStaticDatePicker';

type CommonProps = {
  anchorEl: PopperProps['anchorEl'];
};

export type IDateRange = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

export type IMyDateRangePickerPopupProps = {
  WrapperComponent?: FC<PropsWithChildren>;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  showSelectAll?: boolean;
  sx?: SxProps;
} & CommonProps &
  IDateRange;

export const MyDateRangePickerPopup: FC<IMyDateRangePickerPopupProps> = (props) => {
  const {
    anchorEl,
    startDate,
    endDate,
    showSelectAll,
    onStartDateChange,
    onEndDateChange,
    WrapperComponent,
  } = props;

  const PopupContent = (
    <Container sx={props.sx}>
      <Stack spacing={1} direction="column">
        <StyledDivCenterChildren>
          <DateRangeQuickButtons
            currentState={{ startDate, endDate }}
            showSelectAll={showSelectAll}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />
        </StyledDivCenterChildren>
        <Stack spacing={1} direction="row">
          <DatePickerContainer>
            <MyStaticDatePicker value={startDate} onChange={onStartDateChange} />
          </DatePickerContainer>
          <DatePickerContainer>
            <MyStaticDatePicker value={endDate} onChange={onEndDateChange} />
          </DatePickerContainer>
        </Stack>
      </Stack>
    </Container>
  );

  return (
    <DateRangePickerPopper anchorEl={anchorEl}>
      {WrapperComponent ? (
        <WrapperComponent>{PopupContent}</WrapperComponent>
      ) : (
        PopupContent
      )}
    </DateRangePickerPopper>
  );
};

/**
 * Popper controller
 */

const DateRangePickerPopper: FC<
  {
    children: ReactElement;
  } & CommonProps
> = (props) => {
  const theme = useTheme();
  return (
    <Popper
      open
      anchorEl={props.anchorEl}
      placement="bottom-end"
      popperOptions={{ strategy: 'fixed' }}
      transition
      sx={{ zIndex: theme.zIndex.tooltip }}
    >
      {({ TransitionProps }) => (
        <Grow
          {...TransitionProps}
          unmountOnExit
          exit={false}
          style={{ transformOrigin: '0 0 0' }}
        >
          {props.children}
        </Grow>
      )}
    </Popper>
  );
};
/**
 * Styles
 */

const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing(1)};
  box-shadow: ${(props) => props.theme.shadows[5]};
`;

const DatePickerContainer = styled('div')`
  border: 1px solid ${colors.grey[400]};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  overflow: hidden;
  .MuiPickersLayout-root {
    background-color: ${(props) => props.theme.palette.background.default};
  }
  .MuiButtonBase-root.MuiPickersDay-root.Mui-selected {
    background-color: ${(props) =>
      props.theme.pacs?.customColors.backgroundButtonActiveColor};
  }
`;
