export default function AwardeeConnect() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-gray-900 font-semibold text-md">
        Connect with Awardees
      </h2>
      <div className="mt-4 flex flex-col items-center">
        <img
          src="/emily-brown.png"
          className="w-16 h-16 rounded-full"
          alt="Emily Brown"
        />
        <h3 className="mt-2 font-semibold">Emily Brown</h3>
        <p className="text-gray-500 text-sm">
          Technology, Previous Faire Grant Winner
        </p>
        <button className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600">
          Request Contact
        </button>
      </div>
    </div>
  );
}
