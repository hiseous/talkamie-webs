'use client';

import { useUserProfile } from "@repo/ui/components/user-profile-provider/useUserProfile";
import UserProfilePage from "@repo/ui/components/user-profile/UserProfilePage";

export default function Page(){
  const context = useUserProfile();

  return (
    <>
      {
        context ?
        <UserProfilePage
          context={context}
        /> :
        <></>
      }
    </>
  )
}