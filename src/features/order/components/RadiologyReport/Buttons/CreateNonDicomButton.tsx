import { FC, ComponentProps } from 'react';

import { ItechTakePictureIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';

const CreateNonDicomButton: FC<ComponentProps<typeof IconButtonWithToolTip>> = (
  props,
) => {
  const translate = useTranslate();
  return (
    <IconButtonWithToolTip
      title={translate.buttons.labelWithKeyBind({
        buttonName: translate.buttons.takePicture(),
        key: HOTKEYS.TAKE_IMAGE_DICOM.title,
      })}
      color="inherit"
      {...props}
    >
      <ItechTakePictureIcon color="inherit" />
    </IconButtonWithToolTip>
  );
};

export default CreateNonDicomButton;
