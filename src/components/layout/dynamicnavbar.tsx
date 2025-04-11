"use client"
import dynamic from "next/dynamic";
const DynamicNavbar = dynamic(() => import("@/components/layout/navbar").then((mod) => mod.Navbar), {
    ssr: false, // Disable server-side rendering
  });

  export default DynamicNavbar