import { Rocket, Building2, Award } from "lucide-react";
import { useState } from "react";

interface RoleSelectionFormProps {
  onSubmit: (role: string) => void;
}

export function RoleSelectionForm({ onSubmit }: RoleSelectionFormProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");

  const roles = [
    {
      id: "grant_seeker",
      title: "Grant Seeker",
      description:
        "For startup founders and small business owners seeking funding and resources",
      icon: Rocket,
      features: [
        "Access to grant matches",
        "Application support",
        "Resource library",
      ],
    },
    {
      id: "grant_provider",
      title: "Grant Provider",
      description:
        "For program officers and organizations managing grant programs",
      icon: Building2,
      features: [
        "Post grant opportunities",
        "Monitor applications",
        "Connect with applicants",
      ],
    },
    {
      id: "previous_awardee",
      title: "Previous Awardee",
      description: "For experienced founders who want to mentor others",
      icon: Award,
      features: [
        "Mentor new founders",
        "Share expertise",
        "Track mentoring history",
      ],
    },
  ];

  const handleContinue = () => {
    if (selectedRoleId) {
      onSubmit(selectedRoleId);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Role</h2>
        <p className="mt-2 text-sm text-gray-600">
          Select how you&apos;d like to participate in the Human
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setSelectedRoleId(role.id)}
            className={`flex flex-col p-6 bg-white border rounded-lg transition-all text-left h-full
              ${
                selectedRoleId === role.id
                  ? "border-orange-500 ring-2 ring-orange-500"
                  : "border-gray-200 hover:border-orange-500"
              }`}
          >
            <div className="mb-4">
              <role.icon className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {role.title}
            </h3>
            <p className="text-gray-600 mb-4 text-sm">{role.description}</p>
            <ul className="space-y-2 mt-auto">
              {role.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-gray-600 text-sm"
                >
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedRoleId}
          className={`px-8 py-3 rounded-full text-lg font-medium transition-colors
            ${
              selectedRoleId
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </>
  );
}
