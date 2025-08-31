// 'use client';

// import ImageAsset from "../../assets/images/ImageAsset";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
// import BiggerButton from "../button/BiggerButton";
// import IconWrapper from "../icon/IconWrapper";
// import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";

// type FeelHeardCaredProps = ComponentPrimitiveProps & {
//     onProgress?: (progress: number) => void;
// };

// const FeelHeardCared = (props: FeelHeardCaredProps) => {
//     const routes = useAppRoutes();
    
//     return (
//         <ScaleUpOnScrollWrapper
//             onProgress={props.onProgress}
//             className={`${props.className || ''} px-4 md:px-0`}
//         >
//             <div className="text-center">
//                 <div className="text-4xl md:text-6xl font-semibold max-w-[900px] mx-auto !leading-tight">
//                     Feel heard, cared for,
//                     <span className="text-redVar1"> and never alone!</span>
//                 </div>
//                 <div className="mt-8 md:mt-12 relative w-[fit-content] mx-auto">
//                     <ImageAsset
//                         name="positiveMatureMan"
//                         className="w-[180px] md:w-[280px] h-auto rounded-[70px]"
//                     />
//                     <IconWrapper
//                         className="absolute -top-3 -right-3 w-0 h-0 p-3 md:p-4 [&>*]:md:w-[44px] [&>*]:md:h-[44px] box-content rounded-full bg-redVar1 fill-none stroke-white"
//                         svgAssetName="CheckCircleBroken"
//                         iconSize={32}
//                     />
//                     {/* <ImageAsset
//                         name="positiveMatureMan"
//                         className="w-[180px] md:w-[280px] h-auto rounded-[60px]"
//                     />
//                     <IconWrapper
//                         className="absolute -top-4 -right-4 w-0 h-0 p-3 md:p-4 box-content rounded-full bg-redVar1 fill-none stroke-white"
//                         svgAssetName="CheckCircleBroken"
//                         // iconSize={14}
//                     /> */}
//                 </div>
//                 {/* <div className="mt-8 text-lg md:text-xl max-w-[420px] mx-auto">
//                     Every call is an opportunity to laugh, reminisce, and
//                     <span className="font-semibold"> build meaningful friendships</span>
//                     —all from the comfort of your home.
//                 </div> */}
//                 <BiggerButton href={routes.auth(['sign-up'])} theme="red" className="mt-12 md:px-32">
//                     Find a Friend
//                 </BiggerButton>
//             </div>
//             <ImageAsset
//                 name="mobileVolunteers"
//                 className="mt-20 md:mt-32 w-full max-w-[490px] h-auto mx-auto"
//             />
//             <div className="mt-20 md:mt-48 text-center">
//                 <div className="text-3xl md:text-6xl font-semibold max-w-[860px] mx-auto !leading-tight">
//                     Bringing you joy
//                     <div className="text-redVar1"> one call at a time.</div>
//                 </div>
//                 <div className="mt-8 md:mt-16 relative w-[fit-content] mx-auto">
//                     <ImageAsset
//                         name="_001Cropped"
//                         className="w-[180px] md:w-[280px] h-auto"
//                     />
//                     <IconWrapper
//                         className="absolute -top-3 -right-3 w-0 h-0 p-3 md:p-4 [&>*]:md:w-[44px] [&>*]:md:h-[44px] box-content rounded-full bg-redVar1 fill-none stroke-white"
//                         svgAssetName="CheckCircleBroken"
//                         iconSize={32}
//                     />
//                 </div>
//                 {/* <div className="mt-8 text-lg md:text-xl max-w-[420px] mx-auto">
//                     <div>
//                         Experience the comfort of knowing someone is there to
//                         <span className="font-semibold"> listen and support you</span>
//                         , no matter what.
//                     </div>
//                     <div>
//                         Your time, your Preferences
//                     </div>
//                 </div> */}
//                 <BiggerButton href={routes.auth(['sign-up'])} theme="red" className="mt-12 md:mt-16">
//                     Schedule your First Call
//                 </BiggerButton>
//             </div>
//             <ImageAsset
//                 name="mobileVideoCall"
//                 className="mt-20 md:mt-48 w-full max-w-[490px] h-auto mx-auto"
//             />
//             {/* <div className="mt-20 md:mt-48 text-center">
//                 <div className="text-3xl md:text-6xl font-semibold max-w-[600px] mx-auto">
//                     More ways to stay
//                     <div className="text-redVar1"> happy forever.</div>
//                 </div>
//                 <div className="mt-8 relative w-[fit-content] mx-auto">
//                     <ImageAsset
//                         name="_001Cropped"
//                         className="w-[94px] h-auto"
//                     />
//                     <IconWrapper
//                         className="absolute top-[-4px] right-[-4px] w-0 h-0 p-2 box-content rounded-full bg-redVar1 fill-none stroke-white"
//                         svgAssetName="CheckCircleBroken"
//                         iconSize={14}
//                     />
//                 </div>
//                 <div className="mt-4 text-lg md:text-xl max-w-[420px] mx-auto">
//                     We're here to make every day a little brighter for you. 
//                     Having someone to talk to can make all the difference. Enjoy kindness,
//                     <span className="font-semibold"> friendship, and support.</span>
//                 </div>
//             </div> */}
//         </ScaleUpOnScrollWrapper>
//     );
// }

// export default FeelHeardCared;