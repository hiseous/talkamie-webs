'use client';

import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import { fromUserName } from "../../utils/funcs/string/name";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { userProps } from "../../utils/types/user";
import Button from "../button/Button";
import CustomImage from "../node/CustomImage";
import ViewAmieItemWrapper from "./ViewAmieItemWrapper";

export type viewAmieItemProps = Pick<userProps, 'id' | 'age' | 'bio' | 'video' | 'name' | 'picture'>;
type ViewAmieItemProps = ComponentPrimitiveProps & {
    item: viewAmieItemProps;
}
const ViewAmieItem = (props: ViewAmieItemProps) => {
    const routes = useAppRoutes();
    
    return (
        <ViewAmieItemWrapper className={`${props.className || ''}`}>
            <div>
                <div className="h-[200px] rounded-xl overflow-hidden">
                    {
                        props.item.video?.org?.url ?
                        <video
                            src={props.item.video?.org?.url}
                        /> :
                        props.item.picture?.org?.url ?
                        <CustomImage
                            src={props.item.picture?.org?.url}
                            className="w-full h-full object-cover object-top"
                        /> : undefined
                    }
                </div>
                <div className="mt-1 max-h-[216px]">
                    <div className="font-semibold text-2xl">
                        {props.item.name}
                        {props.item.age ? `, ${props.item.age}` : undefined}
                    </div>
                    <div className="mt-1 line-clamp-5 leading-tight">
                        {props.item.bio}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Button
                    theme="red-gradient"
                    className="w-full block text-center font-medium"
                    href={routes.auth(['sign-up'], {
                        type: 'senior',
                        continue: props.item.id ? `${window.location.origin}${routes.user(props.item.id)}` : undefined,
                    })}
                >
                    Meet {fromUserName(props.item.name).names?.[0]}
                </Button>
            </div>
        </ViewAmieItemWrapper>
    );
}

export default ViewAmieItem;