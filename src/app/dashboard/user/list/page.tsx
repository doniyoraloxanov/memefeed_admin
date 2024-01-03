import UserListView from 'src/sections/user/view/user-view-list';

import { prisma } from '../../../lib/prisma';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Toylist | User overview',
};

export default async function Page() {
  const users = await prisma.user.findMany();

  return <UserListView users={users} />;
}
