import React, { createContext, useContext, useEffect, useState } from "react";

interface WebSocketMessage {
  type: string;
  content: {
    [key: string]: any;
  };
}

interface MoveMessage {
  action: string;
  Message: object;
}

const WebSocketContext = createContext<{
  sendMessage: (message: MoveMessage) => void;
  draftMessage: (message: MoveMessage) => void;
  sendDraft: () => void;
  messages: WebSocketMessage[];
  draft: MoveMessage | null;
} | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [draft, setDraft] = useState<MoveMessage | null>(null);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsedData: WebSocketMessage = JSON.parse(event.data);
        setMessages([parsedData]);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = () => {
      setSocket(null);
    };

    ws.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = (message: MoveMessage): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
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
      console.error("No draft message available");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ sendMessage, draftMessage, sendDraft, messages, draft }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
