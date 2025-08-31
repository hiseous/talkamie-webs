import { ScheduleLayoutProvider } from "@repo/ui/components/schedule-layout-provider/ScheduleLayoutProvider";
import ScheduleLayout from "@repo/ui/components/schedule/ScheduleLayout";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps){
  return (
    <>
      <ScheduleLayoutProvider>
        <ScheduleLayout>
          {props.children}
        </ScheduleLayout>
      </ScheduleLayoutProvider>
    </>
  )
}