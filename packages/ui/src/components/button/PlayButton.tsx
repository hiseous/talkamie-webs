import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import IconWrapper from "../icon/IconWrapper";

type PlayButtonProps = ComponentPrimitiveProps & {
    theme?: 'white' | 'red';
    onClick?: () => void;
};

const PlayButton = (props: PlayButtonProps) => {
    
    return (
        <div
            onClick={props.onClick}
            className={`${props.className || ''} w-[fit-content] h-[fit-content]
                box-content !p-4 rounded-full
                ${
                    props.theme === 'red' ? `fill-redVar1 bg-white shadow-black/[.08] shadow-xl` :
                    `fill-white backdrop-blur-2xl bg-black/[.08]`
                }
            `}
        >
            <IconWrapper
                iconName="PlayCircleFill"
                iconSize={24}
            />
        </div>
    );
}

export default PlayButton;