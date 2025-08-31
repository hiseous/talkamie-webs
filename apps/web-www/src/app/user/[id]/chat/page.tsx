'use client';

import ChatPage from "@repo/ui/components/chat/ChatPage";
import { useUserProfile } from "@repo/ui/components/user-profile-provider/useUserProfile";

export default function Page(){
  const user = useUserProfile();

  return (
    <>
      {
        user?.data?.id ?
        <>
          <ChatPage
            data={{
              ...user.data.viewer?.chat,
              user: user.data,
            }}
            updateChat={(chatProps) => {
              user.updateUser({
                ...user.data,
                viewer: {
                  ...user.data?.viewer,
                  chat: {
                    ...user.data?.viewer?.chat,
                    ...chatProps,
                  },
                },
              });
            }}
          />
        </> : <></>
      }
    </>
  )
}