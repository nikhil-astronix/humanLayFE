"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, MapPin, Building2, TrendingUp, FileText, CreditCard } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const LoadingCard = () => (
  <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-xl"></div>
);

const StatsCard = ({ value, label }: { value: string; label: string }) => (
  <motion.div
    variants={fadeInUp}
    className="text-center p-6 bg-white shadow rounded-xl"
  >
    <h3 className="text-2xl font-bold text-orange-600">{value}</h3>
    <p className="text-gray-500 mt-1">{label}</p>
  </motion.div>
);

const ActionCard = ({
  title,
  description,
  buttonText,
  icon,
  onClick,
  className = "",
}: {
  title: string;
  description: string;
  buttonText: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className={`bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center ${className}`}
  >
    <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 icon-bg">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 mb-4">{description}</p>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full py-3 px-4 text-white rounded-lg font-medium button"
    >
      {buttonText}
    </motion.button>
  </motion.div>
);

export default function GrantSeekerDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userDesignation, setUserDesignation] = useState<string>("");

  const startupDetails = {
    fundingNeed: "$50,000",
    useOfFunds: "R&D",
    companyStage: "Early-Stage",
    teamSize: "5-10 employees"
  };

  const topGrantMatches = [
    {
      name: "Faire Small Business Grant",
      amount: "$5,000",
      category: "Technology Startups",
      matchPercentage: 90
    },
    {
      name: "Headstream Accelerator",
      amount: "$30,000",
      category: "AI Innovation",
      matchPercentage: 85
    }
  ];

  const applications = [
    {
      grantName: "Faire Small",
      status: "In Review",
      submittedDate: "March 18, 2025"
    }
  ];

  const recommendedResources = [
    {
      name: "Clerky",
      description: "Legal Services for Early-Stage",
      icon: <FileText className="h-6 w-6 text-gray-500" />
    },
    {
      name: "Brex",
      description: "Banking Services",
      icon: <CreditCard className="h-6 w-6 text-gray-500" />
    }
  ];

  const awardees = [
    {
      name: "Emily Brown",
      role: "Technology, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const designation = localStorage.getItem('userDesignation');
    if (name) setUserName(name);
    if (designation) setUserDesignation(designation);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-start gap-6">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Sarah Chen"
              width={96}
              height={96}
              className="rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Sarah Chen</h1>
                  <p className="text-gray-600">Founder & CEO at AI Innovate</p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
                  Edit Profile
                </button>
              </div>
              <div className="flex items-center gap-6 mt-4 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Technology
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Early-Stage
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-8">
            {/* Startup Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Startup Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Funding Need</p>
                  <p className="text-lg font-medium text-gray-900">{startupDetails.fundingNeed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Use of Funds</p>
                  <p className="text-lg font-medium text-gray-900">{startupDetails.useOfFunds}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company Stage</p>
                  <p className="text-lg font-medium text-gray-900">{startupDetails.companyStage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="text-lg font-medium text-gray-900">{startupDetails.teamSize}</p>
                </div>
              </div>
            </div>

            {/* Top Grant Matches */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Top Grant Matches</h2>
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700">View All</a>
              </div>
              <div className="space-y-4">
                {topGrantMatches.map((grant, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{grant.name}</h3>
                      <p className="text-sm text-gray-500">{grant.amount} - {grant.category}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {grant.matchPercentage}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Progress */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Progress</h2>
              {applications.map((app, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{app.grantName}</h3>
                      <p className="text-sm text-gray-500">Submitted on {app.submittedDate}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {app.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Connect with Awardees */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Connect with Awardees</h2>
              {awardees.map((awardee, index) => (
                <div key={index} className="text-center">
                  <Image
                    src={awardee.avatar}
                    alt={awardee.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-3"
                  />
                  <h3 className="font-medium text-gray-900">{awardee.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{awardee.role}</p>
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
                    Request Contact
                  </button>
                </div>
              ))}
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recommended Resources</h2>
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700">View All</a>
              </div>
              <div className="space-y-4">
                {recommendedResources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                    <span className="text-2xl">{resource.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.name}</h3>
                      <p className="text-sm text-gray-500">{resource.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 