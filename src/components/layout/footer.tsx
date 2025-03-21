import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left side - Copyright */}
        <div className="text-sm text-gray-500">
          © 2025 Human
        </div>

        {/* Right side - Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/about"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
} 