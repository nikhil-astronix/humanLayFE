import { FileText, Users2, Clock, CheckCircle } from "lucide-react";

const stats = [
  {
    name: "Total Grants",
    value: "5",
    icon: FileText,
    iconColor: "text-orange-500",
  },
  {
    name: "Total Applications",
    value: "50",
    icon: Users2,
    iconColor: "text-rose-500",
  },
  {
    name: "Pending",
    value: "30",
    icon: Clock,
    iconColor: "text-amber-500",
  },
  {
    name: "Approved",
    value: "10",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
];

export function GrantsOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <div>
              <div className="absolute rounded-md p-3">
                <Icon className={`h-6 w-6 ${stat.iconColor}`} aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </div>
            <div className="ml-16 pb-6 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
} 