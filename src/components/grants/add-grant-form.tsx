"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LayoutGrid, Users } from "lucide-react";
import { ButtonLoader } from "@/components/ui/loader";

interface AddGrantFormProps {
  onSubmit: (data: {
    name: string;
    amount: string;
    applicationDeadline: string;
  }) => void;
}

export function AddGrantForm({ onSubmit }: AddGrantFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    description: "",
    applicationDeadline: "",
    externalLink: "",
    industry: "",
    stage: "",
    demographics: "",
    benefits: {
      googleCloudCredits: false,
      awsCredits: false,
      mentorshipProgram: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit({
        name: formData.name,
        amount: formData.amount,
        applicationDeadline: formData.applicationDeadline,
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-lg p-8 text-center max-w-md w-full shadow-sm mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Grant Added Successfully!</h2>
          <p className="text-gray-600 mb-6">Your grant has been successfully added to the platform.</p>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Grant Summary</h3>
            <dl className="divide-y divide-gray-200">
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Grant Name:</dt>
                <dd className="text-sm font-medium text-gray-900">{formData.name}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Amount:</dt>
                <dd className="text-sm font-medium text-gray-900">${formData.amount}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Deadline:</dt>
                <dd className="text-sm font-medium text-gray-900">{new Date(formData.applicationDeadline).toLocaleDateString()}</dd>
              </div>
              <div className="py-2 flex justify-between">
                <dt className="text-sm text-gray-500">Provider:</dt>
                <dd className="text-sm font-medium text-gray-900">NIH Program Office</dd>
              </div>
            </dl>
          </div>
          <div className="mt-6 space-x-4">
            <button
              onClick={() => router.push("/grants")}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 mb-3 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Manage Your Grants
            </button>
            <button
              onClick={() => {
                setShowSuccess(false);
                setFormData({
                  name: "",
                  amount: "",
                  description: "",
                  applicationDeadline: "",
                  externalLink: "",
                  industry: "",
                  stage: "",
                  demographics: "",
                  benefits: {
                    googleCloudCredits: false,
                    awsCredits: false,
                    mentorshipProgram: false,
                  },
                });
              }}
              className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Add Another Grant
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-6">
          <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <LayoutGrid className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-500">Total Active Grants</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-500">Total Applicants</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-[1200px] mx-auto">
      <div className="space-y-10">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Grant Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g., NIH AI Research Grant"
                className="mt-2 block w-full rounded-md border border-gray-500 p-2 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount<span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  id="amount"
                  placeholder="50,000"
                  className="block w-full pl-7 rounded-md border border-gray-500 p-2 text-gray-900 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe the grant and its objectives..."
              className="mt-2 block w-full rounded-md border border-gray-500 p-2 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Application Deadline<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deadline"
                className="mt-2 block w-full text-gray-900 rounded-md border border-gray-500 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                External Link
              </label>
              <input
                type="url"
                id="link"
                placeholder="https://"
                className="mt-2 block w-full text-gray-900 rounded-md border border-gray-500 p-2 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={formData.externalLink}
                onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Eligibility Criteria</h2>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-3">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry<span className="text-red-500">*</span>
              </label>
              <select
                id="industry"
                className="mt-2 block w-full rounded-md border border-gray-500 p-2 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                required
              >
                <option value="">Select Industries</option>
                <option value="tech">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
              </select>
            </div>
            <div>
              <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
                Stage<span className="text-red-500">*</span>
              </label>
              <select
                id="stage"
                className="mt-2 block w-full rounded-md border border-gray-500 p-2 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                required
              >
                <option value="">Select Stage</option>
                <option value="idea">Idea Stage</option>
                <option value="mvp">MVP</option>
                <option value="growth">Growth</option>
              </select>
            </div>
            <div>
              <label htmlFor="demographics" className="block text-sm font-medium text-gray-700">
                Demographics
              </label>
              <select
                id="demographics"
                className="mt-2 block w-full rounded-md border border-gray-500 p-2 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={formData.demographics}
                onChange={(e) => setFormData({ ...formData, demographics: e.target.value })}
              >
                <option value="">Select Demographics</option>
                <option value="women">Women Founders</option>
                <option value="minority">Minority Owned</option>
                <option value="veteran">Veteran Owned</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-6">Non-Financial Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center">
              <input
                id="googleCloud"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                checked={formData.benefits.googleCloudCredits}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    benefits: { ...formData.benefits, googleCloudCredits: e.target.checked },
                  })
                }
              />
              <label htmlFor="googleCloud" className="ml-2 block text-sm text-gray-700">
                Google Cloud Credits
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="aws"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                checked={formData.benefits.awsCredits}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    benefits: { ...formData.benefits, awsCredits: e.target.checked },
                  })
                }
              />
              <label htmlFor="aws" className="ml-2 block text-sm text-gray-700">
                AWS Credits
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="mentorship"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                checked={formData.benefits.mentorshipProgram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    benefits: { ...formData.benefits, mentorshipProgram: e.target.checked },
                  })
                }
              />
              <label htmlFor="mentorship" className="ml-2 block text-sm text-gray-700">
                Mentorship Program
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-8">
        <button
          type="button"
          onClick={() => router.push("/grants")}
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-2.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <ButtonLoader />
              Adding Grant...
            </>
          ) : (
            "Add Grant"
          )}
        </button>
      </div>
    </form>
  );
} 