'use client';

import SvgAsset from "@repo/ui/assets/svg/SvgAsset";
import AccountTabs from "@repo/ui/components/account/AccountTabs";
import { useLocalUser } from "@repo/ui/components/local-user-provider/useLocalUser";
import ThumbTitleSubtitleNode from "@repo/ui/components/node/ThumbTitleSubtitleNode";
import GradientWrapper from "@repo/ui/components/wrapper/GradientWrapper";
import { __routes } from "@repo/ui/utils/constants/app-routes";

export default function Page(){
  const localUser = useLocalUser();

  return (
    <>
      <div className="border-r-[1px] border-r-whiteVar2">
        {
          localUser?.type === 'senior' ?
          <GradientWrapper className="rounded-xl p-4 block" href={__routes.settings(['finance'])}>
            <ThumbTitleSubtitleNode
              thumbNode={<SvgAsset name="BoltAltFill" size={40} />}
              titleNode={<div className="text-lg">Unlock Premium Features</div>}
              subtitleNode={<div className="text-xs mt-1">Enjoy priority matching, exclusive perks, and enhanced connections</div>}
              traillingNode={<div className="pl-4 text-sm">Learn More</div>}
            />
          </GradientWrapper> : undefined
        }
        <AccountTabs className={`${localUser?.type === 'senior' ? 'mt-7' : ''} md:max-w-[700px]`} />
      </div>
      {/* <Navigate to={__routes.settings(['profile'])} /> */}
    </>
  )
}