import { prisma } from '../lib/prisma';
import StatisticsPage from './components/Statistics';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Toylist | Statistics overview',
};

export default async function Page() {
  const totalUsers = await prisma.user.count();
  const totalInvitations = await prisma.invitation.count();
  const totalPoints = await prisma.point.aggregate({ _sum: { amount: true } });

  return (
    <StatisticsPage
      totalUsers={totalUsers}
      totalInvitations={totalInvitations}
      totalPoints={totalPoints._sum.amount ?? 0}
    />
  );
}
