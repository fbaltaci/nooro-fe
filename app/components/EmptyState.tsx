import React from "react";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/10 p-12 text-center">
      <div className="text-5xl">🗒️</div>
      <h3 className="text-lg font-medium text-zinc-200">
        You don't have any tasks registered yet.
      </h3>
      <p className="text-sm text-zinc-400">
        Create tasks and organize your to-do items.
      </p>
      <Link
        href="/tasks/new"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-sky-700 px-5 py-3 text-sm font-medium text-white hover:bg-sky-600"
      >
        Create Task ⏺
      </Link>
    </div>
  );
}
