"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle,
  Users,
  LogOut,
  BellRing,
  Plus,
  Eye,
  UserCheck,
  MessageSquare,
  CreditCard,
  Star
} from "lucide-react";
import Messaging from "@/components/messaging/Messaging";
import PaymentProcessor from "@/components/payment/PaymentProcessor";
import PaymentModal from "@/components/payment/PaymentModal";
import ReviewSystem from "@/components/reviews/ReviewSystem";

interface Job {
  id: string;
  title: string;
  date: string;
  time: string;
  rooms: number;
  payment: number;
  requirements: string[];
  description: string;
  priority: "low" | "medium" | "high";
  status: "posted" | "applications_received" | "cleaner_assigned" | "in_progress" | "completed";
  applicants?: number;
  assignedCleaner?: string;
}

interface JobFormData {
  title: string;
  date: string;
  time: string;
  rooms: string;
  payment: string;
  requirements: string;
  description: string;
  priority: "low" | "medium" | "high";
}

export default function HotelDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    date: "",
    time: "",
    rooms: "",
    payment: "",
    requirements: "",
    description: "",
    priority: "medium"
  });

  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "3rd Floor Deep Cleaning",
      date: "2025-01-15",
      time: "09:00 AM",
      rooms: 25,
      payment: 350,
      requirements: ["Deep cleaning", "Bathroom sanitization", "Bed making"],
      description: "Full floor cleaning required for 25 rooms on the 3rd floor",
      priority: "high",
      status: "applications_received",
      applicants: 5
    },
    {
      id: "2",
      title: "Resort Suite Cleaning",
      date: "2025-01-16",
      time: "08:00 AM",
      rooms: 15,
      payment: 250,
      requirements: ["Standard cleaning", "Vacuum", "Trash removal"],
      description: "Morning cleaning shift for resort suites",
      priority: "medium",
      status: "cleaner_assigned",
      assignedCleaner: "Sarah Johnson"
    },
    {
      id: "3",
      title: "Express Business Cleaning",
      date: "2025-01-14",
      time: "02:00 PM",
      rooms: 20,
      payment: 300,
      requirements: ["Express cleaning", "Business amenities"],
      description: "Quick turnaround cleaning between business guests",
      priority: "high",
      status: "in_progress",
      assignedCleaner: "Mike Wilson"
    },
    {
      id: "4",
      title: "Luxury Suite Premium Clean",
      date: "2025-01-13",
      time: "10:00 AM",
      rooms: 10,
      payment: 400,
      requirements: ["Premium cleaning", "White glove service"],
      description: "High-end suite cleaning with premium standards",
      priority: "high",
      status: "completed",
      assignedCleaner: "Emily Davis"
    }
  ]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const email = localStorage.getItem("userEmail");

    if (userType !== "hotel") {
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

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob: Job = {
      id: Date.now().toString(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      rooms: parseInt(formData.rooms),
      payment: parseInt(formData.payment),
      requirements: formData.requirements.split(",").map(req => req.trim()),
      description: formData.description,
      priority: formData.priority,
      status: "posted"
    };

    setJobs([newJob, ...jobs]);
    setShowCreateJob(false);
    setFormData({
      title: "",
      date: "",
      time: "",
      rooms: "",
      payment: "",
      requirements: "",
      description: "",
      priority: "medium"
    });
  };

  const postedJobs = jobs.filter(job => job.status === "posted");
  const applicationsJobs = jobs.filter(job => job.status === "applications_received");
  const assignedJobs = jobs.filter(job => job.status === "cleaner_assigned" || job.status === "in_progress");
  const completedJobs = jobs.filter(job => job.status === "completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "posted": return "bg-blue-100 text-blue-800";
      case "applications_received": return "bg-yellow-100 text-yellow-800";
      case "cleaner_assigned": return "bg-green-100 text-green-800";
      case "in_progress": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-gray-100 text-gray-800";
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "posted": return "Posted";
      case "applications_received": return "Applications Received";
      case "cleaner_assigned": return "Cleaner Assigned";
      case "in_progress": return "In Progress";
      case "completed": return "Completed";
      default: return status;
    }
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span>{job.title}</span>
            </CardTitle>
            <CardDescription className="mt-1">
              {job.description}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Badge className={getPriorityColor(job.priority)}>
              {job.priority} priority
            </Badge>
            <Badge className={getStatusColor(job.status)}>
              {getStatusText(job.status)}
            </Badge>
          </div>
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

          <div className="flex flex-wrap gap-2">
            {job.requirements.map((req, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {req}
              </Badge>
            ))}
          </div>

          {job.applicants && (
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              <UserCheck className="h-4 w-4" />
              <span>{job.applicants} applications received</span>
            </div>
          )}

          {job.assignedCleaner && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Assigned to: {job.assignedCleaner}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            {job.status === "applications_received" && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Eye className="h-4 w-4 mr-2" />
                View Applications
              </Button>
            )}
            {job.status === "posted" && (
              <Button disabled variant="outline">
                Waiting for Applications
              </Button>
            )}
            {(job.status === "cleaner_assigned" || job.status === "in_progress") && (
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Track Progress
              </Button>
            )}
            {job.status === "completed" && (
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Report
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
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Hotel Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={showCreateJob} onOpenChange={setShowCreateJob}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Post New Cleaning Job</DialogTitle>
                    <DialogDescription>
                      Create a new cleaning job request for your hotel
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateJob} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., 3rd Floor Deep Cleaning"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rooms">Number of Rooms</Label>
                        <Input
                          id="rooms"
                          type="number"
                          value={formData.rooms}
                          onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                          placeholder="25"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payment">Payment ($)</Label>
                        <Input
                          id="payment"
                          type="number"
                          value={formData.payment}
                          onChange={(e) => setFormData({...formData, payment: e.target.value})}
                          placeholder="350"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value: "low" | "medium" | "high") => setFormData({...formData, priority: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                      <Input
                        id="requirements"
                        value={formData.requirements}
                        onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                        placeholder="Deep cleaning, Bathroom sanitization, Bed making"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Detailed description of the cleaning requirements..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Post Job
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

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
                  <p className="text-sm font-medium text-gray-600">Posted Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{postedJobs.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{applicationsJobs.length}</p>
                </div>
                <UserCheck className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{assignedJobs.length}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{completedJobs.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="posted">Posted ({postedJobs.length})</TabsTrigger>
            <TabsTrigger value="applications">Applications ({applicationsJobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({assignedJobs.length})</TabsTrigger>
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

          <TabsContent value="all" className="space-y-4">
            {jobs.map(job => <JobCard key={job.id} job={job} />)}
          </TabsContent>

          <TabsContent value="posted" className="space-y-4">
            {postedJobs.length > 0 ? (
              postedJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No posted jobs. Create a new job to get started.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {applicationsJobs.length > 0 ? (
              applicationsJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No applications received yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {assignedJobs.length > 0 ? (
              assignedJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No active jobs</p>
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
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No completed jobs yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="messages" className="h-96">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <Messaging userType="hotel" currentUser={userEmail} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <PaymentProcessor userType="hotel" />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <ReviewSystem userType="hotel" currentUser={userEmail} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
