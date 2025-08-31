
import { __app } from "../../utils/constants/app";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import CustomImage from "../node/CustomImage";
import NodeMayBeLink from "../node/NodeMayBeLink";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";

type SignInProps = ComponentPrimitiveProps & {
    children: React.ReactNode;
};

const AuthLayout = (props: SignInProps) => {
    
    return (
        <DocWrapperVar1 className={`${props.className || ''} flex flex-col items-center items-stretch px-6 py-4 md:p-0 max-w-[1200px] mx-auto`}>
            <NodeMayBeLink href="/" className="mt-8 my-10 flex items-center justify-center uppercase text-2xl font-medium text-redVar1">
                <CustomImage
                    src={`/images/app/icon-red.png`}
                    className="w-auto h-[34px]"
                />
                <div className="pl-2">{__app.name}</div>
            </NodeMayBeLink>
            <div className="flex-1 md:px-12 mx-auto flex flex-col w-full h-full">
                <div className="md:border-[2px] md:border-grayVar2 md:rounded-[20px] md:p-10 md:shadow-lg md:shadow-black/[.05]">
                    {props.children}
                </div>
            </div>
        </DocWrapperVar1>
    );
}

export default AuthLayout;