
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { supportMessageProps } from "../../utils/types/support";
import ImageAsset from "../../assets/images/ImageAsset";
import SuggestedHelps from "./SuggestedHelps";
import IconWrapper from "../icon/IconWrapper";
import SuggestedHelpWrapper from "./SuggestedHelpWrapper";
import { __routes } from "../../utils/constants/app-routes";

type SupportAndFaqsProps = ComponentPrimitiveProps & {
    onMessageSent?: (message?: supportMessageProps) => void;
}

const SupportAndFaqs = (props: SupportAndFaqsProps) => {
    
    return (
        <div className={`${props.className || ''}`}>
            <div className="flex flex-col items-center">
                <div className="bg-redVar1/[.05] rounded-full p-4">
                    <ImageAsset
                        name="lifeBuoyRedPng"
                        className="w-auto h-[48px]"
                    />
                </div>
                <div className="mt-4 font-semibold text-lg">How can we help?</div>
                <div className="mt-3 max-w-[500px] text-center">
                    Find answers to the most common questions or contact us directly
                </div>
            </div>
            <div className="mt-8">
                <div className="font-semibold text-lg">
                    Support cases
                </div>
                <SuggestedHelpWrapper
                    className="mt-4 px-4 py-6"
                    iconName="ChevronRight"
                    href={__routes.support(['messages'])}
                >
                    <div className="flex items-center">
                        <IconWrapper
                            svgAssetName="ChatText"
                            className="bg-redVar1/[.05] rounded-full p-3 fill-redVar1 md:[&_svg]:w-[28px] md:[&_svg]:h-[28px]"
                        />
                        <div className="pl-3">
                            <div className="font-semibold">
                                Inbox
                            </div>
                            <div className="max-w-[500px] text-center">
                                View open chats
                            </div>
                        </div>
                    </div>
                </SuggestedHelpWrapper>
            </div>
            <div className="mt-16">
                <div className="font-semibold text-lg">
                    Get help with with something else
                </div>
                <SuggestedHelps
                    className="mt-4"
                />
            </div>
        </div>
    )
}

export default SupportAndFaqs;