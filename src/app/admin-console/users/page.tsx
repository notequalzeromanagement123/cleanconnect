"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Users,
  ArrowLeft,
  Search,
  Eye,
  UserCheck,
  UserX,
  Star,
  Calendar,
  Filter,
  Download
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "cleaner" | "hotel";
  status: "active" | "inactive" | "pending" | "suspended";
  joinDate: string;
  completedJobs?: number;
  rating?: number;
  hotelName?: string;
  location?: string;
  lastActive: string;
  earnings?: number;
}

export default function UserManagement() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Grand Plaza Hotel",
      email: "manager@grandplaza.com",
      phone: "+1 (555) 123-4567",
      type: "hotel",
      status: "active",
      joinDate: "2024-03-15",
      hotelName: "Grand Plaza Hotel",
      location: "Downtown",
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 234-5678",
      type: "cleaner",
      status: "active",
      joinDate: "2024-04-20",
      completedJobs: 87,
      rating: 4.9,
      lastActive: "1 hour ago",
      earnings: 8750
    },
    {
      id: "3",
      name: "Sunset Resort",
      email: "admin@sunsetresort.com",
      phone: "+1 (555) 345-6789",
      type: "hotel",
      status: "active",
      joinDate: "2024-02-10",
      hotelName: "Sunset Resort",
      location: "Seaside",
      lastActive: "30 minutes ago"
    },
    {
      id: "4",
      name: "Mike Wilson",
      email: "mike.w@email.com",
      phone: "+1 (555) 456-7890",
      type: "cleaner",
      status: "active",
      joinDate: "2024-05-03",
      completedJobs: 62,
      rating: 4.7,
      lastActive: "5 hours ago",
      earnings: 6200
    },
    {
      id: "5",
      name: "Business Inn",
      email: "contact@businessinn.com",
      phone: "+1 (555) 567-8901",
      type: "hotel",
      status: "pending",
      joinDate: "2025-01-08",
      hotelName: "Business Inn",
      location: "Corporate District",
      lastActive: "1 day ago"
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+1 (555) 678-9012",
      type: "cleaner",
      status: "pending",
      joinDate: "2025-01-09",
      completedJobs: 0,
      rating: 0,
      lastActive: "2 days ago",
      earnings: 0
    },
    {
      id: "7",
      name: "Tom Brown",
      email: "tom.b@email.com",
      phone: "+1 (555) 789-0123",
      type: "cleaner",
      status: "suspended",
      joinDate: "2024-06-15",
      completedJobs: 23,
      rating: 3.2,
      lastActive: "1 week ago",
      earnings: 2300
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const hotels = filteredUsers.filter(user => user.type === "hotel");
  const cleaners = filteredUsers.filter(user => user.type === "cleaner");
  const pendingUsers = filteredUsers.filter(user => user.status === "pending");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleUserAction = (userId: string, action: "approve" | "suspend" | "activate") => {
    // Mock action - in real app, this would call an API
    console.log(`${action} user ${userId}`);
  };

  const UserCard = ({ user }: { user: User }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center space-x-2">
                {user.type === "hotel" ?
                  <Building2 className="h-5 w-5 text-blue-600" /> :
                  <Users className="h-5 w-5 text-green-600" />
                }
                <span>{user.name}</span>
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{user.phone}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">Last active: {user.lastActive}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStatusColor(user.status)}>
              {user.status}
            </Badge>
            {user.rating && user.rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{user.rating}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Joined</p>
            <p className="text-sm font-medium">{user.joinDate}</p>
          </div>

          {user.type === "cleaner" && (
            <>
              <div>
                <p className="text-xs text-gray-500">Jobs Completed</p>
                <p className="text-sm font-medium">{user.completedJobs}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Earnings</p>
                <p className="text-sm font-medium">${user.earnings?.toLocaleString()}</p>
              </div>
            </>
          )}

          {user.type === "hotel" && (
            <>
              <div>
                <p className="text-xs text-gray-500">Hotel Name</p>
                <p className="text-sm font-medium">{user.hotelName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{user.location}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>

          <div className="flex space-x-2">
            {user.status === "pending" && (
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleUserAction(user.id, "approve")}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Approve
              </Button>
            )}
            {user.status === "active" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUserAction(user.id, "suspend")}
              >
                <UserX className="h-4 w-4 mr-2" />
                Suspend
              </Button>
            )}
            {user.status === "suspended" && (
              <Button
                size="sm"
                onClick={() => handleUserAction(user.id, "activate")}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Activate
              </Button>
            )}
          </div>
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
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage hotels, cleaners, and their accounts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button>
                <UserCheck className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hotels</p>
                  <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cleaners</p>
                  <p className="text-2xl font-bold text-gray-900">{cleaners.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingUsers.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              onClick={() => setFilterStatus("active")}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "pending" ? "default" : "outline"}
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "suspended" ? "default" : "outline"}
              onClick={() => setFilterStatus("suspended")}
            >
              Suspended
            </Button>
          </div>
        </div>

        {/* User Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
            <TabsTrigger value="hotels">Hotels ({hotels.length})</TabsTrigger>
            <TabsTrigger value="cleaners">Cleaners ({cleaners.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingUsers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
            </div>
          </TabsContent>

          <TabsContent value="hotels" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {hotels.map(user => <UserCard key={user.id} user={user} />)}
            </div>
          </TabsContent>

          <TabsContent value="cleaners" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cleaners.map(user => <UserCard key={user.id} user={user} />)}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingUsers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pendingUsers.map(user => <UserCard key={user.id} user={user} />)}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No pending user approvals</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
