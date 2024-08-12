import ChatWrapper from "@/components/ChatWrapper";
import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";
import React from "react";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

const reconstructUrl = ({ url }: { url: string[] }) => {
  const dedcodedUrl = url.map((part) => decodeURIComponent(part));

  return dedcodedUrl.join("/");
};

const Page = async ({ params }: PageProps) => {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  const isAlreadyIndexed = await redis.sismember(
    "indexed-urls",
    reconstructedUrl
  );

  const sessionId = "mock-session";

  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reconstructedUrl);
  }
  return <ChatWrapper sessionId={sessionId} />;
};

export default Page;
