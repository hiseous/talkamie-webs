'use client';

import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import { useAppRoutes } from "../../utils/funcs/app-routes/useAppRoutes";
import BiggerButton from "../button/BiggerButton";
import HeadingText from "../heading/HeadingText";
import { userProps, userType } from "../../utils/types/user";
import { __imageAssets } from "../../assets/images/_index";
import AmyCardVar1 from "../user-cards/AmyCardVar1";
import { useRef } from "react";
import { useScaleUpOnScroll } from "../motions/useScaleUpOnScroll";

type amy = Pick<userProps, 'age' | 'verification' | 'name' | 'picture' | 'rating'>;
type LandingBody2Props = ComponentPrimitiveProps & {
    type?: userType; //default is volunteer;
    onProgress?: (progress: number) => void;
};

const LandingBody2 = (props: LandingBody2Props) => {
    const routes = useAppRoutes();
    const ref = useRef<HTMLDivElement | null>(null);
    useScaleUpOnScroll({
        targetRef: ref,
        onProgress: props.onProgress,
    });
    const seniorImgUrls = [
        `https://media.istockphoto.com/id/912073272/photo/happy-senior-man-sitting-at-home.jpg?s=612x612&w=0&k=20&c=O_e4_qWJJNvrRzU9pRvI3TiDbxpPUbHQxtA3D6eWZNs=`,
    ];

    const amies: amy[] = [
        {
            name: props.type ? `Gabriel Costa` : `Kate Shawn`,
            age: props.type ? 80 : 28,
            picture: {
                org: {
                    url: props.type === 'senior' ? seniorImgUrls[0] : __imageAssets.nurseFemale1Png.src,
                    mimeType: 'image',
                },
            },
            verification: {
                verified: true,
            },
            rating: 5,
        },
        {
            name: props.type === 'senior' ? `Rose Salah` : `Paul Simon`,
            age: props.type ? 94 : 32,
            picture: {
                org: {
                    url: props.type === 'senior' ?__imageAssets.elderWoman001Jpg.src : __imageAssets.nurseMale1Png.src,
                    mimeType: 'image',
                },
            },
            verification: {
                verified: true,
            },
            rating: 5,
        },
        {
            name: props.type === 'senior' ? `Daniel Perez` : `Annie Stella`,
            age: props.type ? 78 : 34,
            picture: {
                org: {
                    url: props.type === 'senior' ?__imageAssets.elderMan002Jpg.src : __imageAssets.nurseFemale2Png.src,
                    mimeType: 'image',
                },
            },
            verification: {
                verified: true,
            },
            rating: 5,
        },
    ];
    
    return (
        <div
            // onProgress={props.onProgress}
            ref={ref}
            className={`${props.className || ''} px-8 md:px-14 xl:px-24 xxl:px-36 mx-auto`}
        >
            <HeadingText size="sm" className="text-center text-redVar1">
                {`Who are the ${props.type === 'senior' ? 'Seniors' : 'Amies (Friends)'}?`}
            </HeadingText>
            <HeadingText className="max-w-[800px] text-center mx-auto mt-12">
                {
                    props.type === 'senior' ? `Lovely elderlies in need of your time` :
                    // `Friendly health care workers that have been background checked`
                    `Background checked health care workers`
                }
            </HeadingText>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {
                    amies.map((amy, i) => {
                        return (
                            <AmyCardVar1
                                key={i}
                                user={amy}
                                className="h-[500px] md:h-[700px]"
                            />
                        )
                    })
                }
            </div>
            <BiggerButton href={routes.auth(['sign-up'], {type: props.type === 'senior' ? 'volunteer' : 'senior'})} theme="red-gradient" className="mt-16">
                {`Talk to ${props.type === 'senior' ? 'a Senior' : 'an Amie (Friend)'}`}
            </BiggerButton>
        </div>
    );
}

export default LandingBody2;