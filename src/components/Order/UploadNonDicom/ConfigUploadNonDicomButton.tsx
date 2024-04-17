import React, { FC } from 'react';

import { ItechSettingIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useDisclosure, useTranslate } from '@/hooks';

type ConfigUploadNonDicomButtonProps = {
  /**
   * State on/off modal
   */
  disclosure: ReturnType<typeof useDisclosure>;
};
const ConfigUploadNonDicomButton: FC<ConfigUploadNonDicomButtonProps> = (props) => {
  const translate = useTranslate();
  return (
    <IconButtonWithToolTip
      title={translate.pages.orderReport.media.config.title()}
      onClick={props.disclosure.open}
    >
      <TableSVGIcon
        IconComponent={ItechSettingIcon}
        IconComponentProps={{ color: 'action' }}
      />
    </IconButtonWithToolTip>
  );
};

export default ConfigUploadNonDicomButton;
