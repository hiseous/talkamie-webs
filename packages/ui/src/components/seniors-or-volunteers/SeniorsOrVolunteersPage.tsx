import HomeHeader from "../home/HomeHeader";
import DocWrapperVar1 from "../wrapper/DocWrapperVar1";
import SeniorsOrVolunteers from "./SeniorsOrVolunteers";

const SeniorsOrVolunteersPage = () => {
    
    return (
        <DocWrapperVar1
            // className={`${props.className || ''}`}
        >
            <HomeHeader />
            {/* <div className="relative text-blackVar4 font-semibold text-base">
                <BackButton
                    theme="red"
                />
                <div className={`absolute ${__classNames.posCenter}`}>Volunteers</div>
            </div> */}
            <SeniorsOrVolunteers
                className="mt-6"
                // type={props.type}
            />
        </DocWrapperVar1>
    );
}

export default SeniorsOrVolunteersPage;