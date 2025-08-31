import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { __app } from "../../utils/constants/app";
import { __classNames } from "../../utils/constants/classNames";

type ComingSoonProps = ComponentPrimitiveProps;

const ComingSoon = (props: ComingSoonProps) => {

    return (
        <div className={`${props.className || ''} w-full ${__classNames.screenH} flex flex-col items-center justify-center
                bg-redVar1 text-white text-2xl text-center
            `}
        >
            <div className="md:flex">
                <div className="mx-auto w-12 h-12 p-3 box-content rounded-full bg-white flex items-center justify-center">
                    <ImageAsset
                        name="soulMatesPng"
                        className="w-auto h-10"
                    />
                </div>
                <div className="md:pl-8">
                    <div className="my-4 md:my-0 text-7xl font-semibold">
                        {__app.name}
                    </div>
                    <div className="font-bold mt-2">
                        ...is on its way!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComingSoon;