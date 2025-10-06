'use client';

import { TableProps } from 'antd';
import dayjs from 'dayjs';


import { Employee } from '@/models/employee';
import CellEmployee from '../cells/CellEmployee';
import ActionEmployee from '../actions/ActionEmployee';
import { reformedQueryDate } from '@/utils/datetime';

const columnEmployee = () => {
  const columns: TableProps<Employee>['columns'] = [
    {
      width: 150,
      title: 'Information Main',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <CellEmployee record={record} />,
    },
    {
      width: 150,
      title: 'Salary',
      dataIndex: 'monthlySalary',
      key: 'monthlySalary',
      render: (text) => (
        <div className={`flex w-full flex-col flex-wrap`}>
          <span>{text} $</span>
        </div>
      ),
    },
    {
      width: 150,
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (text) => (
        <div className={`flex capitalize w-full flex-col flex-wrap`}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      width: 150,
      title: 'Entry Date',
      dataIndex: 'entryDate',
      key: 'entryDate',
      render: (text) => (
        <div className={`flex w-full flex-col flex-wrap`}>
          <span>{`${dayjs(reformedQueryDate(text), 'YYYY-MM-DD')}`}</span>
        </div>
      ),
    },
    {
      width: 150,
      title: 'Actions',
      key: crypto.randomUUID(),
      render: (text, record) => (
        <ActionEmployee record={record} />
      ),
    },
  ];
  return columns;
};

export default columnEmployee;
