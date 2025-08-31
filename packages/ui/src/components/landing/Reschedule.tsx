// 'use client';

// import ImageAsset, { imageAssetName } from "../../assets/images/ImageAsset";
// import { svgAssetName } from "../../assets/svg/SvgAsset";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
// import BiggerButton from "../button/BiggerButton";
// import IconWrapper from "../icon/IconWrapper";
// import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";

// type benefitProps = {
//     iconName?: svgAssetName;
//     thumbName?: imageAssetName;
//     thumbAsIcon?: boolean;
//     label: string;
// }
// type RescheduleProps = ComponentPrimitiveProps & {
//     onProgress?: (progress: number) => void;
// };

// const Reschedule = (props: RescheduleProps) => {
//     const routes = useAppRoutes();
//     const benefits: benefitProps[] = [
//         {
//             label: `Seniors/Elderlies`,
//             thumbName: '_003Cropped',
//         },
//         {
//             label: `Recurring Calls`,
//             iconName: 'CalendarEmptyAlt',
//         },
//         {
//             label: `Amies/Volunteers`,
//             thumbName: '_000Cropped',
//         },
//         {
//             label: `Earn Revenue`,
//             thumbName: 'dollarBroken',
//             thumbAsIcon: true,
//         },
//     ];
    
//     return (
//         <ScaleUpOnScrollWrapper
//             onProgress={props.onProgress}
//             className={`${props.className || ''}`}
//         >
//             {/* <ImageAsset
//                 name="screeshotReschedule"
//                 className="w-full max-w-[960px] h-auto mx-auto mb-20 md:mb-48 "
//             /> */}
//             <div id="become-volunteer" className="text-center">
//                 <div className="text-3xl md:text-6xl font-semibold max-w-[860px] mx-auto">
//                     Join a
//                     <span className="text-redVar1"> rewarding </span>
//                     community.
//                 </div>
//                 <div className="mt-4 md:mt-8 py-4 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4 mx-auto max-w-[860px]">
//                     {
//                         benefits.map((benefit, i) => {
//                             return (
//                                 <div
//                                     key={i}
//                                     className="flex items-center rounded-[60px] shadow-black/[.1] shadow-md px-3 py-2 md:p-3"
//                                 >
//                                     <div className={`shrink-0 rounded-full overflow-hidden w-[fit-content] h-[fit-content] ${benefit.thumbAsIcon || benefit.iconName ? 'bg-pinkVar3 p-3' : ''}`}>
//                                         {
//                                             benefit.iconName ?
//                                             <IconWrapper
//                                                 svgAssetName={benefit.iconName}
//                                                 className="fill-redVar1 [&>*]:w-[24px] [&>*]:h-[24px] [&>*]:md:w-[32px] [&>*]:md:h-[32px]"
//                                             /> :
//                                             benefit.thumbName ?
//                                             <ImageAsset
//                                                 name={benefit.thumbName}
//                                                 className={`${benefit.thumbAsIcon ? `w-[24px] h-[24px] md:w-[32px] md:h-[32px]` : `w-[51px] h-[51px] md:w-[60px] md:h-[60px]`} object-cover rounded-full overflow-hidden`}
//                                             /> :
//                                             <></>
//                                         }
//                                     </div>
//                                     <div className="md:text-xl font-semibold pl-4 pr-5">
//                                         {benefit.label}
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 <div className="mt-12 md:mt-16 px-8 md:px-0">
//                     <div className="text-lg md:text-xl max-w-[600px] mx-auto">
//                         Start connecting with seniors who are looking for a friendly ear and a kind heart. The best part?
//                         <span className="font-semibold"> financially rewarded </span>
//                         to this end!
//                     </div>
//                     <BiggerButton href={routes.auth(['sign-up'])} theme="red" className="mt-16">
//                         Become a Volunteer
//                     </BiggerButton>
//                 </div>
//             </div>
//         </ScaleUpOnScrollWrapper>
//     );
// }

// export default Reschedule;