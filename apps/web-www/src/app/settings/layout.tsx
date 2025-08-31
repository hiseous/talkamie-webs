import DocWrapperVar1 from "@repo/ui/components/wrapper/DocWrapperVar1";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps){
  return (
    <DocWrapperVar1>
      {props.children}
    </DocWrapperVar1>
    // <DocWrapperVar1 className="flex">
    //   <div className="hidden md:block max-w-[35%] pr-4 border-r-[1px] border-r-whiteVar2 mr-8">
    //     <GradientWrapper className="rounded-xl p-4 block" href={__routes.settings(['subscription'])}>
    //       <ThumbTitleSubtitleNode
    //         thumbNode={<SvgAsset name="BoltAltFill" size={40} />}
    //         titleNode={<div className="text-lg">Unlock Premium Features</div>}
    //         subtitleNode={<div className="text-xs mt-1">Enjoy priority matching, exclusive perks, and enhanced connections</div>}
    //         leadingNode={<div className="pl-4 text-sm">Learn More</div>}
    //       />
    //     </GradientWrapper>
    //     <AccountTabs className="mt-7" />
    //   </div>
    //   <div className="flex-1">
    //     {props.children}
    //   </div>
    // </DocWrapperVar1>
  )
}