'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '../../app/lib/prisma';

export const deleteAd = async (id: string) => {
  const ad = await prisma.ad.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/ads/');

  return ad;
};
