'use client';

import { TableProps } from 'antd';

import { Employee } from '@/models/employee';
import CellEmployee from '../cells/CellEmployee';

const columnEmployee = () => {
  const columns: TableProps<Employee>['columns'] = [
    {
      width: 150,
      title: 'Information Main',
      dataIndex: 'name',
      key: crypto.randomUUID(),
      render: (text, record) => <CellEmployee record={record} />,
    },
    {
      width: 150,
      title: 'Salary',
      dataIndex: 'monthlySalary',
      key: crypto.randomUUID(),
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
      key: crypto.randomUUID(),
      render: (text) => (
        <div className={`flex w-full flex-col flex-wrap`}>
          <span>{text}</span>
        </div>
      ),
    },
    {
      width: 150,
      title: 'Entry Date',
      dataIndex: 'entryDate',
      key: crypto.randomUUID(),
      render: (text) => (
        <div className={`flex w-full flex-col flex-wrap`}>
          <span>{text}</span>
        </div>
      ),
    },
  ];
  return columns;
};

export default columnEmployee;
