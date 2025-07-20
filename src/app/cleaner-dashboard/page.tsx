"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Star,
  Users,
  LogOut,
  BellRing,
  Search,
  MessageSquare,
  CreditCard
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Messaging from "@/components/messaging/Messaging";
import PaymentProcessor from "@/components/payment/PaymentProcessor";
import ReviewSystem from "@/components/reviews/ReviewSystem";

interface Job {
  id: string;
  hotelName: string;
  address: string;
  date: string;
  time: string;
  rooms: number;
  payment: number;
  requirements: string[];
  description: string;
  priority: "low" | "medium" | "high";
  status: "available" | "applied" | "accepted" | "completed";
}

export default function CleanerDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      hotelName: "Grand Plaza Hotel",
      address: "123 Main St, Downtown",
      date: "2025-01-15",
      time: "09:00 AM",
      rooms: 25,
      payment: 350,
      requirements: ["Deep cleaning", "Bathroom sanitization", "Bed making"],
      description: "Full floor cleaning required for 25 rooms on the 3rd floor",
      priority: "high",
      status: "available"
    },
    {
      id: "2",
      hotelName: "Sunset Resort",
      address: "456 Beach Ave, Seaside",
      date: "2025-01-16",
      time: "08:00 AM",
      rooms: 15,
      payment: 250,
      requirements: ["Standard cleaning", "Vacuum", "Trash removal"],
      description: "Morning cleaning shift for resort suites",
      priority: "medium",
      status: "available"
    },
    {
      id: "3",
      hotelName: "Business Inn",
      address: "789 Corporate Blvd",
      date: "2025-01-14",
      time: "02:00 PM",
      rooms: 20,
      payment: 300,
      requirements: ["Express cleaning", "Business amenities"],
      description: "Quick turnaround cleaning between business guests",
      priority: "high",
      status: "applied"
    },
    {
      id: "4",
      hotelName: "Luxury Suites",
      address: "321 Elite Drive",
      date: "2025-01-13",
      time: "10:00 AM",
      rooms: 10,
      payment: 400,
      requirements: ["Premium cleaning", "White glove service"],
      description: "High-end suite cleaning with premium standards",
      priority: "high",
      status: "accepted"
    }
  ]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const email = localStorage.getItem("userEmail");

    if (userType !== "cleaner") {
      router.push("/");
      return;
    }

    setUserEmail(email || "");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  const handleApplyJob = (jobId: string) => {
    setJobs(jobs.map(job =>
      job.id === jobId
        ? { ...job, status: "applied" }
        : job
    ));
  };

  const filteredJobs = jobs.filter(job =>
    job.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableJobs = filteredJobs.filter(job => job.status === "available");
  const appliedJobs = filteredJobs.filter(job => job.status === "applied");
  const acceptedJobs = filteredJobs.filter(job => job.status === "accepted");
  const completedJobs = filteredJobs.filter(job => job.status === "completed");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span>{job.hotelName}</span>
            </CardTitle>
            <CardDescription className="flex items-center space-x-1 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{job.address}</span>
            </CardDescription>
          </div>
          <Badge className={getPriorityColor(job.priority)}>
            {job.priority} priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{job.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{job.rooms} rooms</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 font-semibold text-green-600">
              <DollarSign className="h-4 w-4" />
              <span>${job.payment}</span>
            </div>
          </div>

          <p className="text-gray-700">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            {job.status === "available" && (
              <Button
                onClick={() => handleApplyJob(job.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                Apply for Job
              </Button>
            )}
            {job.status === "applied" && (
              <Button disabled variant="outline">
                Application Pending
              </Button>
            )}
            {job.status === "accepted" && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Contract
              </Button>
            )}
            {job.status === "completed" && (
              <Button disabled variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
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
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-green-600" />
                <h1 className="text-2xl font-bold text-gray-900">Cleaner Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <BellRing className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarFallback>
                  {userEmail.substring(0, 2).toUpperCase()}
                </AvatarFallback>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{availableJobs.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applied Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{appliedJobs.length}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{acceptedJobs.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">$2,150</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search hotels or locations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Jobs Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="available">Available Jobs ({availableJobs.length})</TabsTrigger>
            <TabsTrigger value="applied">Applied ({appliedJobs.length})</TabsTrigger>
            <TabsTrigger value="accepted">Accepted ({acceptedJobs.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedJobs.length})</TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="h-4 w-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {availableJobs.length > 0 ? (
              availableJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No available jobs at the moment</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applied" className="space-y-4">
            {appliedJobs.length > 0 ? (
              appliedJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No pending applications</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {acceptedJobs.length > 0 ? (
              acceptedJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No accepted jobs</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedJobs.length > 0 ? (
              completedJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No completed jobs yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="messages" className="h-96">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <Messaging userType="cleaner" currentUser={userEmail} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <PaymentProcessor userType="cleaner" />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <ReviewSystem userType="cleaner" currentUser={userEmail} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
