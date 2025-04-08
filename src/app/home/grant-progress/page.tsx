"use client";

import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { Clock, FileText, CheckCircle, AlertCircle, Calendar, DollarSign, Users } from "lucide-react";
import Link from "next/link";

export default function GrantProgress() {
  const grantProgress = {
    grantName: "NIH AI Research Grant",
    amount: "$50,000",
    startDate: "March 15, 2025",
    endDate: "March 15, 2026",
    status: "Active",
    progress: 35,
    milestones: [
      {
        name: "Initial Report",
        deadline: "April 15, 2025",
        status: "pending",
        description: "Submit initial progress report and financial statements"
      },
      {
        name: "Midterm Review",
        deadline: "September 15, 2025",
        status: "upcoming",
        description: "Present project progress and key achievements"
      },
      {
        name: "Final Report",
        deadline: "March 1, 2026",
        status: "upcoming",
        description: "Submit comprehensive final report and outcomes"
      }
    ],
    team: [
      {
        name: "Dr. Sarah Chen",
        role: "Principal Investigator",
        status: "active"
      },
      {
        name: "Dr. Michael Lee",
        role: "Research Lead",
        status: "active"
      },
      {
        name: "Jennifer Wong",
        role: "Project Manager",
        status: "active"
      }
    ],
    documents: [
      {
        name: "Q1 Progress Report",
        status: "pending",
        dueDate: "April 15, 2025"
      },
      {
        name: "Financial Statement",
        status: "pending",
        dueDate: "April 15, 2025"
      },
      {
        name: "Research Documentation",
        status: "pending",
        dueDate: "April 15, 2025"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "upcoming":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{grantProgress.grantName}</h1>
                <p className="text-gray-600">Grant Progress Tracking</p>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {grantProgress.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grant Amount</p>
                  <p className="font-semibold text-gray-900">{grantProgress.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-semibold text-gray-900">{grantProgress.startDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-semibold text-gray-900">{grantProgress.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team Members</p>
                  <p className="font-semibold text-gray-900">{grantProgress.team.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Milestones */}
            <div className="col-span-2 space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Milestones</h2>
                <div className="space-y-8">
                  {grantProgress.milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.status === "completed" ? "bg-green-100" :
                            milestone.status === "pending" ? "bg-yellow-100" : "bg-blue-100"
                          }`}>
                            {milestone.status === "completed" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : milestone.status === "pending" ? (
                              <Clock className="h-5 w-5 text-yellow-600" />
                            ) : (
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            )}
                          </div>
                          {index < grantProgress.milestones.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">{milestone.name}</h3>
                            <span className={`text-sm px-2.5 py-0.5 rounded-full ${getStatusBadgeColor(milestone.status)}`}>
                              {milestone.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {milestone.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Team & Documents */}
            <div className="space-y-8">
              {/* Team Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
                <div className="space-y-4">
                  {grantProgress.team.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h2>
                <div className="space-y-4">
                  {grantProgress.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">Due: {doc.dueDate}</p>
                        </div>
                      </div>
                      <span className={`text-sm px-2.5 py-1 rounded-full ${getStatusBadgeColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 