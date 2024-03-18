'use server';

import { prisma } from 'src/app/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateVerification(
  title: string,
  shortDescription: string,
  description: string,
  rewardAmount: number,
  icon: string,
  payload: string,
  url: string
) {
  const updatederification = await prisma.verification.updateMany({
    data: {
      title,
      shortDescription,
      description,
      rewardAmount,
      icon,
      payload,
      url,
    },
  });

  revalidatePath('/dashboard/verification');
  return updatederification;
}
