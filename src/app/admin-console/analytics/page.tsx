"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Activity,
  Star,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";

interface AnalyticsData {
  revenue: {
    total: number;
    growth: number;
    monthly: { month: string; amount: number; }[];
  };
  users: {
    total: number;
    growth: number;
    hotels: number;
    cleaners: number;
    retention: number;
  };
  jobs: {
    total: number;
    completed: number;
    successRate: number;
    avgRating: number;
    completionTime: number;
  };
  performance: {
    topCleaners: { name: string; rating: number; jobs: number; earnings: number; }[];
    topHotels: { name: string; jobsPosted: number; totalSpent: number; avgRating: number; }[];
    busyDays: { day: string; jobs: number; }[];
  };
}

export default function Analytics() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("7d");

  const [analytics] = useState<AnalyticsData>({
    revenue: {
      total: 284750,
      growth: 12.5,
      monthly: [
        { month: "Jan", amount: 45000 },
        { month: "Feb", amount: 52000 },
        { month: "Mar", amount: 48000 },
        { month: "Apr", amount: 61000 },
        { month: "May", amount: 58000 },
        { month: "Jun", amount: 65000 }
      ]
    },
    users: {
      total: 156,
      growth: 8.3,
      hotels: 42,
      cleaners: 114,
      retention: 89.2
    },
    jobs: {
      total: 1248,
      completed: 1156,
      successRate: 92.6,
      avgRating: 4.8,
      completionTime: 3.2
    },
    performance: {
      topCleaners: [
        { name: "Sarah Johnson", rating: 4.9, jobs: 87, earnings: 8750 },
        { name: "Mike Wilson", rating: 4.7, jobs: 62, earnings: 6200 },
        { name: "Emily Davis", rating: 4.8, jobs: 54, earnings: 5940 },
        { name: "Alex Rivera", rating: 4.6, jobs: 48, earnings: 4800 },
        { name: "Maria Garcia", rating: 4.5, jobs: 41, earnings: 4510 }
      ],
      topHotels: [
        { name: "Grand Plaza Hotel", jobsPosted: 45, totalSpent: 15750, avgRating: 4.9 },
        { name: "Sunset Resort", jobsPosted: 38, totalSpent: 11400, avgRating: 4.7 },
        { name: "Luxury Suites", jobsPosted: 32, totalSpent: 12800, avgRating: 4.8 },
        { name: "Business Inn", jobsPosted: 28, totalSpent: 8400, avgRating: 4.5 },
        { name: "City Center Hotel", jobsPosted: 24, totalSpent: 10080, avgRating: 4.6 }
      ],
      busyDays: [
        { day: "Monday", jobs: 28 },
        { day: "Tuesday", jobs: 32 },
        { day: "Wednesday", jobs: 25 },
        { day: "Thursday", jobs: 30 },
        { day: "Friday", jobs: 35 },
        { day: "Saturday", jobs: 22 },
        { day: "Sunday", jobs: 18 }
      ]
    }
  });

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    format = "number",
    trend = "up"
  }: {
    title: string;
    value: number;
    change: number;
    icon: React.ComponentType<{ className?: string }>;
    format?: "number" | "currency" | "percentage";
    trend?: "up" | "down";
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case "currency": return `$${val.toLocaleString()}`;
        case "percentage": return `${val}%`;
        default: return val.toLocaleString();
      }
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{formatValue(value)}</p>
              <div className="flex items-center mt-1">
                {trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {change}% from last period
                </span>
              </div>
            </div>
            <Icon className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  };

  const TopPerformerCard = ({
    title,
    items,
    type
  }: {
    title: string;
    items: { name: string; rating?: number; avgRating?: number; jobs?: number; jobsPosted?: number; earnings?: number; totalSpent?: number; }[];
    type: "cleaner" | "hotel"
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {type === "cleaner" ? (
            <Users className="h-5 w-5 text-green-600" />
          ) : (
            <Building2 className="h-5 w-5 text-blue-600" />
          )}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{type === "cleaner" ? item.rating : item.avgRating}</span>
                    <span>•</span>
                    <span>{type === "cleaner" ? `${item.jobs} jobs` : `${item.jobsPosted} jobs`}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">
                  ${type === "cleaner" ? item.earnings : item.totalSpent}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-gray-600">Platform performance and business insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={analytics.revenue.total}
            change={analytics.revenue.growth}
            icon={DollarSign}
            format="currency"
          />
          <MetricCard
            title="Total Users"
            value={analytics.users.total}
            change={analytics.users.growth}
            icon={Users}
          />
          <MetricCard
            title="Job Success Rate"
            value={analytics.jobs.successRate}
            change={2.3}
            icon={Target}
            format="percentage"
          />
          <MetricCard
            title="Average Rating"
            value={analytics.jobs.avgRating}
            change={1.2}
            icon={Star}
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Platform Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Jobs</span>
                    <span className="font-semibold">{analytics.jobs.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-green-600">{analytics.jobs.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <span className="font-semibold">{analytics.jobs.avgRating} ⭐</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Completion Time</span>
                    <span className="font-semibold">{analytics.jobs.completionTime} hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Retention</span>
                    <span className="font-semibold text-green-600">{analytics.users.retention}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Weekly Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.performance.busyDays.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{day.day}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(day.jobs / 35) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{day.jobs}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.revenue.monthly.map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{month.month}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full"
                              style={{ width: `${(month.amount / 65000) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-16 text-right">
                            ${(month.amount / 1000).toFixed(0)}k
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Platform Commission</span>
                    <span className="font-semibold">$28,475</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subscription Fees</span>
                    <span className="font-semibold">$12,350</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Premium Features</span>
                    <span className="font-semibold">$8,920</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-green-600">${analytics.revenue.total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Hotels</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(analytics.users.hotels / analytics.users.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{analytics.users.hotels}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Cleaners</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(analytics.users.cleaners / analytics.users.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{analytics.users.cleaners}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Users (7d)</span>
                    <span className="font-semibold">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Users (30d)</span>
                    <span className="font-semibold">76%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">User Retention</span>
                    <span className="font-semibold text-green-600">{analytics.users.retention}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Session Duration</span>
                    <span className="font-semibold">12 min</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopPerformerCard
                title="Top Performing Cleaners"
                items={analytics.performance.topCleaners}
                type="cleaner"
              />
              <TopPerformerCard
                title="Top Spending Hotels"
                items={analytics.performance.topHotels}
                type="hotel"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
