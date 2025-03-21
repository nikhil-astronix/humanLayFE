interface Grant {
  title: string;
  amount: string;
  matchPercentage: number;
}

const grants: Grant[] = [
  {
    title: "Faire Small Business Grant",
    amount: "$5,000 - Technology Startups",
    matchPercentage: 90,
  },
  {
    title: "Headstream Accelerator",
    amount: "$30,000 - AI Innovation",
    matchPercentage: 85,
  },
];

const GrantMatches: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-900 font-semibold text-md">
          Top Grant Matches
        </h2>
        <a
          href="#"
          className="text-red-500 text-sm font-medium hover:underline"
        >
          View All
        </a>
      </div>
      <div className="mt-4">
        {grants.map((grant, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg mb-2 flex justify-between"
          >
            <div className="text-gray-700 text-sm">
              <h3 className="font-semibold">{grant.title}</h3>
              <p className="text-gray-500">{grant.amount}</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md">
              {grant.matchPercentage}% Match
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantMatches;
