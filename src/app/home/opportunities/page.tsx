"use client";

import { motion } from "framer-motion";
import { MessageSquare, ArrowRight, Calendar, Clock, Bookmark, TrendingUp, Send, Eye } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTrendingGrants } from "@/services/grantService";
import { TrendingGrantData } from "@/types/grantsData";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

interface GrantCardProps {
  title: string;
  amount: string;
  description: string;
  status?: "Trending" | "Opening Soon";
  daysLeft?: number;
  openingDate?: string;
  dueDate?: string;
  variant?: "trending" | "ending";
}

const GrantCard = ({
  title,
  amount,
  description,
  status,
  daysLeft,
  openingDate,
  dueDate,
  variant = "trending"
}: GrantCardProps) => {
  const isEnding = variant === "ending";
  const router = useRouter();
  
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-xl shadow p-6 flex flex-col relative"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-lg font-medium text-gray-700">{amount}</p>
        </div>
        {status && (
          <span className={`px-3 py-1 rounded-full text-sm ${
            status === "Trending" 
              ? "bg-indigo-100 text-indigo-700" 
              : "bg-emerald-50 text-emerald-700"
          }`}>
            {status}
          </span>
        )}
        {daysLeft && (
          <span className="absolute right-6 top-6 px-3 py-1 rounded-full text-sm bg-red-50 text-red-600 flex items-center gap-1">
            {daysLeft} days left
          </span>
        )}
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {(openingDate || dueDate) && (
        <div className={`text-sm ${isEnding ? 'text-red-500' : 'text-gray-500'} mb-4 flex items-center`}>
          <Calendar className="w-4 h-4 mr-2" />
          {openingDate ? (
            <span className="text-emerald-600">Opens {openingDate}</span>
          ) : (
            `Due ${dueDate}`
          )}
        </div>
      )}
      
      <div className="mt-auto flex flex-col gap-2">
        {!openingDate && (
          <>
            {/* <button className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isEnding 
                ? "border border-red-200 text-red-600 hover:bg-red-50"
                : "border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            }`}>
              <MessageSquare className="w-4 h-4" />
              Message Mentor
            </button> */}
            <button 
              onClick={() => router.push('/home/grant-details')}
              className={`w-full py-2 px-4 text-white rounded-lg flex items-center justify-center gap-2 transition-colors ${
              isEnding
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#6366F1] hover:bg-[#5558E3]"
            }`}>
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </>
        )}
        {openingDate && (
          <button className="w-full py-2 px-4 border border-emerald-600 text-emerald-600 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors">
            <Bookmark className="w-4 h-4" />
            Save to Profile
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function GrantOpportunities() {
  const [trendData, setTrendData] = useState<TrendingGrantData>();

  useEffect(() => {
    getGrantData();
  }, []);

  const getGrantData = async () => {
    const newData = await getTrendingGrants();
    const trendGrantData = newData.data;
    setTrendData(trendGrantData);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            key="main-container"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div key="header" variants={fadeInUp} className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Grant Opportunities</h1>
              <p className="text-gray-600">Discover trending, upcoming, and urgent grants tailored for you</p>
            </motion.div>

            <section className="mb-12">
              <motion.div key="trending-header" variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Trending Grants</h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <GrantCard
                  key="faire-grant"
                  title="Faire Grant"
                  amount="$5,000"
                  description="For tech startups in ideation phase, perfect for woman-owned businesses"
                  status="Trending"
                  variant="trending"
                />
                <GrantCard
                  key="women-tech-fund"
                  title="WomenTech Fund"
                  amount="$7,500"
                  description="Supporting women-led technology ventures in early stages"
                  status="Trending"
                  variant="trending"
                />
              </div>
              
              <motion.button
                key="see-more-trending"
                variants={fadeInUp}
                className="mt-4 ml-auto text-indigo-600 flex text-end cursor-pointer items-center gap-1 hover:text-indigo-700"
                aria-label="See more trending grants"
              >
                See More Trending Grants
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </section>

            <section className="mb-12">
              <motion.div key="upcoming-header" variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Grants</h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <GrantCard
                  key="tech-seed-fund"
                  title="Tech Seed Fund"
                  amount="$10,000"
                  description="Perfect for product development and MVP creation"
                  status="Opening Soon"
                  openingDate="April 15, 2025"
                />
                <GrantCard
                  key="innovation-first"
                  title="Innovation First"
                  amount="$15,000"
                  description="For innovative tech solutions in early stages"
                  status="Opening Soon"
                  openingDate="May 1, 2025"
                />
              </div>
            </section>

            <section>
              <motion.div key="ending-header" variants={fadeInUp} className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">Grants Ending Soon</h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <GrantCard
                  key="local-innovator"
                  title="Local Innovator Grant"
                  amount="$2,000"
                  description="Supporting local tech entrepreneurs"
                  daysLeft={6}
                  dueDate="March 31, 2025"
                  variant="ending"
                />
                <GrantCard
                  key="quick-start"
                  title="Quick Start Fund"
                  amount="$3,500"
                  description="Rapid funding for tech startups"
                  daysLeft={3}
                  dueDate="March 28, 2025"
                  variant="ending"
                />
              </div>
            </section>
          </motion.div>
        </div>
      </main>
    </>
  );
} 