// 'use client';

// import { __imageAssets } from "../../assets/images/_index";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { __classNames } from "../../utils/constants/classNames";
// import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
// import HeadingText from "../heading/HeadingText";
// import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";
// import { useRef } from "react";
// import BiggerButton from "../button/BiggerButton";

// type LandingBody1Props = ComponentPrimitiveProps & {
//     onProgress?: (progress: number) => void;
// };

// const LandingBody1 = (props: LandingBody1Props) => {
//     const routes = useAppRoutes();
//     const ref = useRef<HTMLDivElement | null>(null);
//     useScaleUpOnScroll({
//         targetRef: ref,
//         onProgress: props.onProgress,
//     });
    
//     return (
//         <div
//             // onProgress={props.onProgress}
//             // offset={['start end', 'end start']}
//             ref={ref}
//             className={`${props.className || ''} ${__classNames.screenH}`}
//         >
//             <div
//                 style={{backgroundImage: `url(${__imageAssets._002Jpeg.src})`}}
//                 className="h-full relative px-4 md:px-10 md:py-4 xxl:pb-8 text-white overflow-hidden bg-no-repeat bg-[75%_10%] md:bg-top bg-cover"
//             >
//                 <div
//                     className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
//                 ></div>
//                 <div className="relative h-full flex flex-col justify-between">
//                     <div></div>
//                     <div className="flex-1 md:flex-initial flex flex-col items-center justify-center">
//                         <HeadingText className="max-w-[679px] text-center mx-auto xl:mb-3">
//                             Recurring Virtual Companionship for Seniors.
//                         </HeadingText>
//                         <BiggerButton
//                             href={routes.auth(['sign-in'])}
//                             theme="white"
//                             className="mt-10 xl:mt-14 2xl:mt-4 mb-4 xl:mb-0 !max-w-[810px] mx-auto block"
//                             // className="text-center max-w-[360px] w-full mt-14 mb-8 xxl:mt-20 mx-auto py-4 !rounded-[80px] text-3xl font-medium bg-white hover:bg-redVar1 text-redVar1 hover:text-white"
//                         >
//                             Find a Friend
//                         </BiggerButton>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LandingBody1;
