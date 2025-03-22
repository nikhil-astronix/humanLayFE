"use client";

import { CheckCircle2, LayoutGrid, Users, ClipboardList, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface GrantSuccessProps {
  grantData: {
    name: string;
    amount: string;
    applicationDeadline: string;
  };
  onAddAnother: () => void;
}

export function GrantSuccess({ grantData, onAddAnother }: GrantSuccessProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-8 text-center max-w-2xl mx-auto shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Grant Added Successfully!</h2>
        <p className="text-gray-600 mb-6">Your grant has been successfully added to the platform.</p>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm text-left font-medium text-gray-900 mb-4">Grant Summary</h3>
          <dl >
            <div className="py-2 flex justify-between">
              <dt className="text-sm text-gray-500">Grant Name:</dt>
              <dd className="text-sm font-medium text-gray-500">{grantData.name}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm text-gray-500">Amount:</dt>
              <dd className="text-sm font-medium text-gray-500">${grantData.amount}</dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm text-gray-500">Deadline:</dt>
              <dd className="text-sm font-medium text-gray-500">
                {new Date(grantData.applicationDeadline).toLocaleDateString()}
              </dd>
            </div>
            <div className="py-2 flex justify-between">
              <dt className="text-sm text-gray-500">Provider:</dt>
              <dd className="text-sm font-medium text-gray-500">NIH Program Office</dd>
            </div>
          </dl>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => router.push("/grants")}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 flex items-center justify-center gap-2"
          >
            <ClipboardList className="h-4 w-4" />
            Manage Your Grants
          </button>
          <button
            onClick={onAddAnother}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-orange-600 rounded-md hover:bg-orange-600 hover:text-white flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            Add Another Grant
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex gap-6">
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm flex-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <LayoutGrid className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-500">Total Active Grants</p>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm flex-1">
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