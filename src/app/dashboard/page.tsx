import { prisma } from '../lib/prisma';
import StatisticsPage from './components/Statistics';

// ----------------------------------------------------------------------

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'MemeProf | Statistics overview',
};

export default async function Page() {
  const totalUsers = await prisma.user.count();
  const totalInvitations = await prisma.user.count({ where: { referredById: { not: null } } });
  const totalPoints = await prisma.point.aggregate({ _sum: { amount: true } });

  return (
    <StatisticsPage
      totalUsers={totalUsers}
      totalInvitations={totalInvitations ?? 0}
      totalPoints={totalPoints._sum.amount ?? 0}
    />
  );
}
