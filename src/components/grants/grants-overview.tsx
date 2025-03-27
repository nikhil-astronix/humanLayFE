"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function GrantsOverview() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      {...staggerContainer}
    >
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm"
        variants={fadeInUp}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">Active Grants</h3>
        <p className="text-3xl font-bold text-orange-600">12</p>
        <p className="text-sm text-gray-500 mt-1">Currently running</p>
      </motion.div>

      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm"
        variants={fadeInUp}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">Total Funding</h3>
        <p className="text-3xl font-bold text-orange-600">$250K</p>
        <p className="text-sm text-gray-500 mt-1">Available to distribute</p>
      </motion.div>

      <motion.div 
        className="bg-white p-6 rounded-lg shadow-sm"
        variants={fadeInUp}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-2">Applications</h3>
        <p className="text-3xl font-bold text-orange-600">156</p>
        <p className="text-sm text-gray-500 mt-1">Total submissions</p>
      </motion.div>
    </motion.div>
  );
} 