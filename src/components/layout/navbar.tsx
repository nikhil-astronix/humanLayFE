"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2
    }
  }
};

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth/');

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/"
                  className="flex items-center"
                >
                  <Logo />
                </Link>
              </motion.div>

              {!isAuthPage && (
                <div className="hidden sm:flex sm:space-x-8">
                  <motion.div
                    initial="initial"
                    animate="animate"
                    variants={linkVariants}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href="/grants"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                        pathname === '/grants'
                          ? 'border-orange-600 text-gray-900'
                          : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-orange-600'
                      }`}
                    >
                      Grants
                    </Link>
                  </motion.div>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    variants={linkVariants}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href="/resources"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                        pathname === '/resources'
                          ? 'border-orange-600 text-gray-900'
                          : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-orange-600'
                      }`}
                    >
                      Resources
                    </Link>
                  </motion.div>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    variants={linkVariants}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -2 }}
                  >
                    <Link
                      href="/mentorship"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                        pathname === '/mentorship'
                          ? 'border-orange-600 text-gray-900'
                          : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-orange-600'
                      }`}
                    >
                      Mentorship
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            <div className="ml-auto hidden sm:flex sm:items-center sm:space-x-4">
              <motion.div
                initial="initial"
                animate="animate"
                variants={linkVariants}
                transition={{ delay: 0.3 }}
            
              >
                <Link
                  href="/auth/login"
                  className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-4 py-2 text-sm font-medium rounded-md"
                >
                  Login
                </Link>
              </motion.div>
              {!isAuthPage && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={linkVariants}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/register"
                    className="bg-orange-600 text-white hover:bg-orange-700 px-4 py-2 text-sm font-medium rounded-md"
                  >
                    Sign up
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      <div className="h-16" />
    </>
  );
}