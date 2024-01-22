import { User } from '@prisma/client';
import { prisma } from 'src/app/lib/prisma';

import ChatView from 'src/sections/chat/view/chat-view';

const page = async () => {
  const users = await prisma.user.findMany();

  return <ChatView users={users} />;
};

export default page;
