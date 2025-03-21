const RecommendedResources: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-900 font-semibold text-md">
          Recommended Resources
        </h2>
        <a
          href="#"
          className="text-red-500 text-sm font-medium hover:underline"
        >
          View All
        </a>
      </div>
      <div className="mt-4 p-4 border rounded-lg">
        <h3 className="text-gray-900 font-semibold text-md">Clerky</h3>
        <p className="text-gray-700 text-sm font-medium">
          Legal Services for Early-Stage
        </p>
      </div>
    </div>
  );
};

export default RecommendedResources;
