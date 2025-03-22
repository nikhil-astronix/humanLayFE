"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 ">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center text-orange-600 font-bold text-xl"
            >
              Human
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/grants"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                pathname === "/grants"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-900 hover:text-orange-600"
              }`}
            >
              Grants
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 hover:text-orange-600"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 