import { ItechEditFolderIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';

import { useEditFolderButton } from '../../../../features/order/hooks/useEditFolderButton';

const EditBookmarkFolderButton = () => {
  const translate = useTranslate();
  const { handleClickOpenEditBookmarkFolder } = useEditFolderButton();
  return (
    <IconButtonWithToolTip
      title={translate.bookmark.editFolder()}
      onClick={handleClickOpenEditBookmarkFolder}
    >
      <TableSVGIcon
        IconComponent={ItechEditFolderIcon}
        IconComponentProps={{ color: 'action' }}
      />
    </IconButtonWithToolTip>
  );
};

export default EditBookmarkFolderButton;
