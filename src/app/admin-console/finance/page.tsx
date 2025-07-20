"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  TrendingUp,
  Download,
  Search,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Wallet,
  PieChart,
  Building2,
  Users
} from "lucide-react";

interface Transaction {
  id: string;
  type: "payment" | "payout" | "commission" | "refund";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  description: string;
  user: string;
  userType: "hotel" | "cleaner";
  jobId?: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalPayouts: number;
  totalCommissions: number;
  pendingPayouts: number;
  balance: number;
  monthlyGrowth: number;
}

export default function FinancialManagement() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [summary] = useState<FinancialSummary>({
    totalRevenue: 284750,
    totalPayouts: 241438,
    totalCommissions: 28475,
    pendingPayouts: 8420,
    balance: 52732,
    monthlyGrowth: 12.5
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "payment",
      amount: 350,
      status: "completed",
      date: "2025-01-13",
      description: "3rd Floor Deep Cleaning - Grand Plaza Hotel",
      user: "Grand Plaza Hotel",
      userType: "hotel",
      jobId: "job_001"
    },
    {
      id: "2",
      type: "payout",
      amount: 315,
      status: "completed",
      date: "2025-01-13",
      description: "Cleaner payout for completed job",
      user: "Sarah Johnson",
      userType: "cleaner",
      jobId: "job_001"
    },
    {
      id: "3",
      type: "commission",
      amount: 35,
      status: "completed",
      date: "2025-01-13",
      description: "Platform commission (10%)",
      user: "CleanConnect",
      userType: "hotel"
    },
    {
      id: "4",
      type: "payment",
      amount: 250,
      status: "completed",
      date: "2025-01-14",
      description: "Resort Suite Morning Clean - Sunset Resort",
      user: "Sunset Resort",
      userType: "hotel",
      jobId: "job_002"
    },
    {
      id: "5",
      type: "payout",
      amount: 225,
      status: "pending",
      date: "2025-01-14",
      description: "Cleaner payout pending for job completion",
      user: "Mike Wilson",
      userType: "cleaner",
      jobId: "job_002"
    },
    {
      id: "6",
      type: "refund",
      amount: 180,
      status: "completed",
      date: "2025-01-11",
      description: "Refund for disputed job - Business Inn",
      user: "Business Inn",
      userType: "hotel",
      jobId: "job_003"
    },
    {
      id: "7",
      type: "payment",
      amount: 400,
      status: "completed",
      date: "2025-01-12",
      description: "Luxury Suite Premium Clean - Luxury Suites",
      user: "Luxury Suites",
      userType: "hotel",
      jobId: "job_004"
    },
    {
      id: "8",
      type: "payout",
      amount: 360,
      status: "pending",
      date: "2025-01-12",
      description: "Cleaner payout pending verification",
      user: "Emily Davis",
      userType: "cleaner",
      jobId: "job_004"
    }
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const pendingPayouts = filteredTransactions.filter(t => t.type === "payout" && t.status === "pending");
  const completedTransactions = filteredTransactions.filter(t => t.status === "completed");
  const failedTransactions = filteredTransactions.filter(t => t.status === "failed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment": return "bg-blue-100 text-blue-800";
      case "payout": return "bg-green-100 text-green-800";
      case "commission": return "bg-purple-100 text-purple-800";
      case "refund": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment": return CreditCard;
      case "payout": return Send;
      case "commission": return PieChart;
      case "refund": return AlertCircle;
      default: return DollarSign;
    }
  };

  const handleProcessPayout = (transactionId: string) => {
    console.log(`Processing payout ${transactionId}`);
  };

  const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
    const TypeIcon = getTypeIcon(transaction.type);

    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <TypeIcon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{transaction.user}</span>
                  <span>•</span>
                  <span>{transaction.date}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${transaction.amount.toLocaleString()}
              </p>
              <div className="flex space-x-2">
                <Badge className={getTypeColor(transaction.type)}>
                  {transaction.type}
                </Badge>
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>

          {transaction.type === "payout" && transaction.status === "pending" && (
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleProcessPayout(transaction.id)}
              >
                <Send className="h-4 w-4 mr-2" />
                Process Payout
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/admin-console")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
                <p className="text-gray-600">Payment processing, commissions, and payouts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {pendingPayouts.length > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">{pendingPayouts.length} pending payouts</span>
                </div>
              )}
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Financial Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${summary.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{summary.monthlyGrowth}% this month</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Payouts</p>
                  <p className="text-2xl font-bold text-gray-900">${summary.totalPayouts.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">To cleaners</p>
                </div>
                <Send className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Commission</p>
                  <p className="text-2xl font-bold text-gray-900">${summary.totalCommissions.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">10% of transactions</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Balance</p>
                  <p className="text-2xl font-bold text-gray-900">${summary.balance.toLocaleString()}</p>
                  <p className="text-xs text-yellow-600">${summary.pendingPayouts.toLocaleString()} pending</p>
                </div>
                <Wallet className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Financial flow analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Hotel Payments</span>
                </div>
                <span className="font-bold text-blue-600">${summary.totalRevenue.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Cleaner Payouts</span>
                </div>
                <span className="font-bold text-green-600">-${summary.totalPayouts.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Platform Commission</span>
                </div>
                <span className="font-bold text-purple-600">+${summary.totalCommissions.toLocaleString()}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Net Balance</span>
                  <span className="font-bold text-green-600">${summary.balance.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <span className="text-sm">Pending Payouts</span>
                <span className="font-semibold text-yellow-600">{pendingPayouts.length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">Failed Transactions</span>
                <span className="font-semibold text-red-600">{failedTransactions.length}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">Completed Today</span>
                <span className="font-semibold text-green-600">
                  {completedTransactions.filter(t => t.date === "2025-01-14").length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
            >
              All
            </Button>
            <Button
              variant={filterType === "payment" ? "default" : "outline"}
              onClick={() => setFilterType("payment")}
            >
              Payments
            </Button>
            <Button
              variant={filterType === "payout" ? "default" : "outline"}
              onClick={() => setFilterType("payout")}
            >
              Payouts
            </Button>
            <Button
              variant={filterType === "commission" ? "default" : "outline"}
              onClick={() => setFilterType("commission")}
            >
              Commission
            </Button>
          </div>
        </div>

        {/* Transaction Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Transactions ({filteredTransactions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingPayouts.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTransactions.length})</TabsTrigger>
            <TabsTrigger value="failed">Failed ({failedTransactions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {filteredTransactions.map(transaction => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingPayouts.length > 0 ? (
              <div className="space-y-4">
                {pendingPayouts.map(transaction => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No pending payouts</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="space-y-4">
              {completedTransactions.map(transaction => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="failed" className="space-y-4">
            {failedTransactions.length > 0 ? (
              <div className="space-y-4">
                {failedTransactions.map(transaction => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No failed transactions</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
