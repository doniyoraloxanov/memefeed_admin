'use server';

import { prisma } from '../../app/lib/prisma';

export const deleteAd = async (id: string) => {
  const ad = await prisma.ad.delete({
    where: {
      id,
    },
  });

  return ad;
};
