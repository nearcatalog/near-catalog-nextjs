"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Error | {error.message}</h2>
      <button
        className="flex gap-1 rounded-full bg-slate-500 px-4 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-slate-600 active:bg-slate-700"
        onClick={() => reset()}
      >
        <i className="bi bi-arrow-clockwise text-xl"></i> Try Again
      </button>
    </div>
  );
}
