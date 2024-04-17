import FolderIcon from '@mui/icons-material/Folder';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import MailIcon from '@mui/icons-material/Mail';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { MyTreeView } from '../DataDisplay';

const trees = [
  {
    MyTreeItemProps: {
      nodeId: 'MR',
      label: 'MR',
      ContentProps: {
        labelCollapsedIcon: <FolderIcon />,
        labelExpandedIcon: <FolderCopyIcon />,
        handleExpansionClick: (expanded: boolean, nodeId: string) => {},
      },
    },
    children: [
      {
        MyTreeItemProps: {
          nodeId: 'MR1',
          label: 'MRI1 - 1.5',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'MR2',
          label: 'MRI2 - 3.0',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
    ],
  },

  {
    MyTreeItemProps: {
      nodeId: 'CT',
      label: 'CT',
      ContentProps: {
        labelCollapsedIcon: <FolderIcon />,
        labelExpandedIcon: <FolderCopyIcon />,
      },
    },
    children: [
      {
        MyTreeItemProps: {
          nodeId: 'CT1',
          label: 'CT1 - 128 dãy',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'CT2',
          label: 'CT2 - 2 dãy',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
    ],
  },
  {
    MyTreeItemProps: {
      nodeId: 'DX',
      label: 'DX',
      ContentProps: {
        labelCollapsedIcon: <FolderIcon />,
        labelExpandedIcon: <FolderCopyIcon />,
      },
    },
    children: [
      {
        MyTreeItemProps: {
          nodeId: 'DX1',
          label: 'X-Quang 1',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'DX2',
          label: 'X-Quang 2',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'DX3',
          label: 'X-Quang 3',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'DX3',
          label: 'X-Quang 3',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'DX4',
          label: 'X-Quang 4',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'DX5',
          label: 'X-Quang 5',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
      {
        MyTreeItemProps: {
          nodeId: 'DX6',
          label: 'X-Quang 6',
          ContentProps: {
            labelIcon: <MailIcon />,
          },
        },
      },
    ],
  },
];

export default {
  title: 'DataDisplay/MyTreeView',
  component: MyTreeView,
} as ComponentMeta<typeof MyTreeView>;

const Template: ComponentStory<typeof MyTreeView> = (args) => (
  <MyTreeView aria-label="file system navigator" {...args} trees={trees}></MyTreeView>
);

// This is just an example for demonstrating of passing functions to TreeView
// No matter what func does, as long as its signature is compliant to MUI API.
const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {};

const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {};

export const Explorer = Template.bind({});
Explorer.args = {
  multiSelect: true,
  onNodeToggle: handleToggle,
  onNodeSelect: handleSelect,
};
