"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ProfileCard() {
  const router = useRouter();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image
          src= "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"//"/sarah-chen.png"
          className="rounded-full"
          height={50}
          width={50}
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
      <button  onClick={() => router.push('/home/seeker')} className="bg-orange-600 text-white px-4 py-2 rounded-md">
        Edit Profile
      </button>
    </div>
  );
}
