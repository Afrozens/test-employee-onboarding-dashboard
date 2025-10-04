'use client';

import { PropsWithChildren } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';

import { Paginate } from '@/models/common';
import usePaginate from '@/hooks/usePaginate';

interface Props {
  columns: ColumnsType<any>;
  classService: (
    page?: number,
    limit?: number,
    filter?: string,
    option?: string,
  ) => Promise<Paginate<any>>;
  name?: string;
  filter?: string;
  option?: string;
  withCache?: boolean;
}

const TemplateDatatable = ({
  columns,
  classService,
  name,
  filter,
  option,
  withCache = true,
}: Props) => {
  const { currentPage, handlePage } = usePaginate();

  const { data, isLoading } = useQuery({
    queryKey: [`paginate-${name}`, filter, currentPage, option],
    queryFn: async () => {
        const data = await classService(
          currentPage,
          10,
          filter?.toLowerCase(),
          option,
        );
        return data;
    },
    staleTime: withCache ? 100 * 60 : 0,
    gcTime: withCache ? 100 * 60 : 0,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="w-full truncate p-4 md:p-10">
      <Table
        scroll={{ x: 500 }}
        className="my-10"
        columns={columns}
        loading={isLoading}
        pagination={{
          position: ['none', 'bottomCenter'],
          onChange(page) {
            handlePage(page);
          },
          pageSize: data?.pageSize,
          total: data?.totalRecord,
          current: data?.pageNumber,
        }}
        dataSource={data?.data}
        rowKey={crypto.randomUUID()}
        key={crypto.randomUUID()}
      />
    </div>
  );
};

export default TemplateDatatable;
