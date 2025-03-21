import React from "react";

const StartupDetails = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-black font-bold text-xl mb-4">Startup Details</h3>

      {/* Two-column grid layout */}
      <div className="grid grid-cols-2 gap-y-4">
        {/* Funding Need */}
        <div>
          <p className="text-gray-500 text-sm">Funding Need</p>
          <p className="text-black font-bold text-lg">$50,000</p>
        </div>

        {/* Use of Funds */}
        <div>
          <p className="text-gray-500 text-sm">Use of Funds</p>
          <p className="text-black font-bold text-lg">R&D</p>
        </div>

        {/* Company Stage */}
        <div>
          <p className="text-gray-500 text-sm">Company Stage</p>
          <p className="text-black font-bold text-lg">Early-Stage</p>
        </div>

        {/* Team Size */}
        <div>
          <p className="text-gray-500 text-sm">Team Size</p>
          <p className="text-black font-bold text-lg">5-10 employees</p>
        </div>
      </div>
    </div>
  );
};

export default StartupDetails;
