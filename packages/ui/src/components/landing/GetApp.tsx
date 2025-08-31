import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

export type GetAppProps = ComponentPrimitiveProps & {
    type?: 'android' | 'ios';
};

const GetApp = (props: GetAppProps) => {
    
    return (
        <div
            className={`${props.className || ''} max-w-[260px] xl:max-w-[320px] bg-black text-white rounded-3xl p-3 font-semibold text-xl xl:text-2xl`}
        >
            <div className="rounded-2xl p-2 bg-white">
                <ImageAsset
                    name={props.type === 'ios' ? "qrCodeIosAppPng" : "qrCodeAndroidAppPng"}
                />
            </div>
            <div className="pt-5 pb-6 hover:underline cursor-pointer">
                {`Get ${props.type === 'ios' ? 'iOS' : 'Android'} app`}
            </div>
        </div>
    );
}

export default GetApp;