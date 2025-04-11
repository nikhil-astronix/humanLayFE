"use client";
import Image from "next/image";

export default function AwardeeConnect() {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-gray-900 font-semibold text-md">
        Connect with Awardees
      </h2>
      <div className="mt-4 flex flex-col items-center">
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" //"/emily-brown.png"
          className="rounded-full"
          width={50}
          height={50}
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