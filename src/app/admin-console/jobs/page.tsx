"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Building2,
  ArrowLeft,
  Search,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Calendar,
  Star,
  MapPin,
  MessageSquare,
  Activity,
  Filter,
  Download
} from "lucide-react";

interface Job {
  id: string;
  jobTitle: string;
  hotelName: string;
  cleanerName: string;
  date: string;
  time: string;
  rooms: number;
  payment: number;
  status: "posted" | "applied" | "in_progress" | "completed" | "cancelled" | "disputed";
  priority: "low" | "medium" | "high";
  rating?: number;
  completedAt?: string;
  disputeReason?: string;
  location: string;
  requirements: string[];
}

export default function JobMonitoring() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [jobs] = useState<Job[]>([
    {
      id: "1",
      jobTitle: "3rd Floor Deep Cleaning",
      hotelName: "Grand Plaza Hotel",
      cleanerName: "Sarah Johnson",
      date: "2025-01-13",
      time: "09:00 AM",
      rooms: 25,
      payment: 350,
      status: "completed",
      priority: "high",
      rating: 5,
      completedAt: "2025-01-13 02:30 PM",
      location: "Downtown",
      requirements: ["Deep cleaning", "Bathroom sanitization", "Bed making"]
    },
    {
      id: "2",
      jobTitle: "Resort Suite Morning Clean",
      hotelName: "Sunset Resort",
      cleanerName: "Mike Wilson",
      date: "2025-01-14",
      time: "08:00 AM",
      rooms: 15,
      payment: 250,
      status: "in_progress",
      priority: "medium",
      location: "Seaside",
      requirements: ["Standard cleaning", "Vacuum", "Trash removal"]
    },
    {
      id: "3",
      jobTitle: "Express Business Cleaning",
      hotelName: "Business Inn",
      cleanerName: "Tom Brown",
      date: "2025-01-11",
      time: "02:00 PM",
      rooms: 20,
      payment: 300,
      status: "disputed",
      priority: "high",
      disputeReason: "Incomplete cleaning of bathrooms, several rooms not serviced",
      location: "Corporate District",
      requirements: ["Express cleaning", "Business amenities"]
    },
    {
      id: "4",
      jobTitle: "Luxury Suite Premium Clean",
      hotelName: "Luxury Suites",
      cleanerName: "Emily Davis",
      date: "2025-01-12",
      time: "10:00 AM",
      rooms: 10,
      payment: 400,
      status: "completed",
      priority: "high",
      rating: 4.8,
      completedAt: "2025-01-12 01:15 PM",
      location: "Uptown",
      requirements: ["Premium cleaning", "White glove service"]
    },
    {
      id: "5",
      jobTitle: "Standard Room Turnover",
      hotelName: "City Center Hotel",
      cleanerName: "Alex Rivera",
      date: "2025-01-15",
      time: "11:00 AM",
      rooms: 30,
      payment: 420,
      status: "posted",
      priority: "medium",
      location: "City Center",
      requirements: ["Room turnover", "Linen change", "Basic cleaning"]
    },
    {
      id: "6",
      jobTitle: "Weekend Deep Clean",
      hotelName: "Boutique Hotel",
      cleanerName: "Maria Garcia",
      date: "2025-01-16",
      time: "07:00 AM",
      rooms: 18,
      payment: 320,
      status: "applied",
      priority: "low",
      location: "Arts District",
      requirements: ["Deep cleaning", "Floor care", "Window cleaning"]
    },
    {
      id: "7",
      jobTitle: "Emergency Cleanup",
      hotelName: "Airport Hotel",
      cleanerName: "",
      date: "2025-01-09",
      time: "03:00 PM",
      rooms: 5,
      payment: 150,
      status: "cancelled",
      priority: "high",
      location: "Airport District",
      requirements: ["Emergency cleanup", "Sanitization"]
    }
  ]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.cleanerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const completedJobs = filteredJobs.filter(job => job.status === "completed");
  const activeJobs = filteredJobs.filter(job => job.status === "in_progress");
  const disputedJobs = filteredJobs.filter(job => job.status === "disputed");
  const pendingJobs = filteredJobs.filter(job => job.status === "posted" || job.status === "applied");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-blue-100 text-blue-800";
      case "disputed": return "bg-red-100 text-red-800";
      case "posted": return "bg-gray-100 text-gray-800";
      case "applied": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleJobAction = (jobId: string, action: "resolve" | "investigate" | "cancel") => {
    console.log(`${action} job ${jobId}`);
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>{job.jobTitle}</span>
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center space-x-4 text-sm">
                <span className="flex items-center space-x-1">
                  <Building2 className="h-4 w-4" />
                  <span>{job.hotelName}</span>
                </span>
                {job.cleanerName && (
                  <span>Cleaner: {job.cleanerName}</span>
                )}
              </div>
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge className={getPriorityColor(job.priority)}>
              {job.priority} priority
            </Badge>
            <Badge className={getStatusColor(job.status)}>
              {job.status.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Job Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{job.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{job.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-semibold text-green-600">
              <DollarSign className="h-4 w-4" />
              <span>${job.payment}</span>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Requirements:</p>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
            </div>
          </div>

          {/* Completion Info */}
          {job.status === "completed" && job.rating && (
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{job.rating}</span>
              </div>
              <span className="text-sm text-gray-600">
                Completed: {job.completedAt}
              </span>
            </div>
          )}

          {/* Dispute Info */}
          {job.status === "disputed" && job.disputeReason && (
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">Dispute Reported</span>
              </div>
              <p className="text-sm text-red-700">{job.disputeReason}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>

            <div className="flex space-x-2">
              {job.status === "disputed" && (
                <>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleJobAction(job.id, "resolve")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleJobAction(job.id, "investigate")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Investigate
                  </Button>
                </>
              )}
              {job.status === "in_progress" && (
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Track Progress
                </Button>
              )}
            </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Job Monitoring</h1>
                <p className="text-gray-600">Track jobs, disputes, and service quality</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {disputedJobs.length > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 rounded-full">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">{disputedJobs.length} disputes</span>
                </div>
              )}
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Jobs
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
                  <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{activeJobs.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedJobs.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Disputes</p>
                  <p className="text-2xl font-bold text-gray-900">{disputedJobs.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search jobs by title, hotel, or cleaner..."
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
              variant={filterStatus === "in_progress" ? "default" : "outline"}
              onClick={() => setFilterStatus("in_progress")}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "completed" ? "default" : "outline"}
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filterStatus === "disputed" ? "default" : "outline"}
              onClick={() => setFilterStatus("disputed")}
            >
              Disputed
            </Button>
          </div>
        </div>

        {/* Job Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Jobs ({filteredJobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedJobs.length})</TabsTrigger>
            <TabsTrigger value="disputed">Disputed ({disputedJobs.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {activeJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {completedJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </TabsContent>

          <TabsContent value="disputed" className="space-y-4">
            {disputedJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {disputedJobs.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active disputes</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {pendingJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
