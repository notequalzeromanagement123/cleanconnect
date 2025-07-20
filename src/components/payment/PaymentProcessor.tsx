"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  Wallet,
  Send,
  AlertCircle,
  Lock,
  Building2,
  Users
} from "lucide-react";

interface Payment {
  id: string;
  jobId: string;
  amount: number;
  platformFee: number;
  cleanerAmount: number;
  status: "pending" | "processing" | "completed" | "failed";
  method: "card" | "bank" | "wallet";
  createdAt: string;
  completedAt?: string;
  hotelName: string;
  cleanerName: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  last4: string;
  brand?: string;
  isDefault: boolean;
}

interface PaymentProcessorProps {
  userType: "hotel" | "cleaner";
  jobId?: string;
  amount?: number;
  onPaymentComplete?: (paymentId: string) => void;
}

export default function PaymentProcessor({
  userType,
  jobId,
  amount,
  onPaymentComplete
}: PaymentProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm_1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      isDefault: true
    },
    {
      id: "pm_2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      isDefault: false
    },
    {
      id: "pm_3",
      type: "bank",
      last4: "1234",
      isDefault: false
    }
  ]);

  const [recentPayments] = useState<Payment[]>([
    {
      id: "pay_1",
      jobId: "job_001",
      amount: 350,
      platformFee: 35,
      cleanerAmount: 315,
      status: "completed",
      method: "card",
      createdAt: "2025-01-13T09:00:00Z",
      completedAt: "2025-01-13T15:30:00Z",
      hotelName: "Grand Plaza Hotel",
      cleanerName: "Sarah Johnson"
    },
    {
      id: "pay_2",
      jobId: "job_002",
      amount: 250,
      platformFee: 25,
      cleanerAmount: 225,
      status: "processing",
      method: "card",
      createdAt: "2025-01-14T08:00:00Z",
      hotelName: "Sunset Resort",
      cleanerName: "Mike Wilson"
    },
    {
      id: "pay_3",
      jobId: "job_003",
      amount: 400,
      platformFee: 40,
      cleanerAmount: 360,
      status: "pending",
      method: "bank",
      createdAt: "2025-01-12T10:00:00Z",
      hotelName: "Luxury Suites",
      cleanerName: "Emily Davis"
    }
  ]);

  const handlePayment = async () => {
    if (!selectedMethod || !amount) return;

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const paymentId = `pay_${Date.now()}`;

      // Simulate successful payment
      console.log("Payment successful:", {
        paymentId,
        amount,
        method: selectedMethod,
        jobId
      });

      onPaymentComplete?.(paymentId);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing": return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (userType === "cleaner") {
    return (
      <div className="space-y-6">
        {/* Earnings Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-green-600" />
              <span>Earnings Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-900">$2,150</p>
                <p className="text-sm text-green-700">This Month</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Send className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">$450</p>
                <p className="text-sm text-blue-700">Pending Payout</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-900">87</p>
                <p className="text-sm text-purple-700">Jobs Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Configure how and when you receive payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Payout Method</Label>
                <Select defaultValue="bank">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="venmo">Venmo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Payout Schedule</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Bank Account (****1234)</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary">Primary Account</Badge>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Form for Hotels */}
      {amount && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>Payment Details</span>
            </CardTitle>
            <CardDescription>
              Secure payment processing for job: {jobId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Payment Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Job Amount:</span>
                <span className="font-semibold">${amount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Platform Fee (10%):</span>
                <span className="font-semibold">${(amount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${(amount * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <Label>Payment Method</Label>
              <div className="space-y-2 mt-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedMethod === method.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">
                            {method.type === "card" ? `${method.brand} ****${method.last4}` : `Bank ****${method.last4}`}
                          </p>
                          {method.isDefault && <Badge variant="secondary" className="text-xs">Default</Badge>}
                        </div>
                      </div>
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Payment Method */}
            <details className="border rounded-lg">
              <summary className="p-3 cursor-pointer font-medium">Add New Payment Method</summary>
              <div className="p-3 border-t space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingAddress">Billing Address</Label>
                    <Input
                      id="billingAddress"
                      placeholder="123 Main St, City, State"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </details>

            {/* Security Notice */}
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
              <Lock className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-700">
                Your payment information is encrypted and secure
              </p>
            </div>

            {/* Payment Button */}
            <Button
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay ${(amount * 1.1).toFixed(2)}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Your payment history and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <p className="font-medium">{payment.hotelName}</p>
                    <p className="text-sm text-gray-600">
                      Job #{payment.jobId} • {payment.cleanerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${payment.amount}</p>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
