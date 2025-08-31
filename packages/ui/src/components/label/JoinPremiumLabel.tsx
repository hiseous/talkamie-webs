
'use client'

import SvgAsset from "../../assets/svg/SvgAsset";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import GradientWrapper from "../wrapper/GradientWrapper";

type JoinPremiumLabelProps = ComponentPrimitiveProps & {
    
};

const JoinPremiumLabel = (props: JoinPremiumLabelProps) => {
    // const routes = useAppRoutes();
    
    return (
        <GradientWrapper
            // href={routes.settings(['subscription'])}
            className={`${props.className || ''} px-5 py-3 flex items-center w-[fit-content] rounded-3xl cursor-pointer`}
        >
            <SvgAsset name="BoltAltFill" />
            <span className="pl-2">Join Premium</span>
        </GradientWrapper>
    );
}

export default JoinPremiumLabel;