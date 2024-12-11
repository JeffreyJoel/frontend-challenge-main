"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ConnectButton from "./ConnectButton";

export const NavBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div className="fixed top-0 z-50 w-full bg-opacity-30 backdrop-blur-lg backdrop-filter">
        <header className="container mx-auto px-4 py-8 sm:w-11/12 md:w-10/12 flex items-center justify-between">
          <div className="flex items-center space-x-16">
            <Link href="/">
              <div className="text-white font-bold text-xl flex items-center">
                Ongrid-Test
              </div>
            </Link>
            <nav className="md:flex items-center space-x-8">
              <Link
                href="/"
                className={`text-lg transition-colors ${
                  isActive("/") ? "text-blue-500" : "text-white hover:text-blue-500"
                }`}
              >
                Home
              </Link>
              <Link
                href="/token-interaction"
                className={`text-lg transition-colors ${
                  isActive("/token-interaction") ? "text-blue-500" : "text-white hover:text-blue-500"
                }`}
              >
                Token
              </Link>
            </nav>
          </div>
          <ConnectButton />
        </header>
      </div>
    </>
  );
};
