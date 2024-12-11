"use client";

import { NextPage } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useERC20Token } from "@/hooks/useTokenInteractions";
import { useEffect, useState } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TokenTransactionsTable from "@/components/token-interaction/TokenTransactions";

const TokenInteraction: NextPage = () => {
  const tokenAddress = "0x036CbD53842c5426634e7929541eC2318f3dCF7e"; // usdc on base
  const { isConnected, address } = useAppKitAccount();
  const {
    getTokenInfo,
    getBalanceOf,
    getTotalSupply,
    transfer,
    approve,
    loading,
    error,
  } = useERC20Token(tokenAddress);

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [userBalance, setUserBalance] = useState<string | null>("Loading...");
  const [totalSupply, setTotalSupply] = useState<string | null>("Loading...");
  const [decimals, setDecimals] = useState("Loading...");
  const [symbol, setSymbol] = useState("Loading...");
  const [name, setName] = useState("Loading...");

  const fetchTokenInfo = async () => {
    const tokenInfo = await getTokenInfo();
    setDecimals(tokenInfo?.decimals);
    setSymbol(tokenInfo?.symbol);
    setName(tokenInfo?.name);
  };

  const fetchBalance = async () => {
    const fetchedBalance = await getBalanceOf(address as string);
    setUserBalance(fetchedBalance);
  };

  const fetchTotalSupply = async () => {
    const fetchedSupply = await getTotalSupply();
    setTotalSupply(fetchedSupply);
    console.log(fetchedSupply);
  };

  useEffect(() => {
    if (isConnected) {
      fetchTokenInfo();
      fetchBalance();
      fetchTotalSupply();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const handleTransfer = async () => {
    const tx = await transfer(recipient, amount);
    if (tx) {
      alert("Transfer successful!");
      fetchBalance();
    }
  };

  const handleApprove = async () => {
    const tx = await approve(recipient, amount);
    if (tx) {
      alert("Approval successful!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {isConnected ? (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Token Name: {name}</h1>
            </div>
          </div>

          {/* Token Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Token Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className=" border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-gray-400">Total Supply</p>
                    <p className="text-xl">
                      {totalSupply} {symbol}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className=" border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-gray-400">Owned by you</p>
                    <p className="text-xl">
                      {userBalance} {symbol}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className=" border-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-1">
                    <p className="text-gray-400">Decimals</p>
                    <p className="text-xl">6</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4 grid  md:grid-cols-5 gap-24">
            <div className="mt-8 md:col-span-2">
              <h2 className="text-xl mb-8 font-semibold">Actions</h2>
              <div className="flex flex-col gap-4">
                <Label className="text-sm font-medium text-gray-200">
                  Recipient
                </Label>
                <Input
                  type="text"
                  placeholder="Recipient Address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-700 text-white"
                />
                <Label className="text-sm font-medium text-gray-200">
                  Amount
                </Label>
                <Input
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="px-4 py-2 rounded border border-gray-700 text-white"
                />
                <div className="flex gap-4">
                  <Button onClick={handleTransfer} disabled={loading}>
                    Transfer
                  </Button>
                  <Button onClick={handleApprove} disabled={loading}>
                    Approve
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 md:col-span-3">
              <h2 className="text-xl font-semibold">Transactions</h2>
              <div className="mt-8">
                <TokenTransactionsTable tokenAddress={tokenAddress} userAddress={address} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mt-12 items-center justify-center">
          <p className="text-gray-400 text-lg">
            Please connect your wallet to view this page.
          </p>
        </div>
      )}
    </div>
  );
};

export default TokenInteraction;
