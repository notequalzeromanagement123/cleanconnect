"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  Award,
  CheckCircle,
  Building2,
  Users,
  Calendar,
  TrendingUp
} from "lucide-react";

interface Review {
  id: string;
  jobId: string;
  rating: number;
  comment: string;
  reviewerType: "hotel" | "cleaner";
  reviewerName: string;
  revieweeName: string;
  date: string;
  jobTitle: string;
  categories: {
    quality: number;
    timeliness: number;
    communication: number;
    professionalism: number;
  };
  response?: string;
  helpful: number;
}

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  reviewerType: "hotel" | "cleaner";
  reviewerName: string;
  revieweeName: string;
  onSubmit: (review: Omit<Review, "id" | "date" | "helpful">) => void;
}

interface ReviewSystemProps {
  userType: "hotel" | "cleaner";
  currentUser: string;
}

function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "medium"
}: {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const starSize = size === "small" ? "h-3 w-3" : size === "large" ? "h-6 w-6" : "h-4 w-4";

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${starSize} cursor-pointer transition-colors ${
            i < rating
              ? "text-yellow-500 fill-current"
              : "text-gray-300 hover:text-yellow-400"
          }`}
          onClick={() => !readonly && onRatingChange?.(i + 1)}
        />
      ))}
      {readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

function ReviewForm({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  reviewerType,
  reviewerName,
  revieweeName,
  onSubmit
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [categories, setCategories] = useState({
    quality: 0,
    timeliness: 0,
    communication: 0,
    professionalism: 0
  });

  const handleSubmit = () => {
    if (rating === 0) return;

    onSubmit({
      jobId,
      rating,
      comment,
      reviewerType,
      reviewerName,
      revieweeName,
      jobTitle,
      categories,
      response: undefined
    });

    // Reset form
    setRating(0);
    setComment("");
    setCategories({
      quality: 0,
      timeliness: 0,
      communication: 0,
      professionalism: 0
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Rate & Review</span>
          </DialogTitle>
          <DialogDescription>
            Share your experience for: {jobTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating */}
          <div>
            <h4 className="font-medium mb-3">Overall Rating</h4>
            <div className="flex items-center space-x-4">
              <StarRating
                rating={rating}
                onRatingChange={setRating}
                size="large"
              />
              <span className="text-lg font-medium">
                {rating > 0 && (
                  rating === 5 ? "Excellent" :
                  rating === 4 ? "Good" :
                  rating === 3 ? "Average" :
                  rating === 2 ? "Poor" : "Very Poor"
                )}
              </span>
            </div>
          </div>

          {/* Category Ratings */}
          <div>
            <h4 className="font-medium mb-3">Detailed Rating</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Quality of Work</label>
                <StarRating
                  rating={categories.quality}
                  onRatingChange={(value) => setCategories(prev => ({ ...prev, quality: value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Timeliness</label>
                <StarRating
                  rating={categories.timeliness}
                  onRatingChange={(value) => setCategories(prev => ({ ...prev, timeliness: value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Communication</label>
                <StarRating
                  rating={categories.communication}
                  onRatingChange={(value) => setCategories(prev => ({ ...prev, communication: value }))}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Professionalism</label>
                <StarRating
                  rating={categories.professionalism}
                  onRatingChange={(value) => setCategories(prev => ({ ...prev, professionalism: value }))}
                />
              </div>
            </div>
          </div>

          {/* Written Review */}
          <div>
            <h4 className="font-medium mb-3">Write a Review</h4>
            <Textarea
              placeholder={`Tell others about your experience with ${revieweeName}...`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              <Star className="h-4 w-4 mr-2" />
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ReviewSystem({ userType, currentUser }: ReviewSystemProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<{
    jobId: string;
    jobTitle: string;
    revieweeName: string;
    completedDate: string;
  } | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev_1",
      jobId: "job_001",
      rating: 5,
      comment: "Excellent service! Sarah was punctual, professional, and did an outstanding job cleaning our suites. All rooms were spotless and guests have been very happy. Highly recommend!",
      reviewerType: "hotel",
      reviewerName: "Grand Plaza Hotel",
      revieweeName: "Sarah Johnson",
      date: "2025-01-13",
      jobTitle: "3rd Floor Deep Cleaning",
      categories: {
        quality: 5,
        timeliness: 5,
        communication: 5,
        professionalism: 5
      },
      response: "Thank you so much for the wonderful review! I take great pride in my work and appreciate your feedback.",
      helpful: 12
    },
    {
      id: "rev_2",
      jobId: "job_002",
      rating: 4,
      comment: "Good work overall. Mike completed the job on time and was professional. A few minor details were missed but nothing major. Would work with him again.",
      reviewerType: "hotel",
      reviewerName: "Sunset Resort",
      revieweeName: "Mike Wilson",
      date: "2025-01-14",
      jobTitle: "Resort Suite Morning Clean",
      categories: {
        quality: 4,
        timeliness: 5,
        communication: 4,
        professionalism: 4
      },
      helpful: 8
    },
    {
      id: "rev_3",
      jobId: "job_004",
      rating: 5,
      comment: "Absolutely perfect! Emily exceeded our expectations. The attention to detail was remarkable and our VIP guests were extremely satisfied. Will definitely book again.",
      reviewerType: "hotel",
      reviewerName: "Luxury Suites",
      revieweeName: "Emily Davis",
      date: "2025-01-12",
      jobTitle: "Luxury Suite Premium Clean",
      categories: {
        quality: 5,
        timeliness: 5,
        communication: 5,
        professionalism: 5
      },
      response: "I'm thrilled that you and your guests were so satisfied! It was a pleasure working with your team.",
      helpful: 15
    }
  ]);

  const [pendingReviews] = useState([
    {
      jobId: "job_005",
      jobTitle: "Standard Room Turnover",
      revieweeName: userType === "hotel" ? "Alex Rivera" : "City Center Hotel",
      completedDate: "2025-01-14"
    }
  ]);

  const handleSubmitReview = (reviewData: Omit<Review, "id" | "date" | "helpful">) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews(prev => [newReview, ...prev]);
  };

  const handleMarkHelpful = (reviewId: string) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  const getCategoryAverage = (category: keyof Review["categories"]) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.categories[category], 0);
    return total / reviews.length;
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>Rating Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {getAverageRating().toFixed(1)}
              </div>
              <StarRating rating={getAverageRating()} readonly size="large" />
              <p className="text-gray-600 mt-2">{reviews.length} reviews</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Quality:</span>
                <StarRating rating={getCategoryAverage("quality")} readonly size="small" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Timeliness:</span>
                <StarRating rating={getCategoryAverage("timeliness")} readonly size="small" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Communication:</span>
                <StarRating rating={getCategoryAverage("communication")} readonly size="small" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Professionalism:</span>
                <StarRating rating={getCategoryAverage("professionalism")} readonly size="small" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <span>Pending Reviews</span>
            </CardTitle>
            <CardDescription>
              Jobs waiting for your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingReviews.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{job.jobTitle}</p>
                    <p className="text-sm text-gray-600">
                      {userType === "hotel" ? "Cleaner" : "Hotel"}: {job.revieweeName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Completed: {job.completedDate}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedJob(job);
                      setShowReviewForm(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>
            {userType === "hotel" ? "Reviews for your cleaners" : "Reviews from hotels"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {review.reviewerName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{review.reviewerName}</p>
                        {review.reviewerType === "hotel" ? (
                          <Building2 className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Users className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <StarRating rating={review.rating} readonly size="small" />
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.jobTitle}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                {/* Category Ratings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Quality</p>
                    <StarRating rating={review.categories.quality} readonly size="small" />
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Timeliness</p>
                    <StarRating rating={review.categories.timeliness} readonly size="small" />
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Communication</p>
                    <StarRating rating={review.categories.communication} readonly size="small" />
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Professionalism</p>
                    <StarRating rating={review.categories.professionalism} readonly size="small" />
                  </div>
                </div>

                {/* Response */}
                {review.response && (
                  <div className="p-3 bg-blue-50 rounded-lg mb-3">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      Response from {review.revieweeName}:
                    </p>
                    <p className="text-sm text-blue-700">{review.response}</p>
                  </div>
                )}

                {/* Helpful Button */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMarkHelpful(review.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review Form Modal */}
      {selectedJob && (
        <ReviewForm
          isOpen={showReviewForm}
          onClose={() => {
            setShowReviewForm(false);
            setSelectedJob(null);
          }}
          jobId={selectedJob.jobId}
          jobTitle={selectedJob.jobTitle}
          reviewerType={userType}
          reviewerName={currentUser}
          revieweeName={selectedJob.revieweeName}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}
