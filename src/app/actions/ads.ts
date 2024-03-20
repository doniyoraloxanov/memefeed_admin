'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from 'src/app/lib/prisma';
import { AdsData } from 'src/app/constants';

export async function createAdsAction(data: AdsData, imageUrl: string) {
  const ads = await prisma.ads.create({
    data: {
      title: data.title,
      url: data.url,
      description: data.description,
      imageUrl: `${process.env
        .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/${imageUrl}`,
    },
  });

  revalidatePath('/dashboard/ads');
  return ads;
}

export async function deleteAdsAction(id: string) {
  await prisma.ads.delete({
    where: {
      id,
    },
  });
  revalidatePath('/dashboard/ads');
}
