import Navigate from "@repo/ui/components/node/Navigate";
import { __routes } from "@repo/ui/utils/constants/app-routes";

export default function Page(){
  return (
    <>
      <Navigate to={__routes.chats()} />
    </>
  )
}