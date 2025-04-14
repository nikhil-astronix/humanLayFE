"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, Clock, Mail, User, Trophy, Gift, Lightbulb, Send, Check } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
// import { useRouter } from "next/navigation";

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

export default function WinnerProfile() {
 

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <motion.main 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {/* Profile Header */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow p-6 mb-6"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Emily Brown"
                    width={96}
                    height={96}
                    className="rounded-full"
                  />
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <motion.h1 
                        variants={fadeIn}
                        className="text-2xl font-semibold text-gray-900"
                      >
                        Emily Brown
                      </motion.h1>
                      <motion.p 
                        variants={fadeIn}
                        className="text-gray-600 mt-1"
                      >
                        AI Solutions
                      </motion.p>
                    </div>
                    <motion.div 
                      variants={fadeIn}
                      className="flex items-center"
                    >
                      <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full flex items-center gap-1">
                        <Check className="h-4 w-4" />
                        Verified Winner
                      </span>
                    </motion.div>
                  </div>

                  <motion.div 
                    variants={fadeIn}
                    className="mt-4 flex items-center gap-6 text-sm text-gray-500"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      <span>TechFlow AI</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Experience & Background */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Experience & Background</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      Professional Background
                    </h3>
                    <p className="text-gray-600">
                      Experienced tech founder with 5 years in AI startups. Specialized in machine learning applications for business automation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      Grant Success
                    </h3>
                    <p className="text-gray-600">
                      Won $5,000 Faire Small Business Grant in 2024. Successfully scaled team to 10 employees and achieved 300% revenue growth.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Grant Details */}
            <motion.div 
              variants={fadeInUp}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Grant Details</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Gift className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      Faire Small Business Grant
                    </h3>
                    <p className="text-gray-600">
                      $5,000 grant for early-stage retail founders focusing on technology innovation and sustainable business practices.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      Success Factors
                    </h3>
                    <p className="text-gray-600">
                      Key success factors included strong market validation, clear business model, and innovative use of AI technology.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Connect Section - Right Side */}
          <motion.div 
            variants={fadeInUp}
            className="lg:w-80 space-y-6"
          >
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Connect with Emily</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="h-5 w-5" />
                  <span>Usually responds within 48 hours</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>Prefers email communication</span>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                Request Contact
                <Send className="h-5 w-5" />
              </button>

              <p className="text-gray-500 text-sm mt-4 text-center">
                Your contact details will remain private until Emily accepts your request
              </p>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}