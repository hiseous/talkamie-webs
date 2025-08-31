import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import AlertButton from "../button/AlertButton";
import GreetUser from "./GreetUser";

type HomeHeaderProps = ComponentPrimitiveProps & {
    
};

const HomeHeader = (props: HomeHeaderProps) => {
    
    return (
        <div className={`${props.className || ''} sticky top-0 z-[1] bg-white -mt-4 py-2 flex items-center justify-between`}>
            <GreetUser />
            <div className="flex items-center">
                <AlertButton />
                {/* <JoinPremiumLabel className="ml-4 hidden md:flex" /> */}
            </div>
        </div>
    );
}

export default HomeHeader;