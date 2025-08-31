'use client';

import { useChatLayout } from "@repo/ui/components/chat-layout-provider/useChatLayout";
import ChatPage from "@repo/ui/components/chat/ChatPage";
import DocWrapperVar1 from "@repo/ui/components/wrapper/DocWrapperVar1";

export default function Page(){
  const layout = useChatLayout();

  return (
    <>
      {
        layout?.data?.id ?
        <DocWrapperVar1 className="h-full">
          <ChatPage
            data={layout.data}
          />
        </DocWrapperVar1> : <></>
      }
    </>
  )
}