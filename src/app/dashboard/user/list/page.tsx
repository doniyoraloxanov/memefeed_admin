import UserListView from 'src/sections/user/view/user-view-list';

import { prisma } from '../../../lib/prisma';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: One',
};

export default async function Page() {
  const users = await prisma.user.findMany();
  console.log('users', users);

  return <UserListView users={users} />;
}
