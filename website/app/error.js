"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--background)]">
      <div className="text-center">
        <p className="text-8xl font-light text-[var(--accent)] mb-4">500</p>
        <h1 className="text-2xl font-normal text-[var(--foreground)] mb-2">
          Something went wrong
        </h1>
        <p className="text-base text-[var(--gray-600)] mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => reset()}
            className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors underline underline-offset-4"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-sm text-[var(--gray-600)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
