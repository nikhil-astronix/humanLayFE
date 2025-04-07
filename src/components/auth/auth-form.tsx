"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthSteps } from "./auth-steps";
import type { AuthStep } from "./auth-steps";
import VerifyOTP from "./verify-form";
import { RoleSelectionForm } from "./role-selection-form";
import { ArrowLeft } from "lucide-react";
import apiClient from "@/api/axiosInterceptor";
import { AuthResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonLoader } from "@/components/ui/loader";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const providerFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  organizationType: z.string().min(1, "Organization type is required"),
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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps: AuthStep[] = [
    {
      id: 1,
      name: "Role",
      status:
        currentStep === 1
          ? "current"
          : currentStep > 1
          ? "complete"
          : "upcoming",
    },
    {
      id: 2,
      name: "Account",
      status:
        currentStep === 2
          ? "current"
          : currentStep > 2
          ? "complete"
          : "upcoming",
    },
    {
      id: 3,
      name: "Verify",
      status:
        currentStep === 3
          ? "current"
          : currentStep > 3
          ? "complete"
          : "upcoming",
    },
    {
      id: 4,
      name: "Profile",
      status:
        currentStep === 4
          ? "current"
          : currentStep > 4
          ? "complete"
          : "upcoming",
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
    register: registerProvider,
    handleSubmit: handleProviderSubmit,
    formState: { errors: providerErrors },
  } = useForm<z.infer<typeof providerFormSchema>>({
    resolver: zodResolver(providerFormSchema),
  });

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setCurrentStep(2);
  };

  const onSubmit = async (data: FormData) => {
    setUserEmail(data.email);
    setUserPassword(data.password);
    try {
      await apiClient.post<AuthResponse>("/users/send-otp", {
        role: selectedRole,
        ...data,
      });
      setUserEmail(data.email);
      setCurrentStep(3);
    } catch (error) {
      console.error("Login error:", error);
    }
    setCurrentStep(3);
  };

  const onProviderSubmit = (data: z.infer<typeof providerFormSchema>) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    setUserEmail(data.email);
    setCurrentStep(3);
  };

  const onProfileSubmit = async (data: ProfileData) => {
    console.log("Profile data:", data);
    try {
      await apiClient.put("/users/profile", data);
      router.push("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="mx-auto px-6 w-full max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-8 min-h-[600px] flex flex-col">
        <AuthSteps steps={steps} />

        <div className="flex-1 flex items-start justify-center">
          <div className="w-full space-y-6 mt-8">
            {currentStep === 1 ? (
              <RoleSelectionForm onSubmit={handleRoleSelect} />
            ) : currentStep === 2 ? (
              <div className="max-w-md mx-auto ">
                {selectedRole === "grant-provider" ? (
                  // Grant Provider Form
                  <div className="shadow-lg rounded-lg p-8 border border-gray-200">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Create Grant Provider Account
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">
                        Join our platform to manage grant applications and
                        connect with founders
                      </p>
                    </div>

                    <form
                      onSubmit={handleProviderSubmit(onProviderSubmit)}
                      className="mt-8 space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <input
                          {...registerProvider("email")}
                          type="email"
                          placeholder="name@organization.com"
                          className="mt-1 block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        />
                        {providerErrors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {providerErrors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          {...registerProvider("password")}
                          type="password"
                          className="mt-1 block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        />
                        {providerErrors.password && (
                          <p className="mt-1 text-sm text-red-600">
                            {providerErrors.password.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </label>
                        <input
                          {...registerProvider("confirmPassword")}
                          type="password"
                          className="mt-1 block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        />
                        {providerErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {providerErrors.confirmPassword.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="organizationType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Organization Type
                        </label>
                        <select
                          {...registerProvider("organizationType")}
                          className="mt-1 block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        >
                          <option value="">Select organization type</option>
                          <option value="government">Government Agency</option>
                          <option value="non-profit">
                            Non-Profit Organization
                          </option>
                          <option value="corporation">Corporation</option>
                          <option value="foundation">Foundation</option>
                          <option value="academic">Academic Institution</option>
                        </select>
                        {providerErrors.organizationType && (
                          <p className="mt-1 text-sm text-red-600">
                            {providerErrors.organizationType.message}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-4 mt-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="w-1/3 flex justify-center items-center py-2 px-4 border border-orange-600 rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  // Grant Seeker Form (Original Form)
                  <div className="shadow-lg rounded-lg p-8 border border-gray-200">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Create your account
                      </h2>
                      <p className="mt-2 text-sm text-gray-600">
                        Join thousands of founders accessing non-dilutive
                        funding
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="mt-8 space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className="mt-1 block w-full text-gray-900 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          {...register("password")}
                          type="password"
                          id="password"
                          className="mt-1 mb-4 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                        />
                        {errors.password && (
                          <p className="mt-1 text-sm text-orange-600">
                            {errors.password.message}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-4 mt-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="w-1/3 flex justify-center items-center py-2 px-4 border border-orange-600 rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="font-medium text-orange-600 hover:text-orange-700"
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            ) : currentStep === 3 ? (
              <div className="max-w-md mx-auto border border-gray-200 rounded-lg p-8">
                <VerifyOTP
                  email={userEmail}
                  selectedRole={selectedRole}
                  password={userPassword}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            ) : currentStep === 4 ? (
              <div className="max-w-xl mx-auto border border-gray-200 rounded-lg p-8 shadow-lg">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Set Up Your Profile
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Help us match you with the best grants by telling us about
                    your startup.
                  </p>
                </div>

                <form
                  onSubmit={handleProfileSubmit(onProfileSubmit)}
                  className="space-y-4 mt-8"
                >
                  <div>
                    <label
                      htmlFor="startupName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Startup Name
                    </label>
                    <input
                      {...registerProfile("startupName")}
                      type="text"
                      id="startupName"
                      className="mt-1 block w-full px-3 py-2 border text-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                    />
                    {profileErrors.startupName && (
                      <p className="mt-1 text-sm text-orange-600">
                        {profileErrors.startupName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="stage"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="currentFunding"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="demographic"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="fundingNeeds"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="useOfFunds"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <ButtonLoader />
                        <span className="ml-2">Setting up...</span>
                      </>
                    ) : (
                      "Complete Setup"
                    )}
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
