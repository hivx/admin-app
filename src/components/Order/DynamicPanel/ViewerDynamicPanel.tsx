import { Box } from '@mui/material';
import React, { FC } from 'react';

import { ViewerFromOrderID } from '@/features/viewer';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

type ViewerDynamicPanelProps = {
  order?: IOrderDTO;
};
export const ViewerDynamicPanel: FC<ViewerDynamicPanelProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  return order?.study ? (
    <ViewerFromOrderID orderIDs={[order.id]} />
  ) : (
    <Box
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      display="flex"
    >
      {translate.messages.notification.noStudyInOrder()}
    </Box>
  );
};
