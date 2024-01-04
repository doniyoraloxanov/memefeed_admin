import { prisma } from 'src/app/lib/prisma';
import Invitation from 'src/sections/invitation/invitation';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Toylist | Invitation overview',
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const invitations = await prisma.invitation.findMany({
    include: {
      _count: {
        select: {
          usersJoined: true,
        },
      },
    },
  });

  return <Invitation data={invitations} />;
}
