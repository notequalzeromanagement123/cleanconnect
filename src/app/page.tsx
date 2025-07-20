"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Shield, Calendar, CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";
import UserLogin from "@/components/auth/UserLogin";
import HotelLogin from "@/components/auth/HotelLogin";

export default function LandingPage() {
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showHotelLogin, setShowHotelLogin] = useState(false);

  if (showUserLogin) {
    return <UserLogin onBack={() => setShowUserLogin(false)} />;
  }

  if (showHotelLogin) {
    return <HotelLogin onBack={() => setShowHotelLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CleanConnect</h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setShowUserLogin(true)}>
                <Users className="h-4 w-4 mr-2" />
                I'm a Cleaner
              </Button>
              <Button onClick={() => setShowHotelLogin(true)}>
                <Building2 className="h-4 w-4 mr-2" />
                I'm a Hotel
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/admin-console"}
                className="opacity-50 hover:opacity-100"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Hotels with Professional Cleaners
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The premier platform for hotel cleaning services. Hotels post jobs, cleaners apply,
            and contracts are signed automatically when there's a match.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              Instant Matching
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <Calendar className="h-4 w-4 mr-2" />
              Flexible Scheduling
            </Badge>
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <Shield className="h-4 w-4 mr-2" />
              Secure Contracts
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Building2 className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>For Hotels</CardTitle>
              <CardDescription>
                Post cleaning jobs with specific requirements and schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Post jobs with detailed requirements</li>
                <li>• Set your preferred schedule</li>
                <li>• Automatic cleaner matching</li>
                <li>• Secure contract signing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>For Cleaners</CardTitle>
              <CardDescription>
                Find hotel cleaning jobs that match your availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Browse available hotel jobs</li>
                <li>• Apply for jobs you're interested in</li>
                <li>• Flexible scheduling options</li>
                <li>• Guaranteed payment</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Management</CardTitle>
              <CardDescription>
                Comprehensive platform management and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• User management dashboard</li>
                <li>• Job monitoring and analytics</li>
                <li>• Quality assurance tools</li>
                <li>• Payment processing</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Hotel Posts Job</h4>
              <p className="text-gray-600">Hotels create cleaning job requests with specific requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">2. Cleaner Applies</h4>
              <p className="text-gray-600">Professional cleaners browse and apply for available jobs</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">3. Match & Contract</h4>
              <p className="text-gray-600">When requirements match, a contract is automatically signed</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">4. Service Delivery</h4>
              <p className="text-gray-600">Cleaner arrives at hotel on scheduled day for service</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
