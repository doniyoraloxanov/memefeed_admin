import { NextRequest } from 'next/server';

import { serialize } from 'src/utils/helpers';

import { prisma } from 'src/app/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const singleverification = await prisma.verification.findUnique({
      where: {
        id: params.id,
      },

      select: {
        title: true,
        description: true,
        shortDescription: true,
        rewardAmount: true,
        icon: true,
        payload: true,
        url: true,
      },
    });

    return Response.json(serialize(singleverification ?? {}), { status: 200 });
  } catch (error) {
    console.error('error fetching user', error);

    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
