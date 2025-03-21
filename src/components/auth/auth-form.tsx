"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthSteps } from "./auth-steps";
import type { AuthStep } from "./auth-steps";
import { VerifyForm } from "./verify-form";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function AuthForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  const steps: AuthStep[] = [
    { 
      id: 1, 
      name: "Account", 
      status: currentStep === 1 ? "current" : currentStep > 1 ? "complete" : "upcoming"
    },
    { 
      id: 2, 
      name: "Verify", 
      status: currentStep === 2 ? "current" : currentStep > 2 ? "complete" : "upcoming"
    },
    { 
      id: 3, 
      name: "Profile", 
      status: currentStep === 3 ? "current" : currentStep > 3 ? "complete" : "upcoming"
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    setUserEmail(data.email);
    setCurrentStep(2);
  };

  const handleResendVerification = () => {
    // Handle resend verification logic here
    console.log("Resending verification email to:", userEmail);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <AuthSteps steps={steps} />
      
      <div className="space-y-6 pt-4">
        {currentStep === 1 ? (
          <>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Join thousands of founders accessing non-dilutive funding
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                  placeholder="sarah@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-orange-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-orange-600">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
              >
                Create Account
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-orange-600 hover:text-orange-700">
                  Log in
                </a>
              </p>
            </div>
          </>
        ) : currentStep === 2 ? (
          <VerifyForm 
            email={userEmail} 
            onResendClick={handleResendVerification}
          />
        ) : null}
      </div>
    </div>
  );
} 