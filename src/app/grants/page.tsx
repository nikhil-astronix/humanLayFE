import { Navbar } from "@/components/layout/navbar";
import { GrantsOverview } from "@/components/grants/grants-overview";
import { ActiveGrants } from "@/components/grants/active-grants";

export default function GrantsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar />
      </div>
      <main className="flex-1 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Grants Overview</h1>
        <GrantsOverview />
        <ActiveGrants />
      </main>
    </div>
  );
} 