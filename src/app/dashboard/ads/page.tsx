import { prisma } from 'src/app/lib/prisma';
import AdsListView from 'src/app/dashboard/ads/components/ads-view-list';

export const metadata = {
  title: 'MemeProf | Ads overview',
};

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const total = await prisma.ads.count();
  const ads = await prisma.ads.findMany({
    take: searchParams.pageSize ? Number(searchParams.pageSize) : 10,
    skip: searchParams.page ? Number(searchParams.page) * Number(searchParams.pageSize) : 0,
  });

  return <AdsListView ads={ads} total={total} />;
}
