import React from "react";

export default function LoadingScreen() {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-white">
        <div role="status" class="flex flex-col items-center">
          <svg
            aria-hidden="true"
            class="w-24 h-24 animate-spin"
            viewBox="0 0 50 50"
          >
            <circle
              class="text-gray-200"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              stroke-width="8"
              fill="none"
            />
            <circle
              class="text-purple-600"
              cx="25"
              cy="25"
              r="20"
              stroke="url(#gradient)"
              stroke-width="8"
              stroke-linecap="round"
              fill="none"
              stroke-dasharray="100"
              stroke-dashoffset="60"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#9333EA" />
                <stop offset="100%" stop-color="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <span class="mt-3 text-gray-600 font-medium">Loading...</span>
        </div>
      </div>
    </>
  );
}
