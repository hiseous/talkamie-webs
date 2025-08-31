// 'use client';

// import { __imageAssets } from "../../assets/images/_index";
// import ImageAsset from "../../assets/images/ImageAsset";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { __classNames } from "../../utils/constants/classNames";
// import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
// import Button from "../button/Button";
// import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";

// // type callButtonProps = {
// //     icon: svgAssetName;
// //     className?: string;
// // }
// type ScheduleVirtualCallsProps = ComponentPrimitiveProps & {
//     onProgress?: (progress: number) => void;
// };

// const ScheduleVirtualCalls = (props: ScheduleVirtualCallsProps) => {
//     const routes = useAppRoutes();
//     // const callButtons: callButtonProps[] = [
//     //     {
//     //         icon: 'Microphone',
//     //     },
//     //     {
//     //         icon: 'VolumeHigh',
//     //     },
//     //     {
//     //         icon: 'Video',
//     //     },
//     //     {
//     //         icon: 'CommentText',
//     //         className: '!bg-blueVar1',
//     //     },
//     //     {
//     //         icon: 'Times',
//     //         className: '!bg-redVar11'
//     //     },
//     // ];
    
//     return (
//         <ScaleUpOnScrollWrapper
//             onProgress={props.onProgress}
//             // offset={['start end', 'end start']}
//             className={`${props.className || ''} ${__classNames.screenH}`}
//         >
//             <div
//                 style={{backgroundImage: `url(${__imageAssets._002.src})`}}
//                 className="h-full relative px-4 md:px-10 md:py-4 xxl:pb-8 text-white overflow-hidden bg-no-repeat bg-top bg-cover"
//             >
//                 <div
//                     className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
//                 ></div>
//                 <div className="relative h-full flex flex-col justify-between">
//                     <div></div>
//                     <div className="flex-1 md:flex-initial flex flex-col items-center justify-end md:justify-center">
//                         <div className="text-4xl md:text-5xl leading-snug md:leading-tight max-w-[679px] text-center mx-auto font-semibold">
//                             {/* Schedule virtual calls with friendly amies who care. */}
//                             {/* {`Recurring Virtual calls with an Amie(We can be a friend, we can also be like family) because.....we care :)`} */}
//                             <div>
//                                 Ongoing Virtual Companionship for Seniors.
//                             </div>
//                         </div>
//                         <Button
//                             href={routes.auth(['sign-up'])}
//                             className="text-center max-w-[360px] w-full mt-14 mb-8 xxl:mt-20 mx-auto py-4 !rounded-[80px] text-3xl font-medium bg-white hover:bg-redVar1 text-redVar1 hover:text-white"
//                         >
//                             Get Started
//                         </Button>
//                     </div>
//                     <ImageAsset
//                         name="happyLady"
//                         className="w-auto h-[180px] md:h-[250px] rounded-2xl absolute top-24 md:top-[unset] md:bottom-0 right-0"
//                     />
//                     {/* <div className="mb-6 relative">
//                         <ImageAsset
//                             name="happyLady"
//                             className="hidden md:block w-auto h-[250px] rounded-2xl absolute bottom-0 right-0"
//                         />
//                         <div className="flex items-center justify-center">
//                             {
//                                 callButtons.map((callButton, i) => {
//                                     return (
//                                         <IconWrapper
//                                             key={i}
//                                             className={`${callButton.className || ''} ${i > 0 ? 'ml-3' : ''} fill-white bg-black/[.5] p-3 md:p-4 rounded-full`}
//                                             svgAssetName={callButton.icon}
//                                             iconSize={22}
//                                         />
//                                     )
//                                 })
//                             }
//                         </div>
//                     </div> */}
//                 </div>
//             </div>
//         </ScaleUpOnScrollWrapper>
//     );
// }

// export default ScheduleVirtualCalls;