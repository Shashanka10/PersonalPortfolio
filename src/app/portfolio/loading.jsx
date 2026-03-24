"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-[#12c971]"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      <p className="text-gray-300 text-xs font-mono tracking-[0.25em] uppercase animate-pulse">
        Loading...
      </p>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loading;