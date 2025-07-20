"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  Search,
  Filter,
  Download,
  Eye,
  Flag,
  Award,
  Target,
  Building2,
  Users
} from "lucide-react";

interface Review {
  id: string;
  jobId: string;
  hotelName: string;
  cleanerName: string;
  rating: number;
  comment: string;
  date: string;
  status: "active" | "flagged" | "resolved";
  category: "service" | "communication" | "timeliness" | "quality";
  response?: string;
}

interface QualityMetrics {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: { stars: number; count: number; }[];
  satisfactionRate: number;
  responseRate: number;
  flaggedReviews: number;
}

export default function QualityAssurance() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  const [metrics] = useState<QualityMetrics>({
    averageRating: 4.8,
    totalReviews: 1156,
    ratingDistribution: [
      { stars: 5, count: 724 },
      { stars: 4, count: 289 },
      { stars: 3, count: 98 },
      { stars: 2, count: 32 },
      { stars: 1, count: 13 }
    ],
    satisfactionRate: 92.6,
    responseRate: 87.3,
    flaggedReviews: 5
  });

  const [reviews] = useState<Review[]>([
    {
      id: "1",
      jobId: "job_001",
      hotelName: "Grand Plaza Hotel",
      cleanerName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent service! Sarah was punctual, professional, and did an outstanding job cleaning our suites. All rooms were spotless and guests have been very happy.",
      date: "2025-01-13",
      status: "active",
      category: "service"
    },
    {
      id: "2",
      jobId: "job_002",
      hotelName: "Sunset Resort",
      cleanerName: "Mike Wilson",
      rating: 4,
      comment: "Good work overall. Mike completed the job on time and was professional. A few minor details were missed but nothing major.",
      date: "2025-01-14",
      status: "active",
      category: "quality"
    },
    {
      id: "3",
      jobId: "job_003",
      hotelName: "Business Inn",
      cleanerName: "Tom Brown",
      rating: 2,
      comment: "Service was below expectations. Several rooms were not properly cleaned and the cleaner left early without finishing all assigned rooms.",
      date: "2025-01-11",
      status: "flagged",
      category: "service"
    },
    {
      id: "4",
      jobId: "job_004",
      hotelName: "Luxury Suites",
      cleanerName: "Emily Davis",
      rating: 5,
      comment: "Absolutely perfect! Emily exceeded our expectations. The attention to detail was remarkable and our VIP guests were extremely satisfied.",
      date: "2025-01-12",
      status: "active",
      category: "service",
      response: "Thank you for the wonderful review! I take great pride in my work and appreciate your feedback."
    },
    {
      id: "5",
      jobId: "job_005",
      hotelName: "City Center Hotel",
      cleanerName: "Alex Rivera",
      rating: 3,
      comment: "Average service. The cleaning was adequate but nothing exceptional. Communication could have been better.",
      date: "2025-01-10",
      status: "active",
      category: "communication"
    },
    {
      id: "6",
      jobId: "job_006",
      hotelName: "Boutique Hotel",
      cleanerName: "Maria Garcia",
      rating: 1,
      comment: "Very disappointed. Cleaner arrived late, was unprofessional, and the quality of work was unacceptable. Would not recommend.",
      date: "2025-01-09",
      status: "flagged",
      category: "timeliness"
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.cleanerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const flaggedReviews = filteredReviews.filter(review => review.status === "flagged");
  const positiveReviews = filteredReviews.filter(review => review.rating >= 4);
  const negativeReviews = filteredReviews.filter(review => review.rating <= 2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "flagged": return "bg-red-100 text-red-800";
      case "resolved": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "service": return "bg-blue-100 text-blue-800";
      case "communication": return "bg-purple-100 text-purple-800";
      case "timeliness": return "bg-yellow-100 text-yellow-800";
      case "quality": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const handleReviewAction = (reviewId: string, action: "flag" | "resolve" | "investigate") => {
    console.log(`${action} review ${reviewId}`);
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {review.hotelName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{review.hotelName}</p>
              <p className="text-sm text-gray-600">Reviewing: {review.cleanerName}</p>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500 ml-2">{review.date}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Badge className={getCategoryColor(review.category)}>
              {review.category}
            </Badge>
            <Badge className={getStatusColor(review.status)}>
              {review.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{review.comment}</p>

          {review.response && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-1">Cleaner Response:</p>
              <p className="text-sm text-blue-700">{review.response}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Job Details
            </Button>

            <div className="flex space-x-2">
              {review.status === "active" && review.rating <= 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReviewAction(review.id, "flag")}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Flag for Review
                </Button>
              )}
              {review.status === "flagged" && (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleReviewAction(review.id, "resolve")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewAction(review.id, "investigate")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Investigate
                  </Button>
                </>
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
                <h1 className="text-2xl font-bold text-gray-900">Quality Assurance</h1>
                <p className="text-gray-600">Reviews, ratings, and service quality monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {flaggedReviews.length > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 rounded-full">
                  <Flag className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">{flaggedReviews.length} flagged reviews</span>
                </div>
              )}
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Quality Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{metrics.averageRating}</p>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <p className="text-xs text-green-600">+0.2 from last month</p>
                </div>
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalReviews}</p>
                  <p className="text-xs text-gray-500">All time</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.satisfactionRate}%</p>
                  <p className="text-xs text-green-600">4+ star ratings</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Flagged Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.flaggedReviews}</p>
                  <p className="text-xs text-red-600">Require attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
              <CardDescription>Breakdown of all customer ratings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics.ratingDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm font-medium">{item.stars}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{ width: `${(item.count / metrics.totalReviews) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {item.count} ({Math.round((item.count / metrics.totalReviews) * 100)}%)
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quality Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Rate</span>
                <span className="font-semibold">{metrics.responseRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Repeat Customers</span>
                <span className="font-semibold text-green-600">73%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Response Time</span>
                <span className="font-semibold">4.2 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolution Rate</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reviews by hotel, cleaner, or content..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterRating === "all" ? "default" : "outline"}
              onClick={() => setFilterRating("all")}
            >
              All Ratings
            </Button>
            <Button
              variant={filterRating === "5" ? "default" : "outline"}
              onClick={() => setFilterRating("5")}
            >
              5 Stars
            </Button>
            <Button
              variant={filterRating === "1" ? "default" : "outline"}
              onClick={() => setFilterRating("1")}
            >
              1 Star
            </Button>
          </div>
        </div>

        {/* Review Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Reviews ({filteredReviews.length})</TabsTrigger>
            <TabsTrigger value="flagged">Flagged ({flaggedReviews.length})</TabsTrigger>
            <TabsTrigger value="positive">Positive ({positiveReviews.length})</TabsTrigger>
            <TabsTrigger value="negative">Negative ({negativeReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {filteredReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="flagged" className="space-y-4">
            {flaggedReviews.length > 0 ? (
              <div className="space-y-4">
                {flaggedReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No flagged reviews</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="positive" className="space-y-4">
            <div className="space-y-4">
              {positiveReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="negative" className="space-y-4">
            <div className="space-y-4">
              {negativeReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
