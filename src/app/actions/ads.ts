'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from 'src/app/lib/prisma';

export async function deleteAds(id: string) {
  await await prisma.ads.delete({
    where: {
      id,
    },
  });
  revalidatePath('/dashboard/ads');
}

// eslint-disable-next-line consistent-return
export async function createAds(title: string, description: string, imageUrl: string, url: string) {
  try {
    const ads = await prisma.ads.create({
      data: {
        title,
        url,
        description,
        imageUrl: `${process.env
          .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/${imageUrl}`,
      },
    });

    revalidatePath('/dashboard/ads');
    return ads;
  } catch (e) {
    console.error('Error occured while creating ads🥲', e);
  }
}
