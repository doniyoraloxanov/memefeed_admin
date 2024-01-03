'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from 'src/app/lib/prisma';
import { InvitationFormValues } from './constants';

export const createInvitationAction = async (invitationFormValues: InvitationFormValues) => {
  const { source, rewardAmount, comment } = invitationFormValues;

  const createdInvitation = await prisma.invitation.create({
    data: {
      id: source,
      rewardAmount,
      comment,
      link: `https://t.me/toylistbot?start=${source}`,
    },
  });

  revalidatePath('/dashboard/invitations');

  return createdInvitation;
};

export const removeInvitationAction = async (invitationId: string) => {
  const deletedInvitation = await prisma.invitation.delete({
    where: {
      id: invitationId,
    },
  });

  revalidatePath('/dashboard/invitations');

  return deletedInvitation;
};
