'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '../../../app/lib/prisma';

const createAd = async (data: {
  title: string;
  description: string;
  url: string;
  status: boolean;
  imageUrl: string;
}) => {
  const add = await prisma.ad.create({
    data: {
      title: data.title,
      description: data.description,
      url: data.url,
      status: data.status,
      imageUrl: data.imageUrl,
    },
  });

  revalidatePath('/dashboard/ads/');

  return add;
};

export { createAd };
