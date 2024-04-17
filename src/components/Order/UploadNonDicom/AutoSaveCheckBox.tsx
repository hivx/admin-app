import { FormControlLabel } from '@mui/material';
import React from 'react';

import { MyCheckbox } from '@/components';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectToggleAutoSaveNonDicom,
  toggleAutoSaveNonDicom,
} from '@/stores/OrderRadiology';

/**
 * Toggle automatic uploadNonDicom
 */
const AutoSaveCheckBox = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  /**
   * Get state auto save from store display UI check/uncheck
   * True - checked
   * False - uncheck
   */
  const isAutoSave = useAppSelector(selectToggleAutoSaveNonDicom);
  return (
    <FormControlLabel
      control={
        <MyCheckbox
          checked={isAutoSave}
          /**
           * Set state auto save true/false
           */
          onChange={() => dispatch(toggleAutoSaveNonDicom())}
        />
      }
      label={translate.pages.orderReport.media.autoSaveImage()}
    />
  );
};

export default AutoSaveCheckBox;
