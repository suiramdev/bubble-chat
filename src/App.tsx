import React from 'react';
import './App.scss';
import Bubble from './components/Bubble';
import { Client } from 'tmi.js';
import { AnimatePresence } from 'framer-motion';

const channel = 'suiramdev';

interface Message {
  broadcaster: boolean;
  content: string;
}

const App = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [client, setClient] = React.useState<Client>();

  React.useEffect(() => {
    (async () => {
      if (client) {
        await client.disconnect();
      }
    })();

    setClient(new Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [channel],
    }));
  }, []);

  React.useEffect(() => {
    if (!client) return;

    (async () => {
      await client.connect();
      client.removeAllListeners('message');
      client.on('message', (_, tags, message) => {
        setMessages((current) => [
          ...current,
          { broadcaster: tags.username === channel, content: message },
        ]);
        setTimeout(() => {
          setMessages((current) => {
            const n = [...current];
            n.shift();
            return n;
          });
        }, 15000);
      });
    })();
  }, [client])

  return (
    <div className="chat">
      <AnimatePresence>
        {messages.map((message) => (
          <Bubble isSender={message.broadcaster}>{message.content}</Bubble>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default App;