import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TokenTransaction {
  transactionHash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  type: 'send' | 'receive';
}

const TokenTransactionsTable: React.FC<{ 
  tokenAddress: string, 
  userAddress: string | undefined 
}> = ({ tokenAddress, userAddress }) => {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenTransactions = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_BASESCAN_API_KEY;
        const url = `https://api-sepolia.basescan.org/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${userAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "1" && data.result.length > 0) {
          const formattedTransactions: TokenTransaction[] = data.result.map((tx: any) => ({
            transactionHash: tx.hash,
            blockNumber: parseInt(tx.blockNumber, 10),
            from: tx.from,
            to: tx.to,
            value: ethers.formatUnits(tx.value, parseInt(tx.tokenDecimal, 10)),
            timestamp: parseInt(tx.timeStamp, 10) * 1000,
            type: tx.to.toLowerCase() === userAddress?.toLowerCase() ? 'receive' : 'send'
          }));

          setTransactions(formattedTransactions);
        } else {
          setError(data.message || 'Failed to fetch transactions');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('An error occurred while fetching transactions');
      } finally {
        setLoading(false);
      }
    };

    if (userAddress && tokenAddress) {
      fetchTokenTransactions();
    }
  }, [userAddress, tokenAddress]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.transactionHash}>
                <TableCell>
                  <span className={
                    tx.type === 'receive' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }>
                    {tx.type === 'receive' ? 'Received' : 'Sent'}
                  </span>
                </TableCell>
                <TableCell>{truncateAddress(tx.from)}</TableCell>
                <TableCell>{truncateAddress(tx.to)}</TableCell>
                <TableCell>{parseFloat(tx.value).toFixed(4)}</TableCell>
                <TableCell>{formatDate(tx.timestamp)}</TableCell>
                <TableCell>
                  <a 
                    href={`https://sepolia.basescan.org/tx/${tx.transactionHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TokenTransactionsTable;
