import ImageAsset from "../../assets/images/ImageAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type NoResultProps = ComponentPrimitiveProps & {
    label?: React.ReactNode;
};

const NoResult = (props: NoResultProps) => {
    
    return (
        <div className={`${props.className || ''} mx-auto w-full h-full max-w-[600px]
                text-center flex flex-col items-center justify-center text-grayVar1
            `}
        >
            <ImageAsset
                name="noResultLensPng"
                className="w-auto h-[180px]"
            />
            {
                props.label ?
                <div className="mt-6 w-full">{props.label}</div> : <></>
            }
        </div>
    );
}

export default NoResult;