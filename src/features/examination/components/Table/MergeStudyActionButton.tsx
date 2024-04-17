import React, { FC } from 'react';

import { ItechMergeStudyIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { useMergeStudyButton } from '@/hooks/order/useMergeStudyButton';
import { IOrderDTO } from '@/types/dto';

type MergeStudyActionButtonProps = {
  order?: IOrderDTO;
};
/**
 * Merge study action button
 * Use in examination table action buttons
 */
export const MergeStudyActionButton: FC<MergeStudyActionButtonProps> = ({ order }) => {
  const translate = useTranslate();
  const { buttonIsActive, iconColor, openMergeStudyModal } = useMergeStudyButton(order);

  return (
    <IconButtonWithToolTip
      title={translate.resources.study.mergeStudyInfo()}
      onClick={() => openMergeStudyModal()}
      disabled={!buttonIsActive}
    >
      <TableSVGIcon
        IconComponent={ItechMergeStudyIcon}
        IconComponentProps={{ color: iconColor }}
      />
    </IconButtonWithToolTip>
  );
};
