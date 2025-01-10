import React, { createContext, useContext, useEffect, useState } from 'react';


// WebSocket message interface for received messages
interface WebSocketMessage {
  type:string
  // Message will contain a content key with a JSON object value
  content: {
    [key: string]: any; // Allow any JSON object structure
  };
}

// Interface for outgoing move messages 
interface MoveMessage {
  action: string;
  Message: object;
}

// Create a WebSocket context with proper typing
const WebSocketContext = createContext<{
  sendMessage: (message: MoveMessage) => void;
  draftMessage: (message: MoveMessage) => void;
  sendDraft: () => void;
  messages: WebSocketMessage[];
  draft: MoveMessage | null;
} | null>(null);

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [draft, setDraft] = useState<MoveMessage | null>(null);


  useEffect(() => {
    // Replace with your AWS API Gateway WebSocket URL
    const ws = new WebSocket('wss://dgu6c735ck.execute-api.us-east-1.amazonaws.com/production/');

    ws.onopen = () => {

      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log('Message received:', event.data);
      try {
        const parsedData: WebSocketMessage = JSON.parse(event.data);
        setMessages([parsedData]); // Only keep latest message
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onclose = () => {

      console.log('WebSocket disconnected');
      setSocket(null);
    };

    ws.onerror = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    }; // Cleanup on component unmount
  }, []);

  const sendMessage = (message: MoveMessage): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log('Sending message:', message);
      socket.send(JSON.stringify(message));
    } 
  };

  const draftMessage = (message: MoveMessage): void => {
    setDraft(message);
  };

  const sendDraft = (): void => {
    if (draft) {
      sendMessage(draft);
      setDraft(null); 
    } else {
      console.error('No draft message available');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, draftMessage, sendDraft, messages, draft }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
