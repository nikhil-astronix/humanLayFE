"use client";

import { useState, useEffect } from "react";
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

const profileSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  industry: z.string().min(1, "Industry is required"),
  stage: z.string().min(1, "Stage is required"),
  currentFunding: z.string().min(1, "Current funding is required"),
  demographic: z.string().min(1, "Demographic is required"),
  fundingNeeds: z.string().min(1, "Funding needs is required"),
  useOfFunds: z.string().min(1, "Use of funds is required"),
});

type FormData = z.infer<typeof formSchema>;
type ProfileData = z.infer<typeof profileSchema>;

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

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: FormData) => {
    setUserEmail(data.email);
    setCurrentStep(2);
  };

  const handleResendVerification = () => {
    // Handle resend verification logic here
    console.log("Resending verification email to:", userEmail);
  };

  const onProfileSubmit = (data: ProfileData) => {
    console.log("Profile data:", data);
    // Handle profile submission
  };

  // Simulate verification completion
  useEffect(() => {
    if (currentStep === 2) {
      const timer = setTimeout(() => {
        setCurrentStep(3);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className={`mx-auto px-6 ${currentStep === 3 ? 'w-full max-w-2xl' : 'w-full max-w-xl'}`}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <AuthSteps steps={steps} />
        
        <div className="space-y-6 mt-8">
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
          ) : currentStep === 3 ? (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">Set Up Your Profile</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Help us match you with the best grants by telling us about your startup.
                </p>
              </div>

              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="startupName" className="block text-sm font-medium text-gray-700">
                    Startup Name
                  </label>
                  <input
                    {...registerProfile("startupName")}
                    type="text"
                    id="startupName"
                    className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                  />
                  {profileErrors.startupName && (
                    <p className="mt-1 text-sm text-orange-600">{profileErrors.startupName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                      Industry
                    </label>
                    <select
                      {...registerProfile("industry")}
                      id="industry"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
                      Stage
                    </label>
                    <select
                      {...registerProfile("stage")}
                      id="stage"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                    >
                      <option value="">Select Stage</option>
                      <option value="Early-Stage">Early-Stage</option>
                      <option value="Growth">Growth</option>
                      <option value="Mature">Mature</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="currentFunding" className="block text-sm font-medium text-gray-700">
                      Current Funding
                    </label>
                    <input
                      {...registerProfile("currentFunding")}
                      type="text"
                      id="currentFunding"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                      placeholder="$ 10,000"
                    />
                  </div>

                  <div>
                    <label htmlFor="demographic" className="block text-sm font-medium text-gray-700">
                      Demographic
                    </label>
                    <select
                      {...registerProfile("demographic")}
                      id="demographic"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                    >
                      <option value="">Select Demographic</option>
                      <option value="Woman-Owned">Woman-Owned</option>
                      <option value="Minority-Owned">Minority-Owned</option>
                      <option value="Veteran-Owned">Veteran-Owned</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fundingNeeds" className="block text-sm font-medium text-gray-700">
                      Funding Needs
                    </label>
                    <input
                      {...registerProfile("fundingNeeds")}
                      type="text"
                      id="fundingNeeds"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                      placeholder="$ 50,000"
                    />
                  </div>

                  <div>
                    <label htmlFor="useOfFunds" className="block text-sm font-medium text-gray-700">
                      Use of Funds
                    </label>
                    <select
                      {...registerProfile("useOfFunds")}
                      id="useOfFunds"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                    >
                      <option value="">Select Use</option>
                      <option value="R&D">R&D</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                >
                  Save & Continue
                </button>

                <button
                  type="button"
                  onClick={() => console.log("Skipped profile setup")}
                  className="w-full text-sm text-gray-600 hover:text-gray-900"
                >
                  Skip for Now
                </button>
              </form>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
} 