import AccountProfileReviews from "@repo/ui/components/account/AccountProfileReviews";
import HeadingAndBackButtonVar1 from "@repo/ui/components/heading/HeadingAndBackButtonVar1";

export default function Page(){
  return (
    <>
      <HeadingAndBackButtonVar1>
          Reviews
      </HeadingAndBackButtonVar1>
      <AccountProfileReviews className="mt-4" />
    </>
  )
}