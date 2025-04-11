import ApplicationProgress from "@/components/userprofile/ApplicationProgress";
import AwardeeConnect from "@/components/userprofile/AwardeeConnect";
import GrantMatches from "@/components/userprofile/GrantMatches";
import ProfileCard from "@/components/userprofile/ProfileCard";
import RecommendedResources from "@/components/userprofile/RecommendedResources";
import StartupDetails from "@/components/userprofile/StartupDetails";
import DynamicNavbar from "@/components/layout/dynamicnavbar";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicNavbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-lg mx-auto px-6 py-8">
          <ProfileCard />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="md:col-span-2 space-y-6">
              <StartupDetails />
              <GrantMatches />
              <ApplicationProgress />
            </div>
            <div className="space-y-6">
              <AwardeeConnect />
              <RecommendedResources />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
