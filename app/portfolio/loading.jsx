"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[#12c971] animate-loading-bounce"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <p className="animate-pulse text-xs font-mono tracking-[0.25em] text-gray-300 uppercase">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
