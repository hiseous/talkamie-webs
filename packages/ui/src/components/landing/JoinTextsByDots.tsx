import { Fragment } from "react/jsx-runtime";
import { ComponentPrimitiveProps } from "../../utils/types/global.types";

type JoinTextsByDotsProps = ComponentPrimitiveProps & {
    texts?: string[]
};

const JoinTextsByDots = (props: JoinTextsByDotsProps) => {
    
    return (
        <>
            {
                props.texts?.length ?
                <div className={`${props.className || ''} flex items-center md:justify-center`}>
                    {
                        props.texts.map((text, i) => {
                            return (
                                <Fragment
                                    key={i}
                                >
                                    <div>{text}</div>
                                    {
                                        (i < ((props.texts?.length ?? 0) - 1)) ?
                                        <div
                                            className="shrink-0 w-0 h-0 p-[6px] md:p-3 bg-redVar1 rounded-full mx-3 md:mx-6"
                                        ></div> : undefined
                                    }
                                </Fragment>
                            )
                        })
                    }
                </div> : undefined
            }
        </>
    );
}

export default JoinTextsByDots;