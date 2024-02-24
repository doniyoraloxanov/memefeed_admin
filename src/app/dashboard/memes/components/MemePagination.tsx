'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function MemePagination({ total }: { total: number }) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  return (
    <Pagination
      page={page}
      count={Math.ceil(total / 3)}
      renderItem={(item: any) => (
        <PaginationItem component={Link} href={`/dashboard/memes?page=${item.page}`} {...item} />
      )}
    />
  );
}

export default MemePagination;
