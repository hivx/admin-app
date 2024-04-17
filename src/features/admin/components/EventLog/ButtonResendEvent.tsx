import React from 'react';

import { ResendIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAppSelector, useTranslate } from '@/hooks';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { RESOURCES } from '@/types/resources';

import { useResendLogButtonState } from '../../hooks/useResendLogButtonState';
import { IEventLogDTO } from '../../types';

/**
 * Nút Gửi lại ở table footer
 */
export const ButtonResendEvent = () => {
  const { handleClickButton } = useResendLogButtonState();
  const record = useAppSelector(getCurrentSelectedRow<IEventLogDTO>(RESOURCES.EVENT_LOG));

  const translate = useTranslate();
  return (
    <IconButtonWithToolTip
      title={translate.resources.eventLog.resend()}
      disabled={!record}
      onClick={() => handleClickButton()}
    >
      <TableSVGIcon
        IconComponent={ResendIcon}
        IconComponentProps={{ color: 'inherit' }}
      />
    </IconButtonWithToolTip>
  );
};
