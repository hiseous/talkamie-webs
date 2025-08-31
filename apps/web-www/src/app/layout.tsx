import "@repo/ui/styles.css";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import "rsuite/dist/rsuite-no-reset.min.css";
// import 'react-toastify/dist/ReactToastify.min.css';
import { __classSelectors } from "@repo/ui/utils/constants/querySelectors";
import { __classNames } from "@repo/ui/utils/constants/classNames";
import RootLayout from "@repo/ui/components/root/RootLayout";
import { Suspense } from "react";
import { getMetadata } from "@repo/ui/utils/funcs/dom/doc-title";
import { ToastContainer } from "react-toastify";
import { Familjen_Grotesk } from "next/font/google";
import { Metadata } from "next";


export const metadata: Metadata = getMetadata();
const grotesk = Familjen_Grotesk({subsets: ['latin']});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${__classSelectors.appBodyClass} ${__classNames.screenH} overflow-y-auto customScrollbar ${grotesk.className}`}>
        <Suspense>
          <RootLayout>
            {children}
          </RootLayout>
          <ToastContainer />
        </Suspense>
      </body>
    </html>
  );
}
