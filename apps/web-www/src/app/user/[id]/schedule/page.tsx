'use client';

import ScheduleUserPage from "@repo/ui/components/schedule-user/ScheduleUserPage";
import { useUserProfile } from "@repo/ui/components/user-profile-provider/useUserProfile";

export default function Page(){
  const context = useUserProfile();

  return (
    <>
      {
        context ?
        <ScheduleUserPage
          context={context}
        /> :
        <></>
      }
    </>
  )
}