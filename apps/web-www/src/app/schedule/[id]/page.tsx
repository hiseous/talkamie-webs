'use client';

import { useScheduleLayout } from "@repo/ui/components/schedule-layout-provider/useScheduleLayout";
import SchedulePage from "@repo/ui/components/schedule/SchedulePage";

export default function Page(){
  const layout = useScheduleLayout();

  return (
    <>
      {
        layout?.data?.id ?
        <>
          <SchedulePage
            data={layout.data}
          />
        </> : <></>
      }
    </>
  )
}