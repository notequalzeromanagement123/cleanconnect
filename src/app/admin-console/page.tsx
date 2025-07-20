"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  Users,
  LogOut,
  BellRing,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Shield,
  Settings,
  BarChart3,
  UserCheck,
  AlertCircle,
  ArrowRight,
  Activity
} from "lucide-react";

interface Analytics {
  totalUsers: number;
  totalHotels: number;
  totalCleaners: number;
  totalJobs: number;
  completedJobs: number;
  totalRevenue: number;
  monthlyGrowth: number;
  activeDisputes: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  const [analytics] = useState<Analytics>({
    totalUsers: 156,
    totalHotels: 42,
    totalCleaners: 114,
    totalJobs: 1248,
    completedJobs: 1156,
    totalRevenue: 284750,
    monthlyGrowth: 12.5,
    activeDisputes: 2,
    pendingApprovals: 5
  });

  useEffect(() => {
    setUserEmail("admin@cleanconnect.com");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  const navigationCards = [
    {
      title: "User Management",
      description: "Manage hotels, cleaners, and their accounts",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      route: "/admin-console/users",
      stats: `${analytics.totalUsers} total users`
    },
    {
      title: "Job Monitoring",
      description: "Track jobs, disputes, and service quality",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      route: "/admin-console/jobs",
      stats: `${analytics.totalJobs} total jobs`
    },
    {
      title: "Analytics & Reports",
      description: "Platform performance and business insights",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      route: "/admin-console/analytics",
      stats: `$${analytics.totalRevenue.toLocaleString()} revenue`
    },
    {
      title: "Platform Settings",
      description: "System configuration and platform policies",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      route: "/admin-console/settings",
      stats: "System configuration"
    },
    {
      title: "Financial Management",
      description: "Payment processing, commissions, and payouts",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      route: "/admin-console/finance",
      stats: `${analytics.monthlyGrowth}% growth`
    },
    {
      title: "Quality Assurance",
      description: "Reviews, ratings, and service quality monitoring",
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      route: "/admin-console/quality",
      stats: "4.8★ avg rating"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {analytics.activeDisputes > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">{analytics.activeDisputes} disputes</span>
                </div>
              )}
              {analytics.pendingApprovals > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 rounded-full">
                  <UserCheck className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">{analytics.pendingApprovals} pending</span>
                </div>
              )}
              <Button variant="ghost" size="sm">
                <BellRing className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers}</p>
                  <p className="text-xs text-green-600">+{analytics.monthlyGrowth}% this month</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalJobs - analytics.completedJobs}</p>
                  <p className="text-xs text-gray-500">{analytics.completedJobs} completed</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    Growing
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">92.6%</p>
                  <p className="text-xs text-green-600">Excellent performance</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => router.push("/admin-console/users")}>
              <UserCheck className="h-4 w-4 mr-2" />
              Approve Pending Users
            </Button>
            <Button variant="outline" onClick={() => router.push("/admin-console/jobs")}>
              <AlertCircle className="h-4 w-4 mr-2" />
              Resolve Disputes
            </Button>
            <Button variant="outline" onClick={() => router.push("/admin-console/analytics")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline" onClick={() => router.push("/admin-console/finance")}>
              <DollarSign className="h-4 w-4 mr-2" />
              Process Payouts
            </Button>
          </div>
        </div>

        {/* Management Modules */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Management Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={card.title}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => router.push(card.route)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${card.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-lg">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{card.stats}</span>
                      <Button variant="ghost" size="sm">
                        Open <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest platform events and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Job completed successfully</p>
                <p className="text-xs text-gray-500">Grand Plaza Hotel • Sarah Johnson • 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New hotel registration approved</p>
                <p className="text-xs text-gray-500">Luxury Suites Downtown • 4 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Dispute reported</p>
                <p className="text-xs text-gray-500">Business Inn cleaning job • Requires review • 6 hours ago</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Building2 className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New cleaner application</p>
                <p className="text-xs text-gray-500">Mike Thompson • Pending verification • 8 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
