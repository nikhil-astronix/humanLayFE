"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Home, UserCircle, LogOut, Award, BookOpen, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export function Navbar() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Updated authentication check logic
  const isAuthPage = pathname?.startsWith('/auth/');
  const protectedRoutes = ['/home', '/grants', '/resources', '/mentorship'];
  const isAuthenticated = useCallback(() => {
    if (isAuthPage) return false;
    
    // Check if current path starts with any protected route
    return protectedRoutes.some(route => 
      pathname?.startsWith(route) || 
      localStorage.getItem('userEmail') !== null
    );
  }, [pathname, isAuthPage]);

  useEffect(() => {
    // Get user data from localStorage
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    
    // If no auth data but on protected route, redirect to login
    if (!email && isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    
    if (email) setUserEmail(email);
    if (name) setUserName(name);
  }, [pathname, router, isAuthenticated]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userDesignation');
    router.push('/');
  };

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm"
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
            </div>

            <div className="ml-auto hidden sm:flex sm:items-center sm:space-x-8">
              {!isAuthPage && (
                <div className="flex sm:space-x-8">
                  {isAuthenticated() && (
                    <>
                      <motion.div
                        initial="initial"
                        animate="animate"
                        variants={linkVariants}
                        whileHover={{ y: -2 }}
                      >
                        <Link
                          href="/home"
                          className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                            pathname === '/home'
                              ? 'border-orange-600 text-gray-900'
                              : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-orange-600'
                          }`}
                        >
                          <Home className="w-4 h-4 mr-1" />
                          Home
                        </Link>
                      </motion.div>
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
                          <Award className="w-4 h-4 mr-1" />
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
                          <BookOpen className="w-4 h-4 mr-1" />
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
                          <Users className="w-4 h-4 mr-1" />
                          Mentorship
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              )}

              {!isAuthenticated() && !isAuthPage && (
                <>
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
                </>
              )}

              {isAuthenticated() && (
                <div className="relative" ref={dropdownRef}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        fill
                        className="object-cover"
                        onError={() => setProfileImage(null)}
                      />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </motion.div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-gray-200 ring-opacity-5"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{userName}</p>
                          <p className="text-xs text-gray-500">{userEmail}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <UserCircle className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      <div className="h-16" />
    </>
  );
}