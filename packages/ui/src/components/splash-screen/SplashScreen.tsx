import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type SplashScreenProps = ComponentPrimitiveProps;

const SplashScreen = (props: SplashScreenProps) => {

    return (
        <div className={`${props.className || ''} w-full h-full flex items-center justify-center`}>
            <div className="animate-ping w-[48px] h-[48px] p-3 box-content rounded-full flex items-center justify-center">
                <ImageAsset
                    name="soulMatesPng"
                    className="w-auto h-[44px]"
                />
            </div>
        </div>
    );
}

export default SplashScreen;