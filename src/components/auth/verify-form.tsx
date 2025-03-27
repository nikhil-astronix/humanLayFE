"use client"; // Ensure it's a Client Component

import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/api/axiosInterceptor";
import { AuthResponse } from "@/types/auth";

export default function VerifyOTP({
  email,
  selectedRole,
  password,
  setCurrentStep,
}: {
  email: string;
  password: string;
  selectedRole: string;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  const router = useRouter();
  const [screen, setScreen] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    [...Array(6)].map(() => null)
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box if a digit is entered
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join(""); // Combine OTP array into a string
    if (enteredOtp.length < 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setError("");
    setMessage("Verifying...");
    const res = await apiClient.post<AuthResponse>("/users/verify-otp", {
      email,
      otp: enteredOtp,
      password,
      role: selectedRole,
    });
    console.log("res", res.data);
    if (res) {
      localStorage.setItem("token", res.data.access_token); // Store token
      setCurrentStep(4);
    } else {
      setError("Invalid OTP");
      setMessage("");
    }
  };

  const handleResendOTP = async () => {
    setMessage("Resending OTP...");
    await apiClient.post<AuthResponse>("/users/send-otp", {
      email,
      password,
      role: selectedRole,
    });
    setMessage("OTP resent! Check your email.");
  };

  return (
    <div className="text-center space-y-6">
      {/* Email Confirmation Screen */}
      {screen === "email" && (
        <>
          <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8 4H8m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Check Your Email!
            </h2>
            <p className="text-sm text-gray-600">
              {`We've sent a verification code to`}
            </p>
            <p className="text-sm font-medium text-gray-900">{email}</p>
            <p className="text-sm text-gray-600">
              Enter the code below to activate your account.
            </p>
          </div>

          <button
            onClick={() => setScreen("otp")}
            className="w-full py-2 px-4 rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Enter OTP
          </button>

          <button
            onClick={handleResendOTP}
            className="w-full py-2 px-4 text-sm text-orange-600"
          >
            Resend OTP
          </button>
        </>
      )}

      {/* OTP Verification Screen */}
      {screen === "otp" && (
        <>
          <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8 4H8m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Enter OTP</h2>
            <p className="text-sm text-gray-600">
              Enter the 6-digit OTP we sent to your email:
            </p>
            <p className="text-sm font-medium text-gray-900">{email}</p>
          </div>

          {/* OTP Boxes */}
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg border rounded-md focus:ring-2 focus:ring-orange-500 text-gray-900 bg-white"
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <button
            onClick={handleVerify}
            className="w-full py-2 px-4 rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Verify OTP
          </button>

          <button
            onClick={handleResendOTP}
            className="w-full py-2 px-4 text-sm text-orange-600"
          >
            Resend OTP
          </button>
        </>
      )}
    </div>
  );
}
