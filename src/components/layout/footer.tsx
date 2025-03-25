"use client";

import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

const footerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
};

const socialVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  hover: { scale: 1.2 }
};

export function Footer() {
  return (
    <motion.footer 
      className="bg-white border-t border-gray-200"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div 
            className="space-y-4"
            variants={itemVariants}
          >
            <Logo />
            <p className="text-sm text-gray-500">
              Empowering startups with non-dilutive funding and resources
            </p>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Company</h3>
            <div className="space-y-3">
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/about" className="block text-sm text-gray-500 hover:text-orange-600">
                  About
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/contact" className="block text-sm text-gray-500 hover:text-orange-600">
                  Contact
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/careers" className="block text-sm text-gray-500 hover:text-orange-600">
                  Careers
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/help" className="block text-sm text-gray-500 hover:text-orange-600">
                  Help Center
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/blog" className="block text-sm text-gray-500 hover:text-orange-600">
                  Blog
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <Link href="/terms" className="block text-sm text-gray-500 hover:text-orange-600">
                  Terms
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Connect Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-orange-600"
                variants={socialVariants}
                whileHover="hover"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-orange-600"
                variants={socialVariants}
                whileHover="hover"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-orange-600"
                variants={socialVariants}
                whileHover="hover"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-8 pt-8 border-t border-gray-200"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-500 text-center">
            © 2025 Human
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
} 