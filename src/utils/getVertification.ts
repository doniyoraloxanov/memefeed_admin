import useSWR from 'swr';
import { Prisma } from '@prisma/client';

import { fetcher } from './fetcher';

function UseVertification(id?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/verification/${id}` : undefined,
    fetcher
  );

  return {
    vertification: data as Prisma.VerificationGetPayload<{}>,
    isLoading,
    isError: error,
    mutate,
  };
}

export { UseVertification };
