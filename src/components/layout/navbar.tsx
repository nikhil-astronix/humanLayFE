"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-orange-600 text-2xl font-bold">
              Human
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              href="/grants"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
            >
              Grants
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-orange-600 px-4 py-2 rounded-[100px] hover:bg-orange-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 