<<<<<<< HEAD
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
=======
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
>>>>>>> 6af2646fbb213fe89972d621bf688698ea541a09
