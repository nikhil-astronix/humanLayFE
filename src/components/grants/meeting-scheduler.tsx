"use client";

import { useState, useEffect } from "react";
import { Video, ChevronLeft, ChevronRight } from "lucide-react";
import { Loader, ButtonLoader } from "@/components/ui/loader";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "2:00 PM",
  "4:00 PM",
];

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function MeetingScheduler() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Calendar navigation functions
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Get days for current month view
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Add previous month's days
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({
        date: prevDate,
        isCurrentMonth: false
      });
    }
    
    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true
      });
    }
    
    // Add next month's days to complete the calendar
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date);
    }
  };

  const handleBookMeeting = async () => {
    setIsBooking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsBooking(false);
    // Here you would typically handle the actual booking logic
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 min-h-[500px] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Schedule a Meeting</h2>

      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={prevMonth}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-4 w-4 text-gray-500" />
          </button>
          <h2 className="text-sm font-semibold text-gray-900">
            {formatDate(currentDate)}
          </h2>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-[10px] font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-center">
          {getDaysInMonth().map((day, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(day.date)}
              disabled={isPastDate(day.date)}
              className={`p-1 text-xs rounded-full relative
                ${isSelected(day.date)
                  ? "bg-orange-600 text-white"
                  : day.isCurrentMonth
                  ? isPastDate(day.date)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-gray-900 hover:bg-gray-100"
                  : "text-gray-400"
                }
                ${isToday(day.date) && !isSelected(day.date) ? "ring-1 ring-orange-600 ring-offset-1" : ""}
              `}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      </div>

      {/* Available Times */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Available Times</h3>
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              disabled={!selectedDate}
              className={`flex items-center justify-center px-3 py-2 border rounded-lg text-sm
                ${
                  selectedTime === time
                    ? "border-orange-600 bg-orange-50 text-orange-700"
                    : !selectedDate
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Meeting Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Meeting Type</h3>
        <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
          <Video className="h-5 w-5 text-gray-500 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900">Video Call</p>
            <p className="text-sm text-gray-500">30 minutes</p>
          </div>
        </div>
      </div>

      {/* Book Meeting Button */}
      <button
        onClick={handleBookMeeting}
        disabled={!selectedDate || !selectedTime || isBooking}
        className={`w-full py-2.5 px-4 rounded-lg font-medium flex items-center justify-center
          ${
            selectedDate && selectedTime && !isBooking
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {isBooking && <ButtonLoader />}
        Book Meeting
      </button>
      <p className="text-sm text-gray-500 text-center mt-3">Usually responds within 24 hours</p>
    </div>
  );
} 