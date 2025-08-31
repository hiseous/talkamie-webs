'use client';

import { useFinanceCheckout } from "../finance-checkout-provider/useFinanceCheckout";
import HeadingAndBackButtonVar1 from "../heading/HeadingAndBackButtonVar1";
import SkeletonLoaderVolunteers from "../loader-skeleton/SkeletonLoaderVolunteers";
import NoResult from "../node/NoResult";
import CheckoutTransaction from "./CheckoutTransaction";

type FinanceCheckoutPageProps = {
    type: 'success' | 'cancel';
}
const FinanceCheckoutPage = (props: FinanceCheckoutPageProps) => {
    const context = useFinanceCheckout();
    const transaction = context?.data?.transaction;
    
    return (
        <>
            <HeadingAndBackButtonVar1>
                Payment Checkout
            </HeadingAndBackButtonVar1>
            <div className="flex-1">
                {
                    context?.loading === false ?
                    <div className="h-full">
                        {
                            transaction?.id ?
                            <CheckoutTransaction
                                item={transaction}
                                type={props.type}
                                className="h-full"
                            /> :
                            <NoResult
                                label="We couldn't find that transaction"
                            />
                        }
                    </div> :
                    context?.loading ?
                    <>
                        <SkeletonLoaderVolunteers count={1} />
                    </> :
                    <>
                    
                    </>
                }
            </div>
        </>
    );
}

export default FinanceCheckoutPage;