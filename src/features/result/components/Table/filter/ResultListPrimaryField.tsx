import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, styled } from '@mui/material';
import { FC, useRef } from 'react';

import { MyFormTextField } from '@/components';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { IFormControlInputProps } from '@/components/Form';
import { useAnchorElement, useTranslate } from '@/hooks';
import { ISearchOrderFilter } from '@/types/dto';

type OrderListPrimaryFieldProps = {
  formControlProps: IFormControlInputProps<ISearchOrderFilter>;
  emptyFormValues: ISearchOrderFilter;
} & ReturnType<typeof useAnchorElement>;

export const OrderListPrimaryField: FC<OrderListPrimaryFieldProps> = (props) => {
  const { formControlProps, emptyFormValues, open } = props;
  const translate = useTranslate();
  const fieldRef = useRef<HTMLDivElement>(null);

  const ResetButton = (
    <IconButtonWithToolTip
      title={translate.buttons.reset()}
      onClick={() => formControlProps.reset(emptyFormValues)}
      color="inherit"
      size="small"
    >
      <CloseIcon />
    </IconButtonWithToolTip>
  );

  return (
    <StyledOrderListPrimaryField ref={fieldRef} direction="row" spacing={0}>
      <MyFormTextField
        name="patientName"
        control={formControlProps.control}
        MyTextFieldProps={{
          placeholder: translate.resources.order.patient.fullname.long(),
          fullWidth: true,
          size: 'small',
          onKeyDown: formControlProps.onKeyDown,
          onFocus: (e) => open(e, fieldRef.current),
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <MyFormTextField
        name="pidSuffix"
        control={formControlProps.control}
        MyTextFieldProps={{
          placeholder: translate.resources.order.patient.pid.long(),
          fullWidth: true,
          size: 'small',
          onKeyDown: formControlProps.onKeyDown,
          onFocus: (e) => open(e, fieldRef.current),
          InputProps: {
            endAdornment: <InputAdornment position="end">{ResetButton}</InputAdornment>,
          },
        }}
      />
    </StyledOrderListPrimaryField>
  );
};

/**
 * Styles
 */

const StyledOrderListPrimaryField = styled(Stack)`
  /* margin: ${(props) => props.theme.spacing(0.5)}; */
  .MuiInputBase-input {
    // set this so that the height of input is the same as the Icon Buttons
    padding-top: 6.5px;
    padding-bottom: 6.5px;
  }
  .MuiTextField-root,
  .MuiOutlinedInput-notchedOutline {
    &:first-of-type {
      .MuiOutlinedInput-notchedOutline {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        margin-right: -1px;
        z-index: 2;
      }
    }
    &:last-of-type {
      .MuiOutlinedInput-notchedOutline {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`;
