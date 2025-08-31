import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import AccountProfile from "./AccountProfile";

const AccountProfilePage = () => {
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Profile Details
            </HeadingAndBackButtonVar1>
            <AccountProfile className="mt-4" />
        </>
    );
}

export default AccountProfilePage;