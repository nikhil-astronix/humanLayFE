"use client";

import { MailIcon } from "lucide-react";

interface VerifyFormProps {
  email: string;
  onResendClick: () => void;
}

export function VerifyForm({ email, onResendClick }: VerifyFormProps) {
  return (
    <div className="text-center space-y-6">
      {/* Email Icon */}
      <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
        <MailIcon className="w-10 h-10 text-orange-600" />
      </div>

      {/* Title and Description */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Check Your Email!</h2>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            We've sent a verification link to
          </p>
          <p className="text-sm font-medium text-gray-900">{email}</p>
          <p className="text-sm text-gray-600">
            Please click it to activate your account.
          </p>
        </div>
      </div>

      {/* Resend Button */}
      <button
        onClick={onResendClick}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        Resend Verification Email
      </button>

      {/* Help Text */}
      <p className="text-sm text-gray-500">
        Didn't receive it? Check your spam folder or resend the link.
      </p>
    </div>
  );
} 