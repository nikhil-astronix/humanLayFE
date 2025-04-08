"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Clock, FileText, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ApplicationProgress() {
  const applications = [
    {
      id: 1,
      grantName: "NIH AI Research Grant",
      amount: "$50,000",
      submittedDate: "March 15, 2025",
      status: "In Review",
      progress: 75,
      nextStep: "Technical Review",
      documents: [
        { name: "Business Plan", status: "approved" },
        { name: "Financial Projections", status: "pending" },
        { name: "Technical Documentation", status: "pending" }
      ]
    },
    {
      id: 2,
      grantName: "Tech Innovation Fund",
      amount: "$25,000",
      submittedDate: "March 10, 2025",
      status: "Additional Info Required",
      progress: 40,
      nextStep: "Document Submission",
      documents: [
        { name: "Project Proposal", status: "approved" },
        { name: "Team Credentials", status: "rejected" },
        { name: "Market Analysis", status: "pending" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Application Progress</h1>
            <p className="text-gray-600 mt-2">Track the status of your grant applications</p>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {applications.map((application) => (
              <div key={application.id} className="bg-white rounded-lg shadow-sm">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{application.grantName}</h2>
                      <p className="text-gray-600">{application.amount}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      application.status === "In Review" 
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {application.status}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="p-6 border-b border-gray-200">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Application Progress</span>
                      <span className="text-sm font-medium text-gray-900">{application.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${application.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Submitted on {application.submittedDate}</span>
                    <span className="text-gray-900">Next: {application.nextStep}</span>
                  </div>
                </div>

                {/* Documents */}
                <div className="p-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Required Documents</h3>
                  <div className="space-y-3">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">{doc.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 