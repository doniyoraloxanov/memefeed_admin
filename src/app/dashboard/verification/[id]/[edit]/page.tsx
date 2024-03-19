import { prisma } from 'src/app/lib/prisma';
import VerificationEditView from 'src/app/dashboard/verification/components/verification-edit-view';

export const metadata = {
  title: 'Dashboard | Verification Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default async function VerificationEditPage({ params }: Props) {
  const { id } = params;

  const currentVerification = await prisma.verification.findUnique({
    where: {
      id,
    },
  });

  return <VerificationEditView currentVerification={currentVerification as any} />;
}
