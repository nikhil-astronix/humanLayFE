"use client"; // Mark as client component

import { useEffect } from "react";

const BodyWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.classList.add("bg-gray-100");
    return () => {
      document.body.classList.remove("bg-gray-100"); // Cleanup
    };
  }, []);

  return <>{children}</>;
};

export default BodyWrapper;
