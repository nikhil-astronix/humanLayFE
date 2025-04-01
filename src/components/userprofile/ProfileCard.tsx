const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src="/sarah-chen.png"
          className="w-16 h-16 rounded-full"
          alt="Sarah Chen"
        />
        <div>
          <h2 className="text-gray-900 font-bold text-lg">Sarah Chen</h2>
          <p className="text-gray-600 text-sm font-medium">
            Founder & CEO at AI Innovate
          </p>
          <p className="text-gray-500 text-xs flex items-center space-x-1">
            📍 San Francisco, CA • 🔹 Technology • 📌 Early-Stage
          </p>
        </div>
      </div>
      <button className="bg-orange-600 text-white px-4 py-2 rounded-md">
        Edit Profile
      </button>
    </div>
  );
};
