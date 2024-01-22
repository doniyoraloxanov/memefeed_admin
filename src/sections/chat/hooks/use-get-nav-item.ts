import { IChatConversation } from 'src/types/chat';

// ----------------------------------------------------------------------

type Props = {
  currentUserId: string;
  conversation: IChatConversation;
};

export default function useGetNavItem({ currentUserId, conversation }: Props) {
  const { messages, participants } = conversation;

  const participantsInConversation = participants.filter(
    (participant) => participant.id.toString() !== currentUserId
  );

  const lastMessage = messages[messages.length - 1];

  const group = participantsInConversation.length > 1;

  const displayName = participantsInConversation
    .map((participant) => participant.firstName)
    .join(', ');

  const hasOnlineInGroup = group
    ? participantsInConversation.map((item) => item.status).includes('online')
    : false;

  let displayText = '';

  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';

    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;

    displayText = `${sender}${message}`;
  }

  return {
    group,
    displayName,
    displayText,
    participants: participantsInConversation,
    lastActivity: lastMessage?.createdAt,
    hasOnlineInGroup,
  };
}
