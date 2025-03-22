"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, PlusCircle, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";

const grants = [
  {
    id: 1,
    name: "Faire Small Business Grant",
    amount: "$5,000",
    stats: {
      totalApplications: 10,
      pending: 5,
      approved: 3,
    },
    applicants: [
      {
        id: 1,
        name: "Sarah Johnson",
        company: "AI Innovate",
        status: "Pending",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 2,
        name: "John Smith",
        company: "TechCorp",
        status: "Approved",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    name: "Tech Innovation Grant",
    amount: "$10,000",
    stats: {
      totalApplications: 15,
      pending: 8,
      approved: 4,
    },
    applicants: [
      {
        id: 3,
        name: "Sarah Johnson",
        company: "AI Innovate",
        status: "Pending",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 4,
        name: "John Smith",
        company: "TechCorp",
        status: "Approved",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

export function ActiveGrants() {
  const [expandedGrant, setExpandedGrant] = useState<number | null>(null);

  const toggleGrant = (grantId: number) => {
    setExpandedGrant((prev) => prev === grantId ? null : grantId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Active Grants</h2>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-1.5" />
            Filter
          </button>
          <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
            <PlusCircle className="h-4 w-4 mr-1.5" />
            New Grant
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {grants.map((grant) => (
          <div key={grant.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div
              className="px-6 py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleGrant(grant.id)}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {grant.name}
                  </h3>
                  <p className="text-sm text-gray-500">{grant.amount}</p>
                </div>
                {expandedGrant === grant.id ? (
                  <ChevronUp className="h-5 w-5 text-orange-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-orange-600" />
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Applications
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {grant.stats.totalApplications}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="mt-1 text-2xl font-semibold text-amber-500">
                    {grant.stats.pending}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Approved</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-500">
                    {grant.stats.approved}
                  </p>
                </div>
              </div>
            </div>

            {expandedGrant === grant.id && (
              <div className=" border-gray-200">
                <div className="px-6 py-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Recent Applicants
                  </h4>
                  <div className="space-y-4 ">
                    {grant.applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="flex items-center justify-between py-1 px-1 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center ">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={applicant.avatar}
                            alt={applicant.name}
                            width={40}
                            height={40}
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {applicant.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {applicant.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              applicant.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {applicant.status}
                          </span>
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-gray-500">
                              <Mail className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-500">
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 