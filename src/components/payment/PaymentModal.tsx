"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  CheckCircle,
  Clock,
  DollarSign,
  Building2,
  Users,
  Star
} from "lucide-react";
import PaymentProcessor from "./PaymentProcessor";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  hotelName: string;
  cleanerName: string;
  amount: number;
  onPaymentComplete: (paymentId: string) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  hotelName,
  cleanerName,
  amount,
  onPaymentComplete
}: PaymentModalProps) {
  const [paymentStep, setPaymentStep] = useState<"details" | "processing" | "success">("details");
  const [paymentId, setPaymentId] = useState("");

  const handlePaymentComplete = (id: string) => {
    setPaymentId(id);
    setPaymentStep("success");

    // Auto close after success and trigger callback
    setTimeout(() => {
      onPaymentComplete(id);
      onClose();
      setPaymentStep("details");
    }, 3000);
  };

  const handleStartPayment = () => {
    setPaymentStep("processing");
  };

  if (paymentStep === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Payment has been processed and the cleaner will receive their payout automatically.
            </p>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Payment ID: {paymentId}</p>
              <p className="text-sm text-green-700">Amount: ${(amount * 1.1).toFixed(2)}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <span>Complete Payment</span>
          </DialogTitle>
          <DialogDescription>
            Process payment for completed cleaning job
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Details */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Job Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Job:</p>
                <p className="font-medium">{jobTitle}</p>
              </div>
              <div>
                <p className="text-gray-600">Job ID:</p>
                <p className="font-medium">#{jobId}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-gray-600">Hotel:</p>
                  <p className="font-medium">{hotelName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-gray-600">Cleaner:</p>
                  <p className="font-medium">{cleanerName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Payment Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Cleaning Service:</span>
                <span>${amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee (10%):</span>
                <span>${(amount * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee (2.9%):</span>
                <span>${(amount * 0.029).toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <span>${(amount * 1.129).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Cleaner Payout Info */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Automatic Payout</h4>
            <p className="text-sm text-blue-700">
              The cleaner will receive ${(amount * 0.9).toFixed(2)} within 1-2 business days via their preferred payout method.
            </p>
          </div>

          {paymentStep === "details" ? (
            <PaymentProcessor
              userType="hotel"
              jobId={jobId}
              amount={amount}
              onPaymentComplete={handlePaymentComplete}
            />
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-semibold mb-2">Processing Payment...</h3>
              <p className="text-gray-600">Please wait while we process your payment securely.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
