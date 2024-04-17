import React, { FC } from 'react';

import { PenIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useDisclosure, useTranslate } from '@/hooks';
import { IOrderRequestDTO } from '@/types/dto';

import { CreateUpdateConsumableModal } from '../../Consumable/CreateUpdateConsumableModal';

type ConsumableDynamicPanelActionButtonsProps = {
  request?: IOrderRequestDTO;
};

export const ConsumableDynamicPanelActionButtons: FC<
  ConsumableDynamicPanelActionButtonsProps
> = ({ request }) => {
  const translate = useTranslate();
  const disclosure = useDisclosure();

  return (
    <>
      <DynamicPanelHeaderButton
        IconComponent={PenIcon}
        title={translate.buttons.update()}
        onClick={disclosure.open}
        disabled={!request}
      />
      {disclosure.isOpen && (
        <CreateUpdateConsumableModal disclosure={disclosure} request={request} />
      )}
    </>
  );
};
