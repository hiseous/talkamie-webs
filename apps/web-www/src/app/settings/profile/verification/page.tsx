import AccountProfileVerification from "@repo/ui/components/account/AccountProfileVerification";
import HeadingAndBackButtonVar1 from "@repo/ui/components/heading/HeadingAndBackButtonVar1";

export default function Page(){
  return (
    <>
      <HeadingAndBackButtonVar1>
          Verification
      </HeadingAndBackButtonVar1>
      <AccountProfileVerification className="mt-4 max-w-[800px]" />
    </>
  )
}