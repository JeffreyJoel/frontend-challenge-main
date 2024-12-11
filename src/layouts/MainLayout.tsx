"use client";

import { FunctionComponent, PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { NavBar } from "@/components/shared/NavBar";


const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = ({ children }) => {


  return (
    <>
    <NavBar/>
    <main
      className={classNames(
        inter.className
      )}
    >
      {children}
    </main>
    </>
  );
};
