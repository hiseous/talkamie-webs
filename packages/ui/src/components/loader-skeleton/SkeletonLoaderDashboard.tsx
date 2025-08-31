import { ComponentPrimitiveProps } from "../../utils/types/global.types";
import EmptyBar from "./EmptyBar";
import EmptyCircle from "./EmptyCircle";

type SkeletonLoaderDashboardProps = ComponentPrimitiveProps;
const SkeletonLoaderDashboard = (props: SkeletonLoaderDashboardProps) => {
    return (
        <div className={`${props.className || ''} animate-pulse flex flex-col h-full`}>
            <div className="shrink-0 !h-[62px] md:!h-[72px]">
                <div className="md:hidden px-4 pt-4 flex items-center">
                    <div className="flex-1 pr-4">
                        <EmptyBar className="!h-10 !rounded-3xl" />
                    </div>
                    <EmptyCircle />
                </div>
                <EmptyBar className="hidden md:block !h-full !rounded-none" />
            </div>
            <div className="pt-2 md:pt-6 flex-1 flex h-full">
                <div className="hidden md:block px-4 w-[246px]">
                    <EmptyBar className="!h-60 !rounded-2xl" />
                    <EmptyBar className="mt-4 !h-14 !rounded-2xl" />
                    <div className="mt-16">
                        {
                            Array.from({length: 3}).map((unknown, i) => {
                                return (
                                    <div
                                        key={`${i}_${unknown}`}
                                        className={`${i > 0 ? 'mt-4' : ''} flex items-center`}
                                    >
                                        <EmptyCircle size="xsm" className="!rounded-none" />
                                        <div className="flex-1 pl-4">
                                            <EmptyBar className="max-w-[400px]" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mt-12 flex items-center">
                        <EmptyCircle size="xsm" />
                        <div className="flex-1 pl-4">
                            <EmptyBar className="!h-10" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-full px-4 md:px-8">
                    {/* <EmptyArena /> */}
                    <EmptyBar className="mt-4 !h-32 md:!h-80" />
                    {/* <EmptyPost className="mt-4" /> */}
                    <EmptyBar className="mt-4 !h-32 md:!h-80" />
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoaderDashboard;