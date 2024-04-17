import { FormControlLabel } from '@mui/material';
import React from 'react';

import { MyCheckbox } from '@/components';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import {
  selectToggleCreateNewSeries,
  toggleCreateNewSeries,
} from '@/stores/OrderRadiology';

/**
 * Toggle mode create new series when uploadNonDicom
 */
const CreateNewSeriesCheckBox = () => {
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  /**
   * Get state create new series from store display UI check/uncheck
   * True - create new series
   * False - uncheck
   */
  const isCreateNewSeries = useAppSelector(selectToggleCreateNewSeries);
  return (
    <FormControlLabel
      control={
        <MyCheckbox
          checked={isCreateNewSeries}
          /**
           * Set state create new series true/false
           */
          onChange={() => dispatch(toggleCreateNewSeries())}
        />
      }
      label={translate.pages.orderReport.media.createNewSeries()}
    />
  );
};

export default CreateNewSeriesCheckBox;
