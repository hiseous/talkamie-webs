
import { UserProfileProvider } from "@repo/ui/components/user-profile-provider/UserProfileProvider";
import UserProfileLayout from "@repo/ui/components/user-profile/UserProfileLayout";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps){
  return (
    <>
      <UserProfileProvider>
        <UserProfileLayout>
          {props.children}
        </UserProfileLayout>
      </UserProfileProvider>
    </>
  )
}