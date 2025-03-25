"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trophy, Users, TrendingUp, MapPin, Building2, Clock, CheckCircle2 } from "lucide-react";
import { Loader } from "@/components/ui/loader";

interface ApplicantProfileProps {
  data: {
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
  };
}

export function ApplicantProfile({ data }: ApplicantProfileProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="h-5 w-5 text-amber-500" />;
      case "users":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "chart":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Approved") {
      return {
        icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
        text: "Verified Winner",
        className: "bg-emerald-50 text-emerald-700"
      };
    } else {
      return {
        icon: <Clock className="h-4 w-4 mr-1" />,
        text: "Under Review",
        className: "bg-amber-50 text-amber-700"
      };
    }
  };

  const statusBadge = getStatusBadge(data.status);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-8 min-h-[600px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-8 space-y-8 shadow-sm">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <Image
          src={data.avatar}
          alt={data.name}
          width={96}
          height={96}
          className="rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl font-semibold text-gray-900">{data.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.className}`}>
              {statusBadge.icon}
              {statusBadge.text}
            </span>
          </div>
          <p className="text-base text-gray-600 mb-3">{data.industry}</p>
          <div className="flex items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {data.location}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {data.role}
            </div>
          </div>
        </div>
      </div>

      {/* Grant Award Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 ">Grant Award Details</h2>
        <div className="grid grid-cols-2 gap-8  py-4">
          <div>
            <p className="text-xs font-medium text-gray-500">Grant Amount</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">{data.grantDetails.amount}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Award Date</p>
            <p className="mt-2 text-xl font-semibold text-gray-900">{data.grantDetails.awardDate}</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{data.about}</p>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h2>
        <div className="space-y-4">
          {data.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3">
              {getAchievementIcon(achievement.icon)}
              <span className="text-sm text-gray-600">{achievement.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 