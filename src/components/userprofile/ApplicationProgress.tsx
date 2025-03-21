import React from "react";

const ApplicationProgress = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      {/* Section Title */}
      <h3 className="text-gray-900 font-semibold text-lg">
        Application Progress
      </h3>

      {/* Progress Card */}
      <div className="bg-gray-50 p-4 rounded-lg mt-3">
        <p className="text-gray-900 font-semibold">Faire Small Grant</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2.5 rounded-full mt-2">
          <div className="bg-blue-600 h-2.5 rounded-full w-2/3"></div>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500 text-sm">
            Submitted on March 18, 2025
          </span>
          <span className="text-blue-700 bg-blue-100 px-3 py-1 text-xs font-semibold rounded-lg">
            In Review
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProgress;
