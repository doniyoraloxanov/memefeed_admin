import { prisma } from 'src/app/lib/prisma';
import VerificationsListView from 'src/app/dashboard/verification/components/verification-view-list';

export const metadata = {
  title: 'MemeProf | Verifications overview',
};

export const dynamic = 'force-dynamic';

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const total = await prisma.verification.count();
  const verifications = await prisma.verification.findMany({
    take: searchParams.pageSize ? Number(searchParams.pageSize) : 10,
    skip: searchParams.page ? Number(searchParams.page) * Number(searchParams.pageSize) : 0,
  });

  return <VerificationsListView verifications={verifications} total={total} />;
}
