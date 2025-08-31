import SupportMessagesPage from "@repo/ui/components/support-messages/SupportMessagesPage";
import DocWrapperVar1 from "@repo/ui/components/wrapper/DocWrapperVar1";

export default function Page(){
  return (
    <>
      <DocWrapperVar1 className="h-full">
        <SupportMessagesPage />
      </DocWrapperVar1>
    </>
  )
}