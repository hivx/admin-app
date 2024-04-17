import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';

import { MyDialog } from '../Feedback';

export default {
  title: 'Feedback/MyDialog',
  component: MyDialog,
};

export const SimpleDiaglog = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleDialog = () => {
    setVisible((pre) => !pre);
  };
  return (
    <>
      <Button onClick={toggleDialog} variant="outlined">
        Show
      </Button>
      <MyDialog open={visible}>
        <DialogTitle id="alert-dialog-title">Simple Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Đóng lại đê nhìn cái gì!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Close</Button>
        </DialogActions>
      </MyDialog>
    </>
  );
};
