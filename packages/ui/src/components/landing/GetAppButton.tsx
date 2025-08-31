import ImageAsset from "../../assets/images/ImageAsset";
import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __classNames } from "../../utils/constants/classNames";
import BiggerButton from "../button/BiggerButton";
import { GetAppProps } from "./GetApp";

type GetAppButtonProps = ComponentPrimitiveProps & {
    type?: GetAppProps['type'];
    background?: 'transparent' | 'dark';
    outline?: 'light';
};

const GetAppButton = (props: GetAppButtonProps) => {
    
    return (
        <BiggerButton
            className={`${props.className || ''} font-semibold w-full flex items-center justify-center ${__classNames.transition}
                ${
                    props.background === 'dark' ? `
                        bg-black text-white
                    ` :
                    ``
                }
                ${
                    props.outline === 'light' ? `
                        border-[2px] border-white
                    ` :
                    ``
                }
            `}
        >
            {
                props.type === 'ios' ?
                <ImageAsset
                    name={props.background === 'dark' ? "appleBrandWhitePng" : "appleBrandPng"}
                    className="w-auto h-[32px]"
                /> :
                <SvgAsset
                    name="PlayStore"
                    className={`${props.background === 'dark' ? 'fill-white' : ''}`}
                    size={32}
                />
            }
            <div className="pl-2">
                {`Get ${props.type === 'ios' ? 'iOS' : 'Android'} app`}
            </div>
        </BiggerButton>
    );
}

export default GetAppButton;