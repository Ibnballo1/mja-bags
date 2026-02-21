"use client";

import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";

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
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="text-center max-w-md">
        <p className="font-serif text-6xl font-bold text-olive-200 mb-4">
          Oops
        </p>
        <h2 className="font-serif text-2xl font-bold text-[#1E1E1E] mb-3">
          Something went wrong
        </h2>
        <p className="text-[#6B7280] mb-8 text-sm">
          {error.message ?? "An unexpected error occurred. Please try again."}
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
