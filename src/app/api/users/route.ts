import { prisma } from 'src/app/lib/prisma';

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({});
    return Response.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
