import AvailabilityTabs from "@repo/ui/components/availability/AvailabilityTabs";
import DocWrapperVar1 from "@repo/ui/components/wrapper/DocWrapperVar1";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps){
  return (
    <DocWrapperVar1 className="flex">
      <div className="hidden md:block max-w-[35%] pr-4 border-r-[1px] border-r-whiteVar2 mr-8">
        <AvailabilityTabs className="sticky top-6" />
      </div>
      <div className="flex-1">
        {props.children}
      </div>
    </DocWrapperVar1>
  )
}