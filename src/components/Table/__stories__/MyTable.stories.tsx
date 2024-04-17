import { Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyButton, MyCheckbox } from '@/components/Elements';

import { ITableField, MyTable } from '../MyTable';

// import { FullPageSpinner } from '../FullPageSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Table/MyTable',
  component: MyTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MyTable>;

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const Template: ComponentStory<typeof MyTable<Person>> = (args) => {
  return <MyTable {...args} />;
};

// const columnHelper = createColumnHelper<Person>();
const tableColumnsDescription: ITableField<Person>[] = [
  {
    type: 'custom',
    getColumnDef: (columnHelper) =>
      columnHelper.display({
        header: 'Custom field (STT)',
        cell: (c) => c.row.index,
      }),
  },
  {
    type: 'custom',
    getColumnDef: (columnHelper) =>
      columnHelper.display({
        header: 'I can display anything',
        cell: (c) => <MyCheckbox onChange={() => {}} />,
      }),
  },
  {
    type: 'record',
    headerLabel: 'First Name',
    name: 'firstName',
    renderCell: (props) => <span>{props.getValue()}</span>,
  },
  {
    type: 'record',
    name: 'lastName',
    headerLabel: 'Last Name',
    renderHeader: (val) => (
      <MyButton variant="contained">My custom {val} component</MyButton>
    ),
  },
  {
    type: 'record',
    name: 'age',
    headerLabel: 'Age',
    renderCell: (val) => (
      <Typography color="red">
        Age: {val.getValue()}. Can access other columns: {val.row.getValue('lastName')}
      </Typography>
    ),
  },
  {
    type: 'record',
    name: 'status',
    headerLabel: 'Status (Minimal configuration)',
  },
];
export const Default = Template.bind({});
Default.args = {
  data: defaultData,
  tableColumnsDescription,
};
