import { ComponentStory, ComponentMeta } from '@storybook/react';

import ItechFolderIcon from '@/assets/icon/FolderIcon';
import ItechItemIcon from '@/assets/icon/ItemIcon';
import ItechPrintApproveIcon from '@/assets/icon/PrintApproveIcon';
import ItechPrintImageIcon from '@/assets/icon/PrintImageIcon';
import ItechSaveIcon from '@/assets/icon/SaveIcon';
import ItechSelectTemplateIcon from '@/assets/icon/SelectTemplateIcon';
import ItechViewImageIcon from '@/assets/icon/ViewImageIcon';

import { MyIcon } from '../Icons/MyIcon';

export default {
  title: 'Icons/MyIcon',
  component: MyIcon,
  argTypes: {},
} as ComponentMeta<typeof MyIcon>;

export const PrintImageIcon: ComponentStory<typeof MyIcon> = (args) => {
  return (
    <MyIcon {...args} width="100px" height="100px">
      <ItechPrintImageIcon />
    </MyIcon>
  );
};

export const ViewImageIcon: ComponentStory<typeof MyIcon> = (args) => {
  return (
    <MyIcon {...args} width="50px" height="50px">
      <ItechViewImageIcon fill="red" />
    </MyIcon>
  );
};

export const SelectTemplateIcon: ComponentStory<typeof MyIcon> = (args) => {
  return (
    <MyIcon {...args} width="20px" height="=20px">
      <ItechSelectTemplateIcon />
    </MyIcon>
  );
};

export const SaveIcon: ComponentStory<typeof MyIcon> = (args) => {
  return (
    <MyIcon {...args} width="100px" height="100px">
      <ItechSaveIcon fill="blue" />
    </MyIcon>
  );
};

export const ItemIcon: ComponentStory<typeof MyIcon> = (args) => {
  return (
    <MyIcon {...args}>
      <ItechItemIcon fill="red" />
    </MyIcon>
  );
};

export const Folder: ComponentStory<typeof MyIcon> = (args) => {
  return (
    <MyIcon {...args}>
      <ItechFolderIcon />
    </MyIcon>
  );
};
