import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import ConnectInputModal from "./ConnectInputModal";
import InputText from "../input-text/InputText";

type ConnectInputTitleProps = ComponentPrimitiveProps & {
    title?: string;
    viewOnly?: boolean;
    onChange?: (title?: string) => void;
};

const ConnectInputTitle = (props: ConnectInputTitleProps) => {
    
    return (
        <ConnectInputModal
            className={`${props.className || ''}`}
            svgAssetName="HashTagFill"
            title="Title"
            subTitle={props.title}
        >
            {
                !props.viewOnly ?
                <InputText
                    placeholder="title here..."
                    className="bg-whiteVar3 border-[1px] border-whiteVar2 rounded-t-md"
                    defaultValue={props.title}
                    autoFocus
                    onChange={(value) => {
                        if(props.onChange) props.onChange(value);
                    }}
                /> : undefined
            }
        </ConnectInputModal>
    );
}

export default ConnectInputTitle;