import React from 'react';
import './App.scss';
import Bubble from './components/Bubble';
import { Client } from 'tmi.js';
import { AnimatePresence } from 'framer-motion';
import parseEmojis from './utils/message';

const channel = 'suiramdev';

interface Message {
  broadcaster: boolean;
  author: string;
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
      client.on('message', (_, tags: any, message) => {
        console.log(tags);
        setMessages((current) => [
          ...current,
          { broadcaster: tags.username === channel, author: tags['display-name'], content: parseEmojis(message, tags.emotes) },
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
          <Bubble content={message.content} author={message.author} isSender={message.broadcaster}/>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default App;