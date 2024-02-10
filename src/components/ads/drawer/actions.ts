'use server';

import { prisma } from '../../../app/lib/prisma';

export const createAd = async (data: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}) => {
  const add = await prisma.ad.create({
    data: {
      title: data.title,
      description: data.description,
      url: data.url,
      imageUrl: data.imageUrl,
    },
  });
  return add;
};
