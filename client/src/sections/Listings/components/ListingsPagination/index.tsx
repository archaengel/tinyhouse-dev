import React from 'react';
import { Pagination } from 'antd';

interface Props {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

export const ListingsPagination = ({ total, page, limit, setPage }: Props) => {
  return (
    <Pagination
      total={total}
      current={page}
      onChange={setPage}
      defaultPageSize={limit}
      hideOnSinglePage={true}
      showLessItems={true}
      className="listings-pagination"
    />
  );
};
