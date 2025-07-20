"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

/** ---------- 共通ログインボタン ---------- **/
interface LoginButtonProps {
  mode: "login" | "signup";
  label: string;
  redirectTo?: string;
  variant?: "default" | "secondary";
}
function LoginButton({
  mode,
  label,
  redirectTo = "/hotel-dashboard",
  variant = "default",
}: LoginButtonProps) {
  const action = mode === "signup" ? "signup" : "login";
  const url = `/api/auth/${action}?returnTo=${encodeURIComponent(redirectTo)}`;

  return (
    <Button variant={variant} className="w-full" onClick={() => (location.href = url)}>
      {label}
    </Button>
  );
}

/** ---------- 画面本体 ---------- **/
interface HotelLoginProps {
  onBack: () => void;
}

export default function HotelLogin({ onBack }: HotelLoginProps) {
  const router = useRouter(); // ★ ログアウト後などの戻り先に利用可

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-blue-600">Hotel Portal</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Hotel Account</CardTitle>
          <CardDescription className="text-center">
            Auth0 を使ってログイン / 新規登録
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* サインイン */}
          <LoginButton
            mode="login"
            label="Sign in with Email / SSO"
            redirectTo="/hotel-dashboard"
          />

          {/* 新規登録 */}
          <LoginButton
            mode="signup"
            label="Register your Hotel"
            redirectTo="/hotel-dashboard"
            variant="secondary"
          />
        </CardContent>
      </Card>
    </div>
  );
}
