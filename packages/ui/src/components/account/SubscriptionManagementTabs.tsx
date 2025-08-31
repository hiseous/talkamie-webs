// 'use client';

// import { svgAssetName } from "../../assets/svg/SvgAsset";
// import { __routes } from "../../utils/constants/app-routes";
// import { useClosestPathnames } from "../../utils/funcs/hooks/useClosestPathnames";
// import { settingsAppRouteSubpath } from "../../utils/types/app-routes";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { iconName } from "../icon/Icon";
// import IconWrapper from "../icon/IconWrapper";
// import ThumbTitleSubtitleNode from "../node/ThumbTitleSubtitleNode";

// type tab = {
//     svgIcon?: svgAssetName;
//     iconName?: iconName;
//     title: string;
//     subtitle: string;
//     hrefSubpaths?: settingsAppRouteSubpath[];
// }
// type SubscriptionManagementTabsProps = ComponentPrimitiveProps & {

// }

// const SubscriptionManagementTabs = (props: SubscriptionManagementTabsProps) => {
    
//     const tabs: tab[] = [
//         {
//             iconName: 'CashCoin',
//             title: `Monthly Subscription`,
//             subtitle: `Manage your rucurring plan`,
//             hrefSubpaths: ['subscription', 'plans'],
//         },
//         {
//             iconName: 'Coin',
//             title: `Direct Purchase`,
//             subtitle: `Top up your talkcoin balance`,
//             hrefSubpaths: ['subscription', 'purchase'],
//         },
//     ];
//     const pathNames = tabs.map(tab => __routes.settings(tab.hrefSubpaths));
//     const closestPaths = useClosestPathnames({pathnames: pathNames});
    
//     return (
//         <div className={`${props.className || ''}`}>
//             {
//                 tabs.map((tab, i) => {
//                     const href = __routes.settings(tab.hrefSubpaths);
//                     const isThisLocation = closestPaths.isThisLocation(href);
                    
//                     return (
//                         <ThumbTitleSubtitleNode
//                             key={i}
//                             thumbNode={<IconWrapper className="rounded-full fill-grayVar8" svgAssetName={tab.svgIcon} iconName={tab.iconName} iconSize={32} />}
//                             titleNode={<div className="font-semibold">{tab.title}</div>}
//                             subtitleNode={<div className="text-grayVar3">{tab.subtitle}</div>}
//                             // leadingNode={<SvgAsset name="AngleRight" className="fill-grayVar3" />}
//                             className={`px-4 py-4 border-r-[2px] ${isThisLocation ? 'bg-pinkVar1 border-r-redVar1' : 'border-r-transparent'}`}
//                             href={href}
//                         />
//                     )
//                 })
//             }
//         </div>
//     );
// }

// export default SubscriptionManagementTabs;