import React from "react";
import Link from "next/link";
import { Task } from "../types/task";

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: number, next: boolean) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li className="group rounded-xl bg-zinc-900/60 p-4 ring-1 ring-white/5 hover:bg-zinc-900">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id, !task.completed)}
          className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-white/10 ${
            task.completed ? "bg-indigo-500" : "bg-transparent"
          }`}
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          {task.completed && <span className="text-sm">✓</span>}
        </button>
        <div className="flex-1">
          <p
            className={`text-sm leading-6 ${
              task.completed ? "text-zinc-400 line-through" : "text-zinc-100"
            }`}
          >
            {task.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-3 w-3 rounded-full"
            style={{ backgroundColor: task.color }}
          />
          <Link
            href={`/tasks/${task.id}`}
            className="rounded-md px-2 py-1 text-xs text-zinc-300 outline-none ring-1 ring-white/10 hover:bg-white/5"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-md px-2 py-1 text-xs text-zinc-300 outline-none ring-1 ring-white/10 hover:bg-white/5"
          >
            🗑
          </button>
        </div>
      </div>
    </li>
  );
}
