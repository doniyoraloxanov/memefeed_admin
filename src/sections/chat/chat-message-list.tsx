import Box from '@mui/material/Box';

import Lightbox, { useLightBox } from 'src/components/lightbox';
import Scrollbar from 'src/components/scrollbar';

import { IChatMessage } from 'src/types/chat';

import { User } from '@prisma/client';
import ChatMessageItem from './chat-message-item';
import { useMessagesScroll } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  messages: IChatMessage[];
  participants: User[];
};

export default function ChatMessageList({ messages = [], participants }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
              onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
      </Scrollbar>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}
