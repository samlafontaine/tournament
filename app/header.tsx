import React from "react";

export default function Header() {
  return (
    <div className="mb-12">
      <p className="text-2xl font-medium bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text mb-1">
        Fifa tournament
      </p>
      <p className="text-sm text-zinc-600 leading-relaxed">
        Information about the ongoing Fifa tournament. Add and view recently
        played matches, and see who&apos;s currently leading in the rankings.
      </p>
    </div>
  );
}
