// 'use client';

// import ImageAsset from "../../assets/images/ImageAsset";
// import SvgAsset from "../../assets/svg/SvgAsset";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
// import BiggerButton from "../button/BiggerButton";
// import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";
// import JoinTextsByDots from "./JoinTextsByDots";

// type MeetTalkamieProps = ComponentPrimitiveProps & {
//     onProgress?: (progress: number) => void;
// };

// const MeetTalkamie = (props: MeetTalkamieProps) => {
//     const routes = useAppRoutes();
    
//     return (
//         <ScaleUpOnScrollWrapper
//             onProgress={props.onProgress}
//             className={`${props.className || ''} px-8 md:px-0 mx-auto max-w-[1400px]`}
//         >
//             <div className="md:text-center text-2xl md:text-3xl font-semibold text-redVar1">Meet Talkamie</div>
//             <div className="pt-6 md:pt-16 text-3xl md:text-7xl font-semibold !leading-tight">
//                 <div className="md:hidden">
//                     <JoinTextsByDots
//                         texts={['Comfort', 'Empathy']}
//                     />
//                     <JoinTextsByDots
//                         texts={['Bond', 'Support']}
//                     />
//                     <JoinTextsByDots
//                         texts={['Companion']}
//                     />
//                 </div>
//                 <div className="hidden md:block">
//                     <JoinTextsByDots
//                         texts={['Comfort', 'Empathy', 'Bond']}
//                     />
//                     <JoinTextsByDots
//                         texts={['Support', 'Companion']}
//                     />
//                     {/* <JoinTextsByDots
//                         texts={['Companion', 'Connection']}
//                     /> */}
//                     {/* <JoinTextsByDots
//                         texts={['Bond']}
//                     /> */}
//                 </div>
//             </div>
//             <div className="pt-12 md:pt-16 md:text-center">
//                 <div className="font-medium text-xl">
//                     “A great innovation for our beautiful seniors.”
//                 </div>
//                 <div className="mt-1">
//                     Stella Damascus • CEO Elderly Smiles
//                 </div>
//                 <div className="mt-4 flex items-center md:justify-center fill-redVar1">
//                     <div className="flex items-center">
//                         {
//                             Array.from({length: 5}).map((unknown, i) => {
//                                 return (
//                                     <SvgAsset
//                                         key={`${unknown}_${i}`}
//                                         name="StarFill"
//                                     />
//                                 )
//                             })
//                         }
//                     </div>
//                     <div className="pl-2 text-sm">
//                         20+ Reviews
//                     </div>
//                 </div>
//                 <BiggerButton href={routes.auth(['sign-up'])} theme="red" className="mt-16">
//                     Get Connected Now
//                 </BiggerButton>
//             </div>
//             <ImageAsset
//                 name="mobileHomePage"
//                 className="mt-20 md:mt-48 w-full max-w-[490px] h-auto mx-auto"
//             />
//         </ScaleUpOnScrollWrapper>
//     );
// }

// export default MeetTalkamie;