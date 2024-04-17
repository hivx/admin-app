import { ComponentProps, FC, ReactNode } from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useTranslate } from '@/hooks';
import { useQuickPrintReportButton } from '@/hooks/order/useQuickPrintReportButton';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
import { IRenderActionButton } from '@/types/order/buttons';

type QuickPrintRadiologyButtonProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  IconComponent?: ReactNode;
  renderButton: IRenderActionButton;
} & ComponentProps<typeof IconButtonWithToolTip>;

/**
 * Nút in kết quả đã duyệt
 */
const QuickPrintRadiologyButton: FC<QuickPrintRadiologyButtonProps> = (props) => {
  const { order, renderButton, request } = props;
  const translate = useTranslate();

  const { onClick: quickPrintReport, buttonState } = useQuickPrintReportButton(
    order,
    request,
  );
  /**
   * Check status button using for active/inactive
   */
  const isActive = buttonState === BUTTON_STATE.ACTIVE;

  return renderButton({
    onClick: () => {
      quickPrintReport();
    },
    title: translate.buttons.printRadiologyReport(),
    disabled: !isActive,
  });
};

export default QuickPrintRadiologyButton;
