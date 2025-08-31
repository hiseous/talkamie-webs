import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import HeaderVar2 from "../heading/HeadingVar2";
import { useAuth } from "../auth-provider/useAuth";
import { __welcomeIntro } from "../../utils/constants/placeholders/auth-welcome-intro";

type WelcomeIntroProps = ComponentPrimitiveProps & {
    
};

const WelcomeIntro = (props: WelcomeIntroProps) => {
    const auth = useAuth();
    
    return (
        <div
            className={`${props.className || ''} h-full flex flex-col justify-between`}
        >
            <div>
                {/* <AuthBackButton onClick={auth?.prevSignUpStep} className="mb-8" /> */}
                <HeaderVar2
                    title={`Welcome to Talkamie`}
                    subtitle={`Let's get you set up! Watch the quick video below to guide you through how Talkamie works`}
                    titleClassName="text-2xl"
                />
                <div className="mt-5">
                    {
                        __welcomeIntro.sections?.map((section, i) => (
                            <div
                                key={i}
                                className={`${i > 0 ? 'mt-4' : ''} p-3 border-[1px] border-whiteVar2 shadow-md shadow-black/[.05] rounded-lg`}
                            >
                                <div className="flex items-center">
                                    {
                                        section.title?.leading?.iconName ?
                                        <Icon iconName="InfoCircle" className="fill-redVar1 mr-2" /> : <></>
                                    }
                                    <div>{section.title?.text}</div>
                                </div>
                                <div className="mt-3 text-grayVar8">
                                    <span className="whitespace-pre-wrap">{section.paragraph?.text}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Button
                theme="red"
                className="mt-8 w-full"
                onClick={auth?.nextSignUpStep}
            >
                Proceed
            </Button>
        </div>
    );
}

export default WelcomeIntro;