'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from 'src/app/lib/prisma';
import { VerificationData } from 'src/app/constants';

export async function updateVerificationAction(data: VerificationData) {
  const updatederification = await prisma.verification.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      shortDescription: data.shortDescription,
      rewardAmount: data.rewardAmount,
      icon: data.icon,
      url: data.url,
      payload: data.payload,
    },
  });

  revalidatePath('/dashboard/verification');
  return updatederification;
}

export async function updateIsCompletedAction(isCompleted: boolean, id: string) {
  const updatedisCompleted = await prisma.verification.update({
    where: {
      id,
    },

    data: {
      isCompleted,
    },
  });

  revalidatePath('/dashboard/verification');
  return updatedisCompleted;
}
