import AdsView from 'src/sections/ads/view/ads-view-list';

import { prisma } from '../../lib/prisma';

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
  const total = await prisma.ad.count();
  const ads = await prisma.ad.findMany({
    take: searchParams.pageSize ? Number(searchParams.pageSize) : 10,
    skip: searchParams.page ? Number(searchParams.page) * Number(searchParams.pageSize) : 0,
  });

  return <AdsView ads={ads} total={total} />;
}
