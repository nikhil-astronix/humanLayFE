"use client";

import { Navbar } from "@/components/layout/navbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ApplicantProfile } from "@/components/grants/applicant-profile";
import { MeetingScheduler } from "@/components/grants/meeting-scheduler";
import { useParams } from "next/navigation";

interface Applicant {
  name: string;
  status: string;
  industry: string;
  location: string;
  role: string;
  avatar: string;
  about: string;
  grantDetails: {
    amount: string;
    awardDate: string;
  };
  achievements: Array<{
    icon: string;
    text: string;
  }>;
}

interface Grant {
  name: string;
  applicants: {
    [key: string]: Applicant;
  };
}

interface GrantsData {
  [key: string]: Grant;
}

// Mock data mapping for grants
const grantsData: GrantsData = {
  "faire-small-business-grant": {
    name: "Faire Small Business Grant",
    applicants: {
      "1": {
        name: "Sarah Johnson",
        status: "Pending",
        industry: "AI & Machine Learning",
        location: "San Francisco, CA",
        role: "Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        about: "Sarah is the founder of AI Innovate, pioneering AI solutions for small businesses. With a background in machine learning and entrepreneurship, she's dedicated to making AI technology accessible to growing companies.",
        grantDetails: {
          amount: "$5,000",
          awardDate: "Pending Review",
        },
        achievements: [
          {
            icon: "trophy",
            text: "AI Innovation Award 2023",
          },
          {
            icon: "users",
            text: "Team growth from 2 to 8 members",
          },
          {
            icon: "chart",
            text: "300% YoY growth in client base",
          },
        ],
      },
      "2": {
        name: "John Smith",
        status: "Approved",
        industry: "Technology Solutions",
        location: "New York, NY",
        role: "CEO",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        about: "John leads TechCorp, developing innovative solutions for enterprise clients. His vision has transformed how businesses approach digital transformation.",
        grantDetails: {
          amount: "$5,000",
          awardDate: "March 1, 2024",
        },
        achievements: [
          {
            icon: "trophy",
            text: "Enterprise Solution of the Year",
          },
          {
            icon: "users",
            text: "Expanded to 3 new markets",
          },
          {
            icon: "chart",
            text: "250% revenue growth in 2023",
          },
        ],
      },
    },
  },
  "tech-innovation-grant": {
    name: "Tech Innovation Grant",
    applicants: {
      "3": {
        name: "Sarah Johnson",
        status: "Pending",
        industry: "AI & Machine Learning",
        location: "San Francisco, CA",
        role: "Founder & CEO",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        about: "Sarah is expanding AI Innovate's reach with innovative solutions for enterprise clients.",
        grantDetails: {
          amount: "$10,000",
          awardDate: "Pending Review",
        },
        achievements: [
          {
            icon: "trophy",
            text: "Enterprise AI Solution Award",
          },
          {
            icon: "users",
            text: "Expanded team to 15 members",
          },
          {
            icon: "chart",
            text: "400% growth in enterprise clients",
          },
        ],
      },
    },
  },
};

export default function ApplicantDetailsPage() {
  const params = useParams();
  const grantId = params.grantId as string;
  const applicantId = params.applicantId as string;

  const grantData = grantsData[grantId] as Grant;
  const applicantData = grantData?.applicants[applicantId] as Applicant;

  if (!grantData || !applicantData) {
    return <div>Applicant not found</div>;
  }

  const breadcrumbItems = [
    { label: "Grants", href: "/grants" },
    { label: grantData.name, href: `/grants/${grantId}` },
    { label: applicantData.name, href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar />
      </div>
      <main className="max-w-[1400px] mx-auto px-8 py-8 mt-16">
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <ApplicantProfile data={applicantData} />
          </div>
          <div className="col-span-1">
            <MeetingScheduler />
          </div>
        </div>
      </main>
    </div>
  );
} 