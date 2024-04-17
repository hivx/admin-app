import { ComponentProps, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import ItechSaveIcon from '@/assets/icon/SaveIcon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { ROUTE_TEMPLATE } from '@/features/contentTemplate';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

type SaveContentTemplateButtonProps = {
  order?: IOrderDTO;
  IconComponent?: ReactNode;
} & ComponentProps<typeof IconButtonWithToolTip>;

export const SaveContentTemplateButton: FC<SaveContentTemplateButtonProps> = (props) => {
  const translate = useTranslate();

  return (
    <Link to={ROUTE_TEMPLATE} target="_itech_template_page">
      <IconButtonWithToolTip title={translate.buttons.saveContentTemplate()} {...props}>
        <ItechSaveIcon />
      </IconButtonWithToolTip>
    </Link>
  );
};
