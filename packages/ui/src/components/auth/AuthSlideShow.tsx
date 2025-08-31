import { __imageAssets } from "../../assets/images/_index";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type AuthSlideShowProps = ComponentPrimitiveProps;

const AuthSlideShow = (props: AuthSlideShowProps) => {
    
    return (
        <div
            style={{
                backgroundImage: `url(${__imageAssets.happySeniorBiracialManJpeg.src})`,
            }}
            className={`${props.className || ''} relative bg-cover rounded-3xl overflow-hidden`}
        >
            <div className="absolute left-0 top-0 w-full h-full bg-black/[.6]"></div>
            <div className="relative px-12 text-white flex flex-col justify-center h-full !max-h-[100dvh] max-h-[100vh]">
                <div className="text-5xl font-bold">
                    Bring Smiles to Your Day
                </div>
                <div className="mt-4 text-xl">
                    Share stories, make new friends, and enjoy meaningful conversations with caring amies
                </div>
            </div>
        </div>
    );
}

export default AuthSlideShow;