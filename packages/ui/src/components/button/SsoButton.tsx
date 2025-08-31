import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps, ssoName } from "../../utils/types/global.types";
import { capitalizeString } from "../../utils/funcs/string/string";
import Button from "../button/Button";

export type SsoButtonProps = ComponentPrimitiveProps & {
    provider: ssoName;
    authType?: 'sign-in' | 'sign-up';
    onClick?: () => void;
};

const SsoButton = (props: SsoButtonProps) => {
    
    return (
        <Button
            onClick={props.onClick}
            className={`${props.className || ''}
                flex items-center justify-center font-medium border-[1px] border-grayVar2 w-full
                py-4 text-blackVar2 !rounded-[40px]
            `}
        >
            <ImageAsset
                name={
                    props.provider === 'apple' ? 'appleBrandPng' :
                    'googleColouredBrandPng'
                }
                className="w-auto h-[24px] md:h-[32px]"
            />
            <div className="pl-4 hover:underline">
                {`${props.authType === 'sign-up' ? 'Sign up' : 'Sign in'} with ${capitalizeString(props.provider).newString}`}
            </div>
        </Button>
    );
}

export default SsoButton;