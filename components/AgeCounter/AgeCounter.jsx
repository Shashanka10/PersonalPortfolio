// components/AgeCounter/AgeCounter.jsx
"use client";
import { useState, useEffect } from "react";

const BIRTH_DATE = "2003-03-21T00:00:00+05:45";

function useLiveAge(birthDate) {
  const [age, setAge] = useState(0);

  useEffect(() => {
    const birthMs = new Date(birthDate).getTime();

    const update = () => {
      const diffMs = Date.now() - birthMs;
      const years = diffMs / (1000 * 60 * 60 * 24 * 365.2425);
      setAge(years);
    };

    update();
    const interval = setInterval(update, 50);
    return () => clearInterval(interval);
  }, [birthDate]);

  return age;
}

function Heartbeat() {
  return (
    <svg
      width="28"
      height="14"
      viewBox="0 0 28 14"
      className="shrink-0 overflow-visible"
    >
      <polyline
        points="0,7 6,7 8,2 11,12 13,7 28,7"
        fill="none"
        stroke="#12c971"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 40,
          strokeDashoffset: 40,
          animation: "heartbeat-draw 1.6s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes heartbeat-draw {
          0%   { stroke-dashoffset: 40; opacity: 0.3; }
          40%  { stroke-dashoffset: 0;  opacity: 1;   }
          70%  { stroke-dashoffset: 0;  opacity: 1;   }
          100% { stroke-dashoffset: -40; opacity: 0.3; }
        }
      `}</style>
    </svg>
  );
}

export default function AgeCounter() {
  const age = useLiveAge(BIRTH_DATE);

  return (
    <div className="flex items-center gap-2">
      <Heartbeat />
      <span className="font-mono text-gray-500 text-[9px] sm:text-xs lg:text-sm tracking-wider tabular-nums">
        {age.toFixed(9)}
      </span>
    </div>
  );
}
