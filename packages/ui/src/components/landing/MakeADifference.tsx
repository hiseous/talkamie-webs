// import { __imageAssets } from "../../assets/images/_index";
// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import { __classNames } from "../../utils/constants/classNames";
// import BiggerButton from "../button/BiggerButton";
// import ScaleUpOnScrollWrapper from "../motions/ScaleUpOnScrollWrapper";

// type MakeADifferenceProps = ComponentPrimitiveProps & {
//     onProgress?: (progress: number) => void;
// };

// const MakeADifference = (props: MakeADifferenceProps) => {
//     // const routes = useAppRoutes();
    
//     return (
//         <ScaleUpOnScrollWrapper
//             onProgress={props.onProgress}
//             className={`${props.className || ''} ${__classNames.screenH}`}
//         >
//             <div
//                 style={{backgroundImage: `url(${__imageAssets._002.src})`}}
//                 className="h-full relative px-4 md:px-10 md:py-4 text-white overflow-hidden bg-no-repeat bg-top bg-cover"
//             >
//                 <div
//                     className="absolute w-full h-full top-0 left-0 bg-black/[.4]"
//                 ></div>
//                 <div className="relative h-full flex flex-col justify-between">
//                     <div></div>
//                     <div className="text-4xl md:text-6xl max-w-[700px] text-center mx-auto leading-snug md:leading-tight font-semibold">
//                         Do you need Help Getting Started?
//                         {/* Make a Difference, One Call at a Time */}
//                     </div>
//                     <BiggerButton
//                         // href={routes.auth(['sign-up'])}
//                         theme="white"
//                         className="mb-6">
//                         Reach out to us
//                     </BiggerButton>
//                 </div>
//             </div>
//         </ScaleUpOnScrollWrapper>
//     );
// }

// export default MakeADifference;