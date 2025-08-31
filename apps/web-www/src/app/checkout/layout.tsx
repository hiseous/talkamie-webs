import { FinanceCheckoutProvider } from "@repo/ui/components/finance-checkout-provider/FinanceCheckoutProvider";
import DocWrapperVar1 from "@repo/ui/components/wrapper/DocWrapperVar1";

type LayoutProps = {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps){
  return (
    <>
      <FinanceCheckoutProvider>
        <DocWrapperVar1 className="h-full flex flex-col">
          {props.children}
        </DocWrapperVar1>
      </FinanceCheckoutProvider>
    </>
  )
}