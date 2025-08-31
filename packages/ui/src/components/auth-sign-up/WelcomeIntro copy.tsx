// import { ComponentPrimitiveProps } from "../../utils/types/global.types";
// import Button from "../button/Button";
// import Icon from "../icon/Icon";
// import HeaderVar2 from "../heading/HeadingVar2";
// import AuthBackButton from "./AuthBackButton";
// import { useAuth } from "../auth-provider/useAuth";

// type WelcomeIntroProps = ComponentPrimitiveProps & {
    
// };

// const WelcomeIntro = (props: WelcomeIntroProps) => {
//     const auth = useAuth();
    
//     return (
//         <div
//             className={`${props.className || ''} h-full flex flex-col justify-between`}
//         >
//             <div>
//                 <AuthBackButton onClick={auth?.prevSignUpStep} className="mb-8" />
//                 <HeaderVar2
//                     title={`Welcome to Talkamie`}
//                     subtitle={`Let's get you set up! Watch the quick video below to guide you through how Talkamie works`}
//                     titleClassName="text-2xl"
//                 />
//                 <video
//                     src="/videos/welcome-intro.mp4"
//                     controls
//                     className="mt-5"
//                 />
//                 <div className="mt-5 p-3 border-[1px] border-whiteVar2 shadow-md shadow-black/[.05] rounded-lg">
//                     <div className="flex items-center">
//                         <Icon iconName="InfoCircle" className="fill-redVar1" />
//                         <div className="pl-2">About Talkamie</div>
//                     </div>
//                     <div className="mt-3 text-grayVar8">
//                         Talkamie is a platform designed to bridge generations by connecting seniors with amies for meaningful companionship through scheduled virtual calls. It fosters genuine conversations, combats loneliness, and provides support tailored to the needs of seniors, all while ensuring a seamless and secure experience for both parties
//                     </div>
//                 </div>
//             </div>
//             <Button
//                 theme="red"
//                 className="mt-8 w-full"
//                 onClick={auth?.nextSignUpStep}
//             >
//                 Proceed
//             </Button>
//         </div>
//     );
// }

// export default WelcomeIntro;