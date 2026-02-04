"use client";

import { useEffect } from "react";
import PillButton from "@/components/PillButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log full error details for debugging
    console.error("Error component received error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    if (error.digest) {
      console.error("Error digest:", error.digest);
    }
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-xl font-serif text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-600 text-sm mb-6 text-center max-w-md">
        We couldn’t load this page. Try again.
      </p>
      <PillButton variant="gold" onClick={reset}>
        Try again
      </PillButton>
    </div>
  );
}
