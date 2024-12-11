"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import { Button } from "@/components/Button";
import { useEffect, useState } from "react";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { isConnected } = useAppKitAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && isConnected ? (
        <appkit-button />
      ) : (
        <Button
          onClick={() => open()}
          className="bg-blue-700 px-6 py-2 font-medium text-white text-md rounded-3xl hover:bg-blue-600/90"
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
