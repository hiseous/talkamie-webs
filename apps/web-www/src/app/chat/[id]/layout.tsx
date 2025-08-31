import { ChatLayoutProvider } from "@repo/ui/components/chat-layout-provider/ChatLayoutProvider";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps){
  return (
    <>
      <ChatLayoutProvider>
        {props.children}
      </ChatLayoutProvider>
    </>
  )
}