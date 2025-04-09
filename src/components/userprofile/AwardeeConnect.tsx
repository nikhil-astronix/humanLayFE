"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Bot, ChevronLeft, ChevronRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5 }
};

export default function AwardeeConnect() {

    const [currentAwardeeIndex, setCurrentAwardeeIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');

  const previousAwardees = [
    {
      name: "Emily Brown",
      role: "Technology, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Michael Chen",
      role: "E-commerce, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Healthcare, Previous Faire Grant Winner",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];


  const nextAwardee = () => {
    setSlideDirection('right');
    setCurrentAwardeeIndex((prev) => 
      prev === previousAwardees.length - 1 ? 0 : prev + 1
    );
  };

  const prevAwardee = () => {
    setSlideDirection('left');
    setCurrentAwardeeIndex((prev) => 
      prev === 0 ? previousAwardees.length - 1 : prev - 1
    );
  };

  return (
    <motion.div 
    variants={fadeInUp}
    className="bg-white rounded-lg p-6 shadow-sm"
  >
    <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Connect with Awardees</h2>
    <div className="relative">
      <div className="flex items-center">
        <button 
          onClick={prevAwardee}
          className="absolute cursor-pointer left-0 z-10 p-2 text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <motion.div
          key={currentAwardeeIndex}
          initial={{ opacity: 0, x: slideDirection === 'right' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideDirection === 'right' ? -50 : 50 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full px-6"
        >
          <div className="text-center">
            <Image
              src={previousAwardees[currentAwardeeIndex].avatar}
              alt={previousAwardees[currentAwardeeIndex].name}
              width={80}
              height={80}
              className="rounded-full mx-auto mb-3"
            />
            <h3 className="font-medium text-gray-900">{previousAwardees[currentAwardeeIndex].name}</h3>
            <p className="text-sm text-gray-500 mb-4">{previousAwardees[currentAwardeeIndex].role}</p>
            <div className="flex justify-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
                Request Connect
              </button>
            </div>
          </div>
        </motion.div>

        <button
          onClick={nextAwardee}
          className="absolute right-0 z-10 p-2 text-orange-600 hover:text-orange-700 bg-white rounded-full shadow-md cursor-pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {previousAwardees.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAwardeeIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              index === currentAwardeeIndex ? 'bg-orange-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  </motion.div>
  )

  // return (
  //   <div className="bg-white p-6 rounded-lg shadow-md mb-6">
  //     <h2 className="text-gray-900 font-semibold text-md">
  //       Connect with Awardees
  //     </h2>
  //     <div className="mt-4 flex flex-col items-center">
  //       <Image
  //         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" //"/emily-brown.png"
  //         className="rounded-full"
  //         width={50}
  //         height={50}
  //         alt="Emily Brown"
  //       />
  //       <h3 className="mt-2 font-semibold">Emily Brown</h3>
  //       <p className="text-gray-500 text-sm">
  //         Technology, Previous Faire Grant Winner
  //       </p>
  //       <button className="bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600">
  //         Request Contact
  //       </button>
  //     </div>
  //   </div>
  // );
}