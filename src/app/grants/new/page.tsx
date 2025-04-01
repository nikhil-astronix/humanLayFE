"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { AddGrantForm } from "@/components/grants/add-grant-form";
import { GrantSuccess } from "@/components/grants/grant-success";
import { submitGrant } from "@/services/grantService";
import { GrantData } from "@/types/grantsData";

export default function NewGrantPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [grantData, setGrantData] = useState<GrantData | null>(null);

  const handleGrantSubmit = async (data: GrantData) => {
    try {
      const response = await submitGrant(data);
      if (response.success) {
        setGrantData(data);
        setShowSuccess(true);
      } else {
        console.error("Grant submission failed");
      }
    } catch (error) {
      console.error("Error submitting grant:", error);
    }
  };

  const handleAddAnother = () => {
    setShowSuccess(false);
    setGrantData(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar />
      </div>
      <main className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Breadcrumbs
          items={[
            { label: "Grants", href: "/grants" },
            { label: "Add New Grant", href: "/grants/new" },
          ]}
        />
        {showSuccess && grantData ? (
          <div className="mt-8">
            <GrantSuccess
              grantData={grantData}
              onAddAnother={handleAddAnother}
            />
          </div>
        ) : (
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-10 py-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Add New Grant
              </h1>
              <p className="text-gray-600 mb-8 border-b border-gray-200 pb-4">
                Fill in the details below to add a new grant to the platform.
              </p>
              <AddGrantForm onSubmit={handleGrantSubmit} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
