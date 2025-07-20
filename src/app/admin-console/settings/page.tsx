"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Settings,
  Save,
  RefreshCw,
  Shield,
  Bell,
  CreditCard,
  Globe,
  Mail,
  Database,
  Key,
  Users,
  Building2,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface PlatformSettings {
  general: {
    platformName: string;
    supportEmail: string;
    timezone: string;
    currency: string;
    language: string;
  };
  commission: {
    defaultRate: number;
    hotelFee: number;
    cleanerFee: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    jobAlerts: boolean;
    disputeAlerts: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    maxLoginAttempts: number;
  };
  payment: {
    autoPayouts: boolean;
    payoutSchedule: string;
    minimumPayout: number;
    processingFee: number;
  };
}

export default function PlatformSettings() {
  const router = useRouter();
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<PlatformSettings>({
    general: {
      platformName: "CleanConnect",
      supportEmail: "support@cleanconnect.com",
      timezone: "UTC-8",
      currency: "USD",
      language: "English"
    },
    commission: {
      defaultRate: 10,
      hotelFee: 2.5,
      cleanerFee: 1.5
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      jobAlerts: true,
      disputeAlerts: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiry: 90,
      maxLoginAttempts: 5
    },
    payment: {
      autoPayouts: true,
      payoutSchedule: "weekly",
      minimumPayout: 50,
      processingFee: 2.9
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    console.log("Settings saved:", settings);
  };

  const handleReset = () => {
    // Mock reset to defaults
    setHasChanges(false);
  };

  const updateSetting = (section: keyof PlatformSettings, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
                <p className="text-gray-600">System configuration and platform policies</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-100 rounded-full">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-600">Unsaved changes</span>
                </div>
              )}
              <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>General Settings</span>
                </CardTitle>
                <CardDescription>Basic platform configuration and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input
                      id="platformName"
                      value={settings.general.platformName}
                      onChange={(e) => updateSetting("general", "platformName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.general.supportEmail}
                      onChange={(e) => updateSetting("general", "supportEmail", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select value={settings.general.timezone} onValueChange={(value) => updateSetting("general", "timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                        <SelectItem value="UTC+1">Central European (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={settings.general.currency} onValueChange={(value) => updateSetting("general", "currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commission" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span>Commission Structure</span>
                </CardTitle>
                <CardDescription>Configure platform fees and commission rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultRate">Default Commission Rate (%)</Label>
                    <Input
                      id="defaultRate"
                      type="number"
                      value={settings.commission.defaultRate}
                      onChange={(e) => updateSetting("commission", "defaultRate", parseFloat(e.target.value))}
                    />
                    <p className="text-xs text-gray-500">Percentage taken from each transaction</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hotelFee">Hotel Service Fee (%)</Label>
                    <Input
                      id="hotelFee"
                      type="number"
                      value={settings.commission.hotelFee}
                      onChange={(e) => updateSetting("commission", "hotelFee", parseFloat(e.target.value))}
                    />
                    <p className="text-xs text-gray-500">Additional fee charged to hotels</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cleanerFee">Cleaner Processing Fee (%)</Label>
                    <Input
                      id="cleanerFee"
                      type="number"
                      value={settings.commission.cleanerFee}
                      onChange={(e) => updateSetting("commission", "cleanerFee", parseFloat(e.target.value))}
                    />
                    <p className="text-xs text-gray-500">Fee deducted from cleaner payments</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Commission Breakdown Example</h4>
                  <p className="text-sm text-blue-700">
                    For a $100 job: Platform earns ${settings.commission.defaultRate}% commission + ${settings.commission.hotelFee}% hotel fee = ${settings.commission.defaultRate + settings.commission.hotelFee}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <span>Notification Settings</span>
                </CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Send notifications via SMS</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Send push notifications to mobile apps</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="jobAlerts">Job Status Alerts</Label>
                      <p className="text-sm text-gray-500">Notify on job status changes</p>
                    </div>
                    <Switch
                      id="jobAlerts"
                      checked={settings.notifications.jobAlerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "jobAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="disputeAlerts">Dispute Alerts</Label>
                      <p className="text-sm text-gray-500">Immediate alerts for disputes</p>
                    </div>
                    <Switch
                      id="disputeAlerts"
                      checked={settings.notifications.disputeAlerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "disputeAlerts", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Configure security policies and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting("security", "twoFactorAuth", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting("security", "sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => updateSetting("security", "passwordExpiry", parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSetting("security", "maxLoginAttempts", parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span>Payment Settings</span>
                </CardTitle>
                <CardDescription>Configure payment processing and payout schedules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoPayouts">Automatic Payouts</Label>
                      <p className="text-sm text-gray-500">Automatically process cleaner payouts</p>
                    </div>
                    <Switch
                      id="autoPayouts"
                      checked={settings.payment.autoPayouts}
                      onCheckedChange={(checked) => updateSetting("payment", "autoPayouts", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="payoutSchedule">Payout Schedule</Label>
                    <Select value={settings.payment.payoutSchedule} onValueChange={(value) => updateSetting("payment", "payoutSchedule", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumPayout">Minimum Payout ($)</Label>
                    <Input
                      id="minimumPayout"
                      type="number"
                      value={settings.payment.minimumPayout}
                      onChange={(e) => updateSetting("payment", "minimumPayout", parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="processingFee">Processing Fee (%)</Label>
                    <Input
                      id="processingFee"
                      type="number"
                      step="0.1"
                      value={settings.payment.processingFee}
                      onChange={(e) => updateSetting("payment", "processingFee", parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
