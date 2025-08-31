'use client';

import { useUserProfile } from "@repo/ui/components/user-profile-provider/useUserProfile";
import UserReviewsPage from "@repo/ui/components/user-reviews/UserReviewsPage";

export default function Page(){
  const context = useUserProfile();

  return (
    <>
      {
        context ?
        <UserReviewsPage
          context={context}
        /> :
        <></>
      }
    </>
  )
}