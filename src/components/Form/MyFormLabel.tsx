import { FormControl, InputLabel, InputLabelProps, styled } from '@mui/material';
import { FC } from 'react';
import { FieldValues } from 'react-hook-form';

import { filterTransientProps } from '@/utils/filterTransientProps';

export type MyFormLabelProps<T extends FieldValues> = {
  children?: React.ReactNode;
  label?: string;
  /**
   * Input has content
   */
  isFilled: boolean;
  /**
   * Input is focused
   */
  focused: boolean;
  /**
   * Always shrink label instead of waiting for the form to be focused
   */
  alwaysShrinkLabel?: boolean;
  /**
   * InputLabelProps
   */
  InputLabelProps?: Partial<InputLabelProps>;
};

/**
 * @Hoang This is custom label like MUI
 * @param props
 * @returns
 */
export const MyFormLabel = <T extends FieldValues>(props: MyFormLabelProps<T>) => {
  const shouldShrinkLabel = props.focused || props.isFilled || props.alwaysShrinkLabel;
  return (
    <StyledEditorForm
      fullWidth
      $focused={props.focused}
      $error={props.InputLabelProps?.error}
    >
      <StyledInputLabel
        focused={props.focused}
        shrink={shouldShrinkLabel}
        size="small"
        {...props.InputLabelProps}
      >
        {props.label ?? ''}
      </StyledInputLabel>
      {/* <Input sx={{ display: 'none' }} value={props.inputValue}></Input> */}
      {props.children}
      <NotchedOutline
        label={props.label}
        notched={shouldShrinkLabel}
        focused={props.focused}
        error={props.InputLabelProps?.error}
      />
    </StyledEditorForm>
  );
};

const NotchedOutline: FC<{
  label?: string;
  notched?: boolean;
  focused?: boolean;
  error?: boolean;
}> = (props) => (
  <StyledFieldSet
    $notched={props.notched ?? false}
    $focused={props.focused ?? false}
    $error={props.error}
  >
    {props.label ? <legend>{props.label}</legend> : <></>}
  </StyledFieldSet>
);

const StyledEditorForm = styled(FormControl, filterTransientProps)<{
  $focused?: boolean;
  $error?: boolean;
}>`
  position: relative;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.palette.common.white};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};

  &:hover {
    & > fieldset {
      border-color: ${(props) => {
        if (props.$error) {
          return props.theme.palette.error.main;
        }
        return !props.$focused && props.theme.pacs?.customColors.notchedOutlineInputColor;
      }};
    }
  }
`;

const StyledInputLabel = styled(InputLabel)`
  background-color: transparent;
  z-index: 2; // to make Label float above toolbar
`;

const StyledFieldSet = styled('fieldset', filterTransientProps)<{
  $notched: boolean;
  $focused: boolean;
  $error?: boolean;
}>`
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 0;
  top: -5px;
  left: 0;
  margin: 0;
  padding: 0px 8px;
  pointer-events: none;
  border-style: solid;
  border-width: ${(props) => (props.$focused ? '2px' : '1px')};
  overflow: hidden;
  min-width: 0%;
  border-color: ${(props) => {
    if (props.$error) {
      return props.theme.palette.error.main;
    }
    return props.$focused ? props.theme.palette.primary.main : 'rgba(0, 0, 0, 0.23)';
  }};
  border-radius: ${(props) => props.theme.pacs?.layout.borderRadius};
  z-index: ${(props) => props.theme.zIndex.appBar};
  legend {
    float: unset;
    width: auto;
    overflow: hidden;
    display: block;
    padding: ${(props) => (props.$notched ? `0 5px` : '0')};
    height: 11px;
    font-size: 0.75em;
    visibility: hidden;
    max-width: ${(props) => (props.$notched ? `100%` : '0.01px')};
    -webkit-transition: max-width 50ms;
    transition: max-width 50ms;
    white-space: nowrap;
  }
`;
