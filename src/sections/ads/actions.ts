'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '../../app/lib/prisma';

const deleteAd = async (id: string) => {
  const ad = await prisma.ad.delete({
    where: {
      id,
    },
  });

  revalidatePath('/dashboard/ads/');

  return ad;
};

const updateAdStatus = async (id: string, status: boolean) => {
  const ad = await prisma.ad.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  revalidatePath('/dashboard/ads/');

  return ad;
};

export { deleteAd, updateAdStatus };
