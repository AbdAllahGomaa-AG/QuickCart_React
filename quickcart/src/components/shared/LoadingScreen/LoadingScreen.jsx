import React from "react";

export default function LoadingScreen() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-24 h-24 animate-spin"
            viewBox="0 0 50 50"
          >
            <circle
              className="text-gray-200"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
            />
            <circle
              className="text-purple-600"
              cx="25"
              cy="25"
              r="20"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="60"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <span className="mt-3 text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    </>
  );
}
