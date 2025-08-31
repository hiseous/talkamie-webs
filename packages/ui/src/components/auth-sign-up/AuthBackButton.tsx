import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import Button from "../button/Button";
import Icon from "../icon/Icon";

type AuthBackButtonProps = ComponentPrimitiveProps & {
    onClick?: () => void;
};

const AuthBackButton = (props: AuthBackButtonProps) => {

    return (
        <Button onClick={props.onClick} className={`${props.className || ''} w-[fit-content] uppercase flex items-center bg-grayVar7 font-medium px-5 text-sm`}>
            <Icon iconName="ChevronLeft" />
            <div className="ml-2">back</div>
        </Button>
    );
}

export default AuthBackButton;