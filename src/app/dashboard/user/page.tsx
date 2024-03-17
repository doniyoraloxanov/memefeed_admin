import UserListView from 'src/sections/user/view/user-view-list';

import { prisma } from '../../lib/prisma';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'MemeProf | User overview',
};

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const total = await prisma.user.count();
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { referredUsers: true },
      },
    },

    take: searchParams.pageSize ? Number(searchParams.pageSize) : 10,
    skip: searchParams.page ? Number(searchParams.page) * Number(searchParams.pageSize) : 0,
  });

  return <UserListView users={users} total={total} />;
}
