import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Task } from "../types/task";
import { ColorDot } from "./ColorDot";

const PALETTE = [
  "#ef4444",
  "#f59e0b",
  "#facc15",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ef3a7a",
  "#a78b6d",
] as const;

export function TaskForm({
  defaults,
  submitLabel = "Add Task",
  onSubmit,
}: {
  defaults?: Partial<Task>;
  submitLabel?: string;
  onSubmit: (payload: { title: string; color: string }) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(defaults?.title ?? "");
  const [color, setColor] = useState(defaults?.color ?? PALETTE[0]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (defaults) {
      if (defaults.title !== undefined) setTitle(defaults.title);
      if (defaults.color !== undefined) setColor(defaults.color);
    }
  }, [defaults]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setSaving(true);
    try {
      await onSubmit({ title: trimmed, color });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-zinc-200"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="e.g., Buy groceries"
          className="mt-2 w-full rounded-xl bg-zinc-900/60 px-4 py-3 text-zinc-100 ring-1 ring-white/10 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={saving}
        />
        <p className="mt-2 text-xs text-zinc-500">
          Keep it short and actionable.
        </p>
      </div>

      <div>
        <span className="block text-sm font-medium text-zinc-200 mb-2">
          Color
        </span>
        <div className="flex flex-wrap gap-3">
          {PALETTE.map((hex) => (
            <ColorDot
              key={hex}
              color={hex}
              active={hex === color}
              onClick={() => setColor(hex)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white ring-1 ring-white/10 ${
            saving || !title.trim()
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-sky-700 hover:bg-sky-600"
          }`}
        >
          {saving ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/"
          className="rounded-xl px-4 py-3 text-sm text-zinc-300 ring-1 ring-white/10 hover:bg-white/5"
        >
          Cancel
        </Link>
        <div
          aria-hidden
          className="ml-auto inline-flex h-5 w-5 rounded-full"
          style={{ backgroundColor: color }}
          title={color}
        />
      </div>
    </form>
  );
}
