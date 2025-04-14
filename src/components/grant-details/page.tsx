"use client";

import { Bookmark, Bot, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";
import { useState } from "react";


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

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function GrantDetailsPage() {
  const router = useRouter();
  const [currentAwardeeIndex, setCurrentAwardeeIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');

  const grantDetails = {
    title: "Faire Small Business Grant",
    amount: "$5,000",
    matchPercentage: "90% Match",
    deadline: "March 31, 2025",
    category: "Small Business",
    description: "Opportunity for founders to apply for Faire's small business grant program, designed to support early-stage retail businesses. This grant aims to empower entrepreneurs with the capital and resources needed to scale their operations.",
    eligibility: [
      "Early-Stage Business",
      "Retail Focus",
      "US-Based Company"
    ],
    additionalBenefits: [
      {
        title: "Google Cloud Credits",
        description: "$2,000 worth of cloud computing credits",
        icon: "G"
      }
    ]
  };

  const previousAwardees = [
    {
      name: "Emily Brown",
      role: "Technology, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Chen",
      role: "E-commerce, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Healthcare, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const nextAwardee = () => {
    setSlideDirection('right');
    setCurrentAwardeeIndex((prev) => 
      prev === previousAwardees.length - 1 ? 0 : prev + 1
    );
  };

  const prevAwardee = () => {
    setSlideDirection('left');
    setCurrentAwardeeIndex((prev) => 
      prev === 0 ? previousAwardees.length - 1 : prev - 1
    );
  };

  const saveGrant = (id: string) => {
    // TODO: Implement grant saving functionality
    console.log(`Saving grant with ID: ${id}`);
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-50"
    >
      <Navbar />
      <motion.main 
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-2"
          >
            <motion.div 
              variants={slideIn}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              {/* Header */}
              <motion.div 
                variants={fadeIn}
                className="flex justify-between items-start mb-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-xl font-bold text-gray-900">{grantDetails.title}</h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {grantDetails.matchPercentage}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-orange-600">{grantDetails.amount}</div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <Bookmark className="h-5 w-5 text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Grant Info */}
              <motion.div 
                variants={fadeInUp}
                className="grid grid-cols-2 gap-6 mb-8"
              >
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm font-medium text-gray-900">{grantDetails.deadline}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-medium text-gray-900">{grantDetails.category}</p>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div 
                variants={fadeInUp}
                className="mb-8"
              >
                <h2 className="text-base font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-sm text-gray-500">{grantDetails.description}</p>
              </motion.div>

              {/* Eligibility */}
              <motion.div 
                variants={fadeInUp}
                className="mb-8"
              >
                <h2 className="text-base font-semibold text-gray-900 mb-3">Eligibility</h2>
                <ul className="space-y-2">
                  {grantDetails.eligibility.map((item, index) => (
                    <motion.li 
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center gap-2"
                    >
                      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-500">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Additional Benefits */}
              <motion.div variants={fadeInUp}>
                <h2 className="text-base font-semibold text-gray-900 mb-3">Additional Benefits</h2>
                <div className="bg-blue-50 rounded-lg p-4">
                  {grantDetails.additionalBenefits.map((benefit, index) => (
                    <motion.div 
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center gap-4"
                    >
                      <div className="h-7 w-7 bg-white rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{benefit.title}</h3>
                        <p className="text-xs text-gray-500">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Apply Button */}
            <motion.div 
              variants={slideIn}
              className="flex flex-col gap-2 shadow-sm rounded-lg p-4 bg-white"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange-500 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 flex items-center justify-center gap-2"
              >
                <Bot className="h-4 w-4" />
                Apply with AI Co-Pilot
              </motion.button>

              {/* Save Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-orange-500 text-orange-500 py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-orange-50"
                onClick={() => saveGrant(grantDetails.title)}
              >
                Save Grant
              </motion.button>
            </motion.div>

            {/* Previous Awardee Carousel */}
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
                        src={previousAwardees[currentAwardeeIndex].avatar}
                        alt={previousAwardees[currentAwardeeIndex].name}
                        width={80}
                        height={80}
                        className="rounded-full mx-auto mb-3"
                      />
                      <h3 className="font-medium text-gray-900">{previousAwardees[currentAwardeeIndex].name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{previousAwardees[currentAwardeeIndex].role}</p>
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
                    className="absolute right-0 z-10 p-2 text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md cursor-pointer"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex justify-center mt-4 gap-2">
                  {previousAwardees.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAwardeeIndex(index)}
                      className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                        index === currentAwardeeIndex ? 'bg-orange-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
} 