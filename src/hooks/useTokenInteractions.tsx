import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { getProvider, readOnlyProvider } from "@/utils/connection/providers";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { getERC20Contract } from "@/utils/connection/contracts";

export const useERC20Token = (tokenAddress: string) => {
  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readWriteProvider = getProvider(walletProvider);

  const getTotalSupply = async () => {
    setLoading(true);
    setError(null);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : readOnlyProvider;
      const contract = getERC20Contract(signer, tokenAddress);
      const supply = await contract.totalSupply();
      console.log(supply);
      let formatted_supply = ethers.formatUnits(supply, 6);
      return  Number(formatted_supply).toFixed(2);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get total supply"
      );
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const getBalanceOf = async (userAddress?: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;
      const contract = getERC20Contract(signer, tokenAddress);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error("No address provided");

      const balance = await contract.balanceOf(targetAddress);

      let formatted_balance = ethers.formatUnits(balance, 6);
      return  Number(formatted_balance).toFixed(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get balance");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Approve
  const approve = async (spender: string, amount: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;
      const contract = getERC20Contract(signer, tokenAddress);
      const parsedAmount = ethers.parseUnits(amount, 6);
      const tx = await contract.approve(spender, parsedAmount);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Approval failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Transfer
  const transfer = async (recipient: string, amount: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;
      const contract = getERC20Contract(signer, tokenAddress);
      const parsedAmount = ethers.parseUnits(amount, 6);
      const tx = await contract.transfer(recipient, parsedAmount);
      await tx.wait();
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transfer failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get Allowance
  const getAllowance = async (spender: string) => {
    setLoading(true);
    setError(null);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;
      const contract = getERC20Contract(signer, tokenAddress);
      if (!isConnected) throw new Error("No account connected");

      const allowance = await contract.allowance(address, spender);
      return ethers.formatUnits(allowance);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get allowance");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get Token Info
  const getTokenInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const signer = readWriteProvider
        ? await readWriteProvider.getSigner()
        : null;
      const contract = getERC20Contract(signer, tokenAddress);
      const [name, symbol, decimals] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
      ]);
      return { name, symbol, decimals };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get token info");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getTotalSupply,
    getBalanceOf,
    approve,
    transfer,
    getAllowance,
    getTokenInfo,
    loading,
    error,
  };
};
