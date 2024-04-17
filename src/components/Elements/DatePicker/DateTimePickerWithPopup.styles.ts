import { styled } from '@mui/material';

/**
 * Wrapper Date,DateTime,Time picker with popup
 */
export const StyledDateTimePickerWithPopup = styled('div')`
  .MuiTextField-root {
    width: 100%;
    height: 100%;
    & > .MuiInputBase-root {
      background-color: ${(props) => props.theme.palette.background.default};
      & > .MuiInputBase-input.Mui-disabled {
        background-color: ${(props) =>
          props.theme?.pacs?.customColors.fieldDisabledBackground};
        -webkit-text-fill-color: ${(props) => props.theme.palette.text.primary};
      }
      &:hover {
        & > .MuiOutlinedInput-notchedOutline {
          border-color: ${(props) => props.theme.palette.primary.main};
        }
        & > .MuiInputAdornment-root .MuiSvgIcon-root,
        .MuiAutocomplete-endAdornment .MuiSvgIcon-root {
          color: ${(props) => props.theme.palette.primary.main};
        }
      }
    }
    & > .MuiInputBase-root.Mui-disabled {
      padding-right: 0;

      & > .MuiInputAdornment-root {
        background-color: ${(props) =>
          props.theme?.pacs?.customColors.fieldDisabledBackground};
        -webkit-text-fill-color: ${(props) => props.theme.palette.text.primary};
        height: 100%;
        padding: ${(props) => props.theme.spacing(2.5)};
        margin-left: 0;
      }
    }
    .MuiInputBase-multiline.Mui-disabled {
      padding: 0;
      > textarea {
        padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
      }
    }
  }
`;
