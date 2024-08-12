"use client";

import { useChat } from "ai/react";

const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const {} = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
  });

  return <div className="replative min-h-full bg-zinc-900">ChatWrapper</div>;
};
export default ChatWrapper;
