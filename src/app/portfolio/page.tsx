"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

// Mock data for demonstration
const assets = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    amount: 0.5,
    value: 15000,
    costBasis: 14000,
    currentPrice: 30000,
    avgPrice: 28000,
    change1h: 0.5,
    change24h: 2.5,
    color: "#F7931A",
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    amount: 5,
    value: 10000,
    costBasis: 11000,
    currentPrice: 2000,
    avgPrice: 2200,
    change1h: -0.2,
    change24h: -1.2,
    color: "#627EEA",
  },
  {
    id: 3,
    name: "Cardano",
    symbol: "ADA",
    amount: 1000,
    value: 500,
    costBasis: 450,
    currentPrice: 0.5,
    avgPrice: 0.45,
    change1h: 0.3,
    change24h: 0.8,
    color: "#0033AD",
  },
];

const initialTransactions = [
  {
    id: 1,
    assetId: 1,
    type: "Buy",
    amount: 0.1,
    price: 30000,
    total: 3000,
    date: "2023-01-15",
  },
  {
    id: 2,
    assetId: 1,
    type: "Sell",
    amount: 0.05,
    price: 35000,
    total: 1750,
    date: "2023-03-20",
  },
  {
    id: 3,
    assetId: 2,
    type: "Buy",
    amount: 2,
    price: 1800,
    total: 3600,
    date: "2023-02-10",
  },
  {
    id: 4,
    assetId: 3,
    type: "Buy",
    amount: 500,
    price: 0.5,
    total: 250,
    date: "2023-04-05",
  },
];

export default function UltimateCryptoPortfolio() {
  const [expandedAsset, setExpandedAsset] = useState<number | null>(null);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [transactions, setTransactions] = useState(initialTransactions);

  const toggleAsset = (assetId: number) => {
    setExpandedAsset(expandedAsset === assetId ? null : assetId);
  };

  const handleAddTransaction = (assetId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedAsset(assetId);
    setIsAddingTransaction(true);
  };

  const closeAddTransactionDialog = () => {
    setIsAddingTransaction(false);
    setSelectedAsset(null);
  };

  const handleDeleteTransaction = (transactionId: number) => {
    setTransactions(transactions.filter((t) => t.id !== transactionId));
  };

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalCostBasis = assets.reduce(
    (sum, asset) => sum + asset.costBasis,
    0
  );
  const totalProfit = totalValue - totalCostBasis;
  const totalProfitPercentage = (totalProfit / totalCostBasis) * 100;

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-[60vh] transition-colors duration-300">
        <div className="container mx-auto p-4 space-y-8">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Crypto Portfolio</h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Total Value</h2>
                <p className="text-3xl font-bold">
                  ${totalValue.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Cost Basis</h2>
                <p className="text-3xl font-bold">
                  ${totalCostBasis.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Total Profit/Loss
                </h2>
                <p
                  className={`text-3xl font-bold ${
                    totalProfit >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {totalProfit >= 0 ? "+" : "-"}$
                  {Math.abs(totalProfit).toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Profit Percentage
                </h2>
                <p
                  className={`text-3xl font-bold ${
                    totalProfitPercentage >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {totalProfitPercentage >= 0 ? "+" : "-"}
                  {Math.abs(totalProfitPercentage).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Your Assets</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <th className="p-2">Asset</th>
                      <th className="p-2">Current Price</th>
                      <th className="p-2">Avg Price</th>
                      <th className="p-2">Quantity</th>
                      <th className="p-2">Value</th>
                      <th className="p-2">Profit/Loss</th>
                      <th className="p-2">1h Change</th>
                      <th className="p-2">24h Change</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <React.Fragment key={asset.id}>
                        <tr
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer   rounded-md"
                          onClick={() => toggleAsset(asset.id)}
                        >
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-8 h-8 rounded-full"
                                style={{ backgroundColor: asset.color }}
                              />
                              <div>
                                <p className="font-semibold">{asset.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {asset.symbol}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            ${asset.currentPrice.toLocaleString()}
                          </td>
                          <td className="p-2">
                            ${asset.avgPrice.toLocaleString()}
                          </td>
                          <td className="p-2">{asset.amount}</td>
                          <td className="p-2">
                            ${asset.value.toLocaleString()}
                          </td>
                          <td
                            className={`p-2 ${
                              asset.value - asset.costBasis >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {asset.value - asset.costBasis >= 0 ? "+" : "-"}$
                            {Math.abs(
                              asset.value - asset.costBasis
                            ).toLocaleString()}
                          </td>
                          <td
                            className={`p-2 ${
                              asset.change1h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {asset.change1h >= 0 ? (
                              <TrendingUp className="inline w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="inline w-4 h-4 mr-1" />
                            )}
                            {asset.change1h}%
                          </td>
                          <td
                            className={`p-2 ${
                              asset.change24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {asset.change24h >= 0 ? (
                              <TrendingUp className="inline w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="inline w-4 h-4 mr-1" />
                            )}
                            {asset.change24h}%
                          </td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) =>
                                        handleAddTransaction(asset.id, e)
                                      }
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Add Transaction</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <Button variant="ghost" size="sm">
                                {expandedAsset === asset.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                        <AnimatePresence>
                          {expandedAsset === asset.id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td colSpan={10} className="p-2">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                  <h4 className="font-semibold mb-2">
                                    Transactions
                                  </h4>
                                  <div className="space-y-2 border dark:border-gray-300 ">
                                    {transactions
                                      .filter((t) => t.assetId === asset.id)
                                      .map((transaction) => (
                                        <div
                                          key={transaction.id}
                                          className="bg-white dark:bg-gray-700 rounded-lg p-3 text-sm flex justify-between items-center shadow-sm"
                                        >
                                          <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                              transaction.type === "Buy"
                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                            }`}
                                          >
                                            {transaction.type}
                                          </span>
                                          <span>
                                            {transaction.amount} {asset.symbol}
                                          </span>
                                          <span>
                                            $
                                            {transaction.price.toLocaleString()}
                                          </span>
                                          <span>
                                            $
                                            {transaction.total.toLocaleString()}
                                          </span>
                                          <span className="text-gray-500 dark:text-gray-400">
                                            {transaction.date}
                                          </span>
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="destructive"
                                                  size="sm"
                                                  onClick={() =>
                                                    handleDeleteTransaction(
                                                      transaction.id
                                                    )
                                                  }
                                                >
                                                  <Trash2 className="h-4 w-4" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>Delete Transaction</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog
        open={isAddingTransaction}
        onOpenChange={closeAddTransactionDialog}
      >
        <DialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Add a new transaction for{" "}
              {assets.find((a) => a.id === selectedAsset)?.name}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="type">Transaction Type</Label>
              <Select>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="price">Price per coin</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
            <Button type="submit">Add Transaction</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
