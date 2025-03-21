import { CheckIcon } from "lucide-react";

export interface AuthStep {
  id: number;
  name: string;
  status: "complete" | "current" | "upcoming";
}

interface AuthStepsProps {
  steps: AuthStep[];
}

export function AuthSteps({ steps }: AuthStepsProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol
        role="list"
        className="flex items-center justify-between w-full relative"
      >
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-200"
            style={{
              width: steps[0].status === "complete" ? "50%" : "0%",
            }}
          />
        </div>

        {steps.map((step) => (
          <li key={step.name} className="relative">
            {step.status === "complete" ? (
              <div className="group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 group-hover:bg-green-600 relative z-10">
                  <CheckIcon className="w-5 h-5 text-white" />
                </span>
                <span className="absolute -left-1/2 -right-1/2 text-xs text-center mt-2 text-green-600">
                  {step.name}
                </span>
              </div>
            ) : step.status === "current" ? (
              <div className="group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-orange-600 bg-white relative z-10">
                  <span className="text-orange-600">{step.id}</span>
                </span>
                <span className="absolute -left-1/2 -right-1/2 text-xs text-center mt-2 font-medium text-orange-600">
                  {step.name}
                </span>
              </div>
            ) : (
              <div className="group">
                <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-white relative z-10">
                  <span className="text-gray-500">{step.id}</span>
                </span>
                <span className="absolute -left-1/2 -right-1/2 text-xs text-center mt-2 text-gray-500">
                  {step.name}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
