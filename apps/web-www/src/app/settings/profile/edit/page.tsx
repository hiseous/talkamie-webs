import EditAccountProfile from "@repo/ui/components/account/EditAccountProfile";
import HeadingAndBackButtonVar1 from "@repo/ui/components/heading/HeadingAndBackButtonVar1";

export default function Page(){
  return (
    <>
      <HeadingAndBackButtonVar1>
          Edit Profile
      </HeadingAndBackButtonVar1>
      <EditAccountProfile className="mt-4" />
    </>
  )
}