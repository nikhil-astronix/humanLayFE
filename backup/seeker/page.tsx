"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, MapPin, Building2, TrendingUp, FileText, CreditCard, ChevronUp, ChevronDown, Pencil, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5 }
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startupDetails, setStartupDetails] = useState({
    fundingNeed: "$50,000",
    useOfFunds: "R&D",
    companyStage: "Early-Stage",
    teamSize: "5-10 employees",
    // Additional details that show in expanded mode
    industry: "Technology",
    foundedYear: "2023",
    revenue: "$100,000",
    location: "San Francisco, CA",
    website: "www.example.com",
    pitchDeck: "View PDF"
  });

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
    },
    {
      name: "Michael Chen",
      role: "AI Innovation, YC Grant Recipient",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Biotech, NSF Grant Winner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const [currentAwardeeIndex, setCurrentAwardeeIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');

  const nextAwardee = () => {
    setSlideDirection('right');
    setCurrentAwardeeIndex((prev) => (prev + 1) % awardees.length);
  };

  const prevAwardee = () => {
    setSlideDirection('left');
    setCurrentAwardeeIndex((prev) => (prev - 1 + awardees.length) % awardees.length);
  };

  const handleDotClick = (index: number) => {
    setSlideDirection(index > currentAwardeeIndex ? 'right' : 'left');
    setCurrentAwardeeIndex(index);
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    setIsExpanded(true); // Always expand when entering edit mode
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    setIsExpanded(false); // Collapse after saving
  };

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const designation = localStorage.getItem('userDesignation');
    if (name) setUserName(name);
    if (designation) setUserDesignation(designation);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.main 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4"
      >
        {/* Profile Header */}
        <motion.div 
          variants={fadeInUp}
          className="bg-white rounded-lg p-6 shadow-sm mb-8"
        >
          <div className="flex items-start gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Sarah Chen"
                width={96}
                height={96}
                className="rounded-full"
              />
            </motion.div>
            <motion.div variants={fadeIn} className="flex-1">
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
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-3 gap-8"
        >
          {/* Left Column */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-2 space-y-8"
          >
            {/* Startup Details */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg p-6 shadow-sm relative"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Startup Details</h2>
                <button
                  onClick={handleEditClick}
                  className="text-sm px-3 py-1 text-orange-600 hover:text-orange-700 border border-orange-600 rounded-md flex items-center gap-2"
                >
                  {isEditMode ? (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4" />
                      Edit
                    </>
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(startupDetails)
                  .slice(0, isEditMode || isExpanded ? undefined : 4)
                  .map(([key, value]) => (
                    <div key={key}>
                      <p className="text-sm text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setStartupDetails(prev => ({
                            ...prev,
                            [key]: e.target.value
                          }))}
                          className="mt-1 p-2 text-gray-500 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-600 focus:ring-orange-600 sm:text-sm"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-900">{value}</p>
                      )}
                    </div>
                ))}
              </div>

              {!isEditMode && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center text-sm text-orange-600 hover:text-orange-700"
                  >
                    {isExpanded ? (
                      <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                    ) : (
                      <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
                    )}
                  </button>
                </div>
              )}
            </motion.div>

            {/* Top Grant Matches */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Top Grant Matches</h2>
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700">View All</a>
              </div>
              <motion.div 
                variants={staggerContainer}
                className="space-y-4"
              >
                {topGrantMatches.map((grant, index) => (
                  <motion.div
                    key={index}
                    variants={slideIn}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{grant.name}</h3>
                      <p className="text-sm text-gray-500">{grant.amount} - {grant.category}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {grant.matchPercentage}% Match
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Application Progress */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Progress</h2>
              <motion.div variants={staggerContainer}>
                {applications.map((app, index) => (
                  <motion.div
                    key={index}
                    variants={slideIn}
                    className="border border-gray-200 rounded-lg p-4"
                  >
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
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => router.push('/home/progress')}
                        className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-8"
          >
            {/* Connect with Awardees */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Connect with Awardees</h2>
              <div className="relative">
                <div className="flex items-center">
                  <button
                    onClick={prevAwardee}
                    className="absolute cursor-pointer left-0 z-10 p-2 text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                   <motion.div
                    key={currentAwardeeIndex}
                    initial={{ opacity: 0, x: slideDirection === 'right' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideDirection === 'right' ? -50 : 50 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full px-6"
                  >
                    <div className="text-center">
                      <Image
                        src={awardees[currentAwardeeIndex].avatar}
                        alt={awardees[currentAwardeeIndex].name}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-medium text-gray-900">{awardees[currentAwardeeIndex].name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{awardees[currentAwardeeIndex].role}</p>
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => router.push('/home/winner')}
                          className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50"
                        >
                          View Profile
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
                          Request Contact
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  <button
                    onClick={nextAwardee}
                    className="absolute right-0 z-10 p-2  text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md cursor-pointer"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex justify-center mt-4 gap-2">
                  {awardees.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                        index === currentAwardeeIndex ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recommended Resources */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recommended Resources</h2>
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700">View All</a>
              </div>
              <motion.div 
                variants={staggerContainer}
                className="space-y-4"
              >
                {recommendedResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    variants={slideIn}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                  >
                    <span className="text-2xl">{resource.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.name}</h3>
                      <p className="text-sm text-gray-500">{resource.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.main>
    </div>
  );
} 