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
  messages: WebSocketMessage[];
} | null>(null);

export const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

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
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
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
