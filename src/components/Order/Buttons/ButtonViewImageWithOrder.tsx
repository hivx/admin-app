import { FC } from 'react';

import ItechViewImageIcon from '@/assets/icon/ViewImageIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

type ViewImageButtonProps = {
  order?: IOrderDTO;
};

export const ButtonViewImageWithOrder: FC<ViewImageButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();

  const { onClick, buttonState } = useButtonImage({ order });

  return (
    <IconButtonWithToolTip
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.buttons.viewImage(),
        key: HOTKEYS.VIEW_IMAGE.title,
      })}
      onClick={() => onClick()}
      disabled={buttonState === BUTTON_STATE.DISABLED}
    >
      <TableSVGIcon IconComponent={ItechViewImageIcon} />
    </IconButtonWithToolTip>
  );
};
