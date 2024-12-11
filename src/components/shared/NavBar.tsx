"use client";

import Link from "next/link";
import ConnectButton from "./ConnectButton";

// import ConnectButton from "./connect-button";

export const NavBar = () => {
  return (
    <>
      <header className="container mx-auto px-4 py-8 sm:w-11/12 md:w-10/12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-white font-bold text-xl flex items-center">
            Ongrid-Test
          </div>
        </Link>
        <nav className="md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white text-lg hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/token-interaction"
            className="text-white text-lg hover:text-blue-500 transition-colors"
          >
            Token
          </Link>
        </nav>

        <ConnectButton />
      </header>
    </>
  );
};
