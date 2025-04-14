"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, TrendingUp, FileText, CreditCard } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { useRouter } from "next/navigation";

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
  description: string | React.ReactNode;
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
    <div className="text-gray-500 mb-4">{description}</div>
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

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userDesignation, setUserDesignation] = useState<string>("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const designation = localStorage.getItem("userDesignation");
    if (name) setUserName(name);
    if (designation) setUserDesignation(designation);
  }, []);

  const recommendedResources = [
    {
      name: "Clerky",
      description: "Legal Services for Early-Stage",
      icon: <FileText className="h-6 w-6 text-orange-600" />
    },
    {
      name: "Brex",
      description: "Banking Services",
      icon: <CreditCard className="h-6 w-6 text-orange-600" />
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Suspense
            fallback={
              <div className="h-8 bg-gray-100 animate-pulse rounded mb-4"></div>
            }
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div variants={fadeInUp} className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Welcome {userName}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {userDesignation} Founder of ai innovate
                </p>
                <div className="flex gap-2 justify-center">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">Technology</span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">Early-Stage</span>
                  <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-800 text-sm">Woman-Owned</span>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Suspense fallback={<LoadingCard />}>
                  <ActionCard
                    title="Explore Grant Matches"
                    description="Discover grants matching your '50,000 R&D funding needs"
                    buttonText="View Your Matches"
                    icon={<Target className="h-6 w-6 text-white" />}
                    onClick={() => router.push("/home/opportunities")}
                    className="[&_.icon-bg]:bg-[#E84E32] [&_button]:bg-[#E84E32] [&_button:hover]:bg-[#d64428]"
                  />
                </Suspense>
                <Suspense fallback={<LoadingCard />}>
                  <ActionCard
                    title="Access Resources"
                    description="Get Google Cloud Credits and other startup resources"
                    buttonText="Discover Resources"
                    icon={<Lightbulb className="h-6 w-6 text-white" />}
                    onClick={() => {}}
                    className="[&_.icon-bg]:bg-[#1C1E23] [&_button]:bg-[#1C1E23] [&_button:hover]:bg-[#2C2E33]"
                  />
                </Suspense>
                <Suspense fallback={<LoadingCard />} >
                  <ActionCard
                    title="Profile Progress"
                    description={
                      <div className="w-full">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Completion Status</span>
                          <span className="text-sm font-medium text-gray-900">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Complete your profile to unlock more opportunities</p>
                      </div>
                    }
                    buttonText="Complete Profile"
                    icon={<TrendingUp className="h-6 w-6 text-white" />}
                    onClick={() => {}}
                    className="[&_.icon-bg]:bg-[#22C55E] [&_button]:bg-[#22C55E] [&_button:hover]:bg-[#16A34A]"
                  />
                </Suspense>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <Suspense
                  fallback={
                    <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
                  }
                >
                  <StatsCard value="15+" label="Grant Matches" />
                </Suspense>
                <Suspense
                  fallback={
                    <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
                  }
                >
                  <StatsCard value="$100K" label="Available Funding" />
                </Suspense>
                <Suspense
                  fallback={
                    <div className="h-24 bg-gray-100 animate-pulse rounded"></div>
                  }
                >
                  <StatsCard value="24/7" label="Support Access" />
                </Suspense>
              </div>

              {/* Recommended Resources section */}
              <div className="bg-white rounded-lg p-6 shadow-sm mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recommended Resources</h2>
                  <a href="#" className="text-sm text-orange-600 hover:text-orange-700">View All</a>
                </div>
                <div className="space-y-4">
                  {recommendedResources.map((resource, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0">
                        {resource.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.name}</h3>
                        <p className="text-sm text-gray-500">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Suspense>
        </div>
      </main>
    </>
  );
}
