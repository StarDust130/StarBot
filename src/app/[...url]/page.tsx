import { ragChat } from "@/lib/rag-chat";
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
  console.log(params);

  await ragChat.context.add({
    type: "html",
    source: reconstructedUrl,
    config: { chunkOverlap: 50, chunkSize: 200 },
  });

  return <div>Page: {params.url}</div>;
};

export default Page;
