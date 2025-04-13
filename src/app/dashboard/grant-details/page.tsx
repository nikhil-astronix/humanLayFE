"use client";

import { ArrowLeft, Eye, Mail, Download, DollarSign, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

interface Applicant {
  id: string;
  name: string;
  company: string;
  status: "Pending" | "Approved" | "Rejected";
  avatar: string;
}

export default function GrantDetailsPage() {
  const grantDetails = {
    title: "NIH AI Research Grant",
    amount: "$50,000",
    deadline: "June 30, 2025",
    description: "Support for innovative AI research projects focusing on healthcare applications and medical breakthroughs.",
    stats: {
      total: 10,
      pending: 7,
      approved: 2,
      rejected: 1
    }
  };

  const applicants: Applicant[] = [
    {
      id: "1",
      name: "Sarah Chen",
      company: "AI Innovate",
      status: "Pending",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "2",
      name: "John Smith",
      company: "TechCorp",
      status: "Approved",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "3",
      name: "Maria Garcia",
      company: "GreenTech",
      status: "Rejected",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

/*  const getStatusBadgeClass = (status: Applicant["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-800";
      case "Approved":
        return "bg-green-50 text-green-800";
      case "Rejected":
        return "bg-red-50 text-red-800";
      default:
        return "bg-gray-50 text-gray-800";
    }
  }; */

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-3 mb-6 text-sm text-gray-500">
          <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <span>›</span>
          <span className="text-gray-900">Grant Details</span>
        </nav>

        {/* Grant Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-start">
            {/* Left side - Grant Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-gray-900">{grantDetails.title}</h1>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">{grantDetails.amount}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Deadline: {grantDetails.deadline}</span>
                </div>
              </div>

              <p className="text-gray-600 max-w-2xl">{grantDetails.description}</p>
            </div>

            {/* Right side - Stats */}
            <div className="flex gap-4">
              <div className="min-w-[150px] px-4 py-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Applications</p>
                <p className="text-3xl font-semibold text-gray-900">{grantDetails.stats.total}</p>
              </div>
              <div className="min-w-[150px] px-4 py-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-700 mb-1">Pending</p>
                <p className="text-3xl font-semibold text-yellow-700">{grantDetails.stats.pending}</p>
              </div>
              <div className="min-w-[150px] px-4 py-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Approved</p>
                <p className="text-3xl font-semibold text-green-700">{grantDetails.stats.approved}</p>
              </div>
              <div className="min-w-[150px] px-4 py-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-700 mb-1">Rejected</p>
                <p className="text-3xl font-semibold text-red-700">{grantDetails.stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Applicants</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={applicant.avatar}
                    alt={applicant.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{applicant.name}</h3>
                    <p className="text-sm text-gray-500">{applicant.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    applicant.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                    applicant.status === "Approved" ? "bg-green-50 text-green-700" :
                    "bg-red-50 text-red-700"
                  }`}>
                    {applicant.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-8">
          <Link 
            href="/dashboard"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </main>
    </div>
  );
} 
