import React, { FC } from 'react';

import { ItechCreateFolderIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { useCreateFolderButton } from '../../../../features/order/hooks/useCreateFolderButton';

type CreateBookmarkFolderButtonProps = {
  order?: IOrderDTO;
};

const CreateBookmarkFolderButton: FC<CreateBookmarkFolderButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const { handleClickOpenCreateBookmarkFolder } = useCreateFolderButton();
  return (
    <DynamicPanelHeaderButton
      IconComponent={ItechCreateFolderIcon}
      title={translate.bookmark.createFolder()}
      onClick={handleClickOpenCreateBookmarkFolder}
    />
  );
};

export default CreateBookmarkFolderButton;
