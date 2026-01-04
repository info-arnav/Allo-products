"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--background)]">
      <div className="text-center">
        <p className="text-8xl font-light text-[var(--accent)] mb-4">404</p>
        <h1 className="text-2xl font-normal text-[var(--foreground)] mb-2">
          Page not found
        </h1>
        <p className="text-base text-[var(--gray-600)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors underline underline-offset-4"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
