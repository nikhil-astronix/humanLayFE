"use client";

import { Navbar } from "@/components/layout/navbar";
import { GrantsOverview } from "@/components/grants/grants-overview";
import { ActiveGrants } from "@/components/grants/active-grants";
import { motion } from "framer-motion";
import { pageTransition, staggerContainer } from "@/lib/animations";

export default function GrantsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar />
      </div>
      <motion.main 
        className="flex-1 max-w-full w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16"
        {...pageTransition}
      >
        <motion.div {...staggerContainer}>
          <motion.h1 
            className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Grants Overview
          </motion.h1>
          <GrantsOverview />
          <ActiveGrants />
        </motion.div>
      </motion.main>
    </div>
  );
} 