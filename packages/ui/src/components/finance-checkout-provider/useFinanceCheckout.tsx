'use client';

import { useContext } from "react";
import { FinanceCheckoutContext } from "./FinanceCheckoutProvider";

export const useFinanceCheckout = () => {
    return useContext(FinanceCheckoutContext)
}
