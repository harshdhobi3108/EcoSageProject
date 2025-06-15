"use client";

import { useState, useMemo } from "react";
import { Calendar as BigCalendar } from "react-big-calendar";
import { localizer } from "@/utils/calendar-localizer";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { X } from "lucide-react";

// Eco awareness events
const ecoEvents = [
  {
    title: "🌱 World Environment Day",
    start: new Date("2025-06-05"),
    end: new Date("2025-06-05"),
  },
  {
    title: "🌍 Earth Day",
    start: new Date("2025-04-22"),
    end: new Date("2025-04-22"),
  },
  {
    title: "♻️ International Recycling Day",
    start: new Date("2025-05-17"),
    end: new Date("2025-05-17"),
  },
];

export default function EcoCalendar({ onClose }: { onClose: () => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useMemo(() => ecoEvents, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white/90 rounded-2xl shadow-2xl p-6 border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#5a189a] mb-4 text-center">
          📅 Eco Awareness Calendar
        </h2>

        {/* Calendar Component */}
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          view="month"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          style={{ height: 500 }}
          popup
          eventPropGetter={() => ({
            style: {
              backgroundColor: "#7b2cbf",
              color: "white",
              borderRadius: "8px",
              padding: "4px 8px",
              fontSize: "0.875rem",
              lineHeight: "1.2rem",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          })}
        />
      </div>
    </div>
  );
}
